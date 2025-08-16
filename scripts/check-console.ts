import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

interface ConsoleLog {
  file: string;
  line: number;
  content: string;
  type: string;
}

const CONSOLE_PATTERNS = [
  /console\.log\(/g,
  /console\.warn\(/g,
  /console\.error\(/g,
  /console\.info\(/g,
  /console\.debug\(/g,
] as const;

const IGNORED_DIRS = ['node_modules', '.git', 'dist', 'build', '.next', '.husky'] as const;
const IGNORED_FILES = ['check-console.ts', 'routeTree.gen.ts'] as const;
const ALLOWED_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx'] as const;

function shouldIgnoreFile(filePath: string): boolean {
  return IGNORED_FILES.some(file => filePath.includes(file));
}

function shouldIgnoreDir(dirName: string): boolean {
  return IGNORED_DIRS.includes(dirName as any);
}

function hasAllowedExtension(filePath: string): boolean {
  return ALLOWED_EXTENSIONS.includes(extname(filePath) as any);
}

function scanDirectory(dirPath: string): ConsoleLog[] {
  const files = readdirSync(dirPath);
  let consoleLogsFound: ConsoleLog[] = [];

  for (const file of files) {
    const fullPath = join(dirPath, file);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      if (!shouldIgnoreDir(file)) {
        consoleLogsFound = consoleLogsFound.concat(scanDirectory(fullPath));
      }
    } else if (stat.isFile()) {
      if (hasAllowedExtension(fullPath) && !shouldIgnoreFile(fullPath)) {
        try {
          const content = readFileSync(fullPath, 'utf8');
          const lines = content.split('\n');

          lines.forEach((line, index) => {
            CONSOLE_PATTERNS.forEach(pattern => {
              if (pattern.test(line)) {
                consoleLogsFound.push({
                  file: fullPath,
                  line: index + 1,
                  content: line.trim(),
                  type: pattern.source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace('\\\\', '\\')
                });
              }
            });
          });
        } catch (error) {
          console.warn(`Could not read file: ${fullPath}`);
        }
      }
    }
  }

  return consoleLogsFound;
}

// Start scanning from current directory
const consoleLogs = scanDirectory('.');

if (consoleLogs.length > 0) {
  console.error('\n❌ Console logs found! Please remove them before committing:\n');
  
  consoleLogs.forEach(log => {
    console.error(`📁 ${log.file}:${log.line}`);
    console.error(`   ${log.content}`);
    console.error('');
  });
  
  console.error('💡 Tip: Use the following commands to remove console logs:');
  console.error('   npm run lint:fix  # This will auto-fix some issues');
  console.error('   # Or manually remove console.log statements\n');
  
  process.exit(1);
} else {
  console.log('✅ No console logs found! Safe to commit.');
  process.exit(0);
}