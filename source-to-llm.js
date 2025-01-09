#!/usr/bin/env node

import { promises as fs } from 'fs';
import path from 'path';
import { glob } from 'glob';
import { Command } from 'commander';

const program = new Command();

program
    .name('source-to-llm')
    .description('Extract source code from files and format it for LLM context')
    .option('-p, --pattern <patterns...>', 'file patterns to match (e.g. "**/*.ts")', ['**/*.ts', '**/*.js', '**/*.tsx', '**/*.jsx'])
    .option('-i, --ignore <patterns...>', 'patterns to ignore', ['**/node_modules/**', '**/dist/**', '**/build/**'])
    .option('-s, --separator <string>', 'separator between files', '-'.repeat(80))
    .option('-d, --dir <path>', 'target directory path', process.cwd())
    .parse();

const options = program.opts();

async function findFiles(patterns, ignorePatterns, baseDir) {
    const files = await glob(patterns, {
        ignore: ignorePatterns,
        nodir: true,
        cwd: baseDir,
        absolute: true
    });
    return files;
}

async function processFile(filePath, targetDir) {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        const relativePath = path.relative(targetDir, filePath);

        console.log(`File: ${relativePath}`);
        console.log(options.separator);
        console.log(content);
        console.log(options.separator);
        console.log(); // Empty line for better readability
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
    }
}

async function main() {
    try {
        const targetDir = path.resolve(options.dir);
        const files = await findFiles(options.pattern, options.ignore, targetDir);

        for (const file of files) {
            await processFile(file, targetDir);
        }
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

main();