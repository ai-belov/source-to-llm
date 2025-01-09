# source-to-llm

A lightweight CLI tool that extracts source code from your project files and formats it for use in LLM prompts. Perfect for preparing your codebase for AI analysis, code review, or documentation tasks.

## Usage

The easiest way to use this tool is with `npx`:

```bash
# Basic usage - will process .ts, .js, .tsx, .jsx files in current directory
npx @belov.ai/source-to-llm

# Process specific file types
npx @belov.ai/source-to-llm -p "**/*.py" "**/*.java"

# Process specific directory
npx @belov.ai/source-to-llm -d /path/to/your/project

# Exclude specific patterns
npx @belov.ai/source-to-llm -i "**/tests/**" "**/vendor/**"

# Use custom separator between files
npx @belov.ai/source-to-llm -s "===="
```

### Options

- `-p, --pattern <patterns...>` - File patterns to match (default: `["**/*.ts", "**/*.js", "**/*.tsx", "**/*.jsx"]`)
- `-i, --ignore <patterns...>` - Patterns to ignore (default: `["**/node_modules/**", "**/dist/**", "**/build/**"]`)
- `-s, --separator <string>` - Separator between files (default: 80 dashes)
- `-d, --dir <path>` - Target directory path (default: current working directory)

## Example Output

```
File: src/components/Button.tsx
--------------------------------------------------------------------------------
import React from 'react';

export const Button = ({ children }) => {
  return <button>{children}</button>;
};
--------------------------------------------------------------------------------

File: src/utils/format.ts
--------------------------------------------------------------------------------
export const formatDate = (date: Date): string => {
  return date.toISOString();
};
--------------------------------------------------------------------------------
```

## Common Use Cases

1. **AI Code Review**
   ```bash
   npx @belov.ai/source-to-llm -p "src/**/*.ts" > code-for-review.txt
   ```

2. **Documentation Generation**
   ```bash
   # Extract all component files
   npx @belov.ai/source-to-llm -p "src/components/**/*.[tj]sx" > components.txt
   ```

3. **Focused Analysis**
   ```bash
   # Extract specific features or modules
   npx @belov.ai/source-to-llm -p "src/features/auth/**/*.ts" -i "**/*.test.ts"
   ```

4. **Multi-Language Projects**
   ```bash
   # Process multiple file types
   npx @belov.ai/source-to-llm -p "**/*.py" "**/*.ts" "**/*.go"
   ```

## Requirements

- Node.js >= 18.0.0

## License

MIT

## Author

belov.ai
