#!/usr/bin/env node
/*
 * Lightweight repository validator for Skyrim Gameplay Reference tables.
 *
 * It checks:
 * - CSV parseability for all tracked CSV files
 * - source_id values resolve to sources.yaml where present
 * - no trailing whitespace in reference files
 * - no project-specific leakage in public reference files
 */

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const PROJECT_ROOT = process.cwd();
const TEXT_EXTENSIONS = new Set([".md", ".csv", ".yaml", ".yml", ".mjs"]);
const LEAK_TERMS = ["P" + "DV", "Player" + "Devotion", "Devotion" + "ModSkyrim"];
const LEAK_ALLOWLIST = new Set([
  "tools/validate-reference-repo.mjs",
]);

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: PROJECT_ROOT,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  if (result.status !== 0) {
    const detail = (result.stderr || result.stdout || "").trim();
    throw new Error(`${command} ${args.join(" ")} failed${detail ? `: ${detail}` : ""}`);
  }
  return result.stdout;
}

function toRepoPath(filePath) {
  return path.relative(PROJECT_ROOT, filePath).replace(/\\/g, "/");
}

function listTrackedFiles() {
  return run("git", ["ls-files"])
    .split(/\r?\n/)
    .filter(Boolean)
    .map((file) => path.join(PROJECT_ROOT, file));
}

function parseCsv(text, file) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (char === "\"" && next === "\"") {
        field += "\"";
        i += 1;
      } else if (char === "\"") {
        inQuotes = false;
      } else {
        field += char;
      }
      continue;
    }

    if (char === "\"") {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (char !== "\r") {
      field += char;
    }
  }

  if (inQuotes) {
    throw new Error(`${file}: unterminated quoted CSV field`);
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  if (rows.length === 0) {
    throw new Error(`${file}: empty CSV`);
  }

  const nonEmptyRows = rows.filter((current) => current.some((value) => value.length > 0));
  const headerLength = nonEmptyRows[0].length;
  nonEmptyRows.forEach((current, index) => {
    if (current.length !== headerLength) {
      throw new Error(`${file}:${index + 1}: expected ${headerLength} columns, got ${current.length}`);
    }
  });

  return nonEmptyRows;
}

function sourceIds() {
  const sourcesPath = path.join(PROJECT_ROOT, "sources.yaml");
  const text = fs.readFileSync(sourcesPath, "utf8");
  return new Set(
    [...text.matchAll(/^  - id: (.+)$/gm)]
      .map((match) => match[1].trim()),
  );
}

function validateCsv(files, ids) {
  const csvFiles = files.filter((file) => file.endsWith(".csv"));
  let sourceReferences = 0;

  for (const file of csvFiles) {
    const repoPath = toRepoPath(file);
    const rows = parseCsv(fs.readFileSync(file, "utf8"), repoPath);
    const header = rows[0];
    const sourceIndex = header.indexOf("source_id");
    if (sourceIndex === -1) {
      continue;
    }
    for (let i = 1; i < rows.length; i += 1) {
      const sourceId = rows[i][sourceIndex];
      if (!sourceId || sourceId === "none" || sourceId === "unknown" || sourceId === "todo") {
        continue;
      }
      sourceReferences += 1;
      if (!ids.has(sourceId)) {
        throw new Error(`${repoPath}:${i + 1}: unknown source_id '${sourceId}'`);
      }
    }
  }

  return { csvFiles: csvFiles.length, sourceReferences };
}

function validateText(files) {
  let checked = 0;
  for (const file of files) {
    const ext = path.extname(file);
    if (!TEXT_EXTENSIONS.has(ext)) {
      continue;
    }
    const repoPath = toRepoPath(file);
    const text = fs.readFileSync(file, "utf8");
    const lines = text.split(/\r?\n/);
    lines.forEach((line, index) => {
      if (/[ \t]+$/.test(line)) {
        throw new Error(`${repoPath}:${index + 1}: trailing whitespace`);
      }
    });
    if (!LEAK_ALLOWLIST.has(repoPath)) {
      for (const term of LEAK_TERMS) {
        if (text.includes(term)) {
          throw new Error(`${repoPath}: project-specific leakage term '${term}'`);
        }
      }
    }
    checked += 1;
  }
  return checked;
}

const files = listTrackedFiles();
const ids = sourceIds();
const csvResult = validateCsv(files, ids);
const textCount = validateText(files);

console.log(`validated ${csvResult.csvFiles} CSV files`);
console.log(`validated ${csvResult.sourceReferences} source_id references`);
console.log(`validated ${textCount} text files`);
