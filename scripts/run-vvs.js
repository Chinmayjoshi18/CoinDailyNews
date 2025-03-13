#!/usr/bin/env node

/**
 * Enhanced Vercel Validation System (VVS)
 * 
 * This script validates and auto-fixes the codebase to ensure it meets
 * Next.js and Vercel deployment requirements and best practices.
 * 
 * Features:
 * - Auto-conversion of HTML tags to Next.js components
 * - Automatic dependency patching
 * - Automatic installation of missing dependencies
 * - Comprehensive reporting
 */

const { execSync, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const util = require('util');
const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const stat = util.promisify(fs.stat);

// ANSI color codes for better console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  blue: '\x1b[34m',
  bold: '\x1b[1m',
  dim: '\x1b[2m'
};

// Track all auto-fixes for the final report
const autoFixReport = {
  tagConversions: [],
  dependencyPatches: [],
  dependencyInstallations: [],
  errors: []
};

// Initialize VVS
console.log(`${colors.cyan}${colors.bold}
============================================================
        ENHANCED VERCEL VALIDATION SYSTEM (VVS)            
============================================================${colors.reset}
`);

// Log with timestamp
function log(message, type = 'info') {
  const timestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  const prefix = type === 'error' ? `${colors.red}[ERROR]` :
                type === 'warning' ? `${colors.yellow}[WARNING]` :
                type === 'success' ? `${colors.green}[SUCCESS]` :
                type === 'fix' ? `${colors.magenta}[AUTO-FIX]` :
                `${colors.cyan}[INFO]`;
  
  console.log(`${prefix} ${timestamp}${colors.reset} - ${message}`);
}

// Execute a command and capture its output
function execCommand(command, options = {}) {
  try {
    const output = execSync(command, { 
      encoding: 'utf8', 
      stdio: options.stdio || 'pipe',
      ...options
    });
    return { success: true, output };
  } catch (error) {
    return { 
      success: false, 
      output: error.stdout?.toString() || '', 
      error: error.stderr?.toString() || error.message 
    };
  }
}

// Check if a file is a JavaScript/TypeScript file that should be processed
function isJsOrTsFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return ['.js', '.jsx', '.ts', '.tsx'].includes(ext);
}

// Check if a directory should be ignored
function shouldIgnoreDir(dirPath) {
  const ignoreDirs = ['node_modules', '.git', '.next', 'out', 'public'];
  return ignoreDirs.some(dir => dirPath.includes(dir));
}

// Find all JavaScript/TypeScript files in the project recursively
async function findAllJsFiles(dir) {
  const files = [];
  
  async function traverse(currentDir) {
    if (shouldIgnoreDir(currentDir)) return;
    
    const entries = await readdir(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      
      if (entry.isDirectory()) {
        await traverse(fullPath);
      } else if (isJsOrTsFile(entry.name)) {
        files.push(fullPath);
      }
    }
  }
  
  await traverse(dir);
  return files;
}

/**
 * 1. Auto-Conversion of HTML Tags to Next.js Components
 * 
 * Scans JS/TS files for HTML tags that have Next.js equivalents and converts them
 */
async function autoConvertTags() {
  log('Starting auto-conversion of HTML tags to Next.js components');
  
  const tagMappings = [
    { 
      htmlTag: /<img\s+([^>]*)src=['"]([^'"]+)['"](.*?)>/g,
      nextComponent: (attrs, src, rest) => {
        // Extract width and height if available
        const widthMatch = attrs.match(/width=['"](\d+)['"]/);
        const heightMatch = attrs.match(/height=['"](\d+)['"]/);
        
        // Default width and height if not found
        const width = widthMatch ? widthMatch[1] : '500';
        const height = heightMatch ? heightMatch[1] : '300';
        
        return `<Image src="${src}" width={${width}} height={${height}} ${rest.trim()} />`;
      },
      importStatement: "import Image from 'next/image';"
    },
    { 
      htmlTag: /<a\s+([^>]*)href=['"]([^'"]+)['"](.*?)>(.*?)<\/a>/g,
      nextComponent: (attrs, href, rest, content) => {
        // Determine if it's an external link
        const isExternal = href.startsWith('http') || href.startsWith('//');
        if (isExternal) {
          return `<a href="${href}" ${rest.trim()}>${content}</a>`;
        }
        return `<Link href="${href}" ${rest.trim()}>${content}</Link>`;
      },
      importStatement: "import Link from 'next/link';"
    },
    {
      htmlTag: /<script\s+([^>]*)src=['"]([^'"]+)['"](.*?)><\/script>/g,
      nextComponent: (attrs, src, rest) => {
        return `<Script src="${src}" ${rest.trim()} />`;
      },
      importStatement: "import Script from 'next/script';"
    }
  ];
  
  // Find all JS files
  const rootDir = process.cwd();
  const files = await findAllJsFiles(rootDir);
  
  for (const file of files) {
    let content;
    try {
      content = await readFile(file, 'utf8');
    } catch (error) {
      log(`Failed to read file ${file}: ${error.message}`, 'error');
      autoFixReport.errors.push(`Failed to read file ${file}: ${error.message}`);
      continue;
    }
    
    let modified = false;
    let newContent = content;
    let importsToAdd = new Set();
    
    // Check each tag mapping
    for (const mapping of tagMappings) {
      const regex = mapping.htmlTag;
      const matches = newContent.match(regex);
      
      if (matches && matches.length > 0) {
        // Replace the HTML tag with the Next.js component
        newContent = newContent.replace(regex, (match, ...args) => {
          importsToAdd.add(mapping.importStatement);
          modified = true;
          return mapping.nextComponent(...args);
        });
        
        autoFixReport.tagConversions.push({
          file,
          tag: matches[0].substring(0, 50) + (matches[0].length > 50 ? '...' : ''),
          count: matches.length
        });
      }
    }
    
    // Add imports if needed
    if (importsToAdd.size > 0) {
      // Find a good spot to add imports
      const importStatements = Array.from(importsToAdd).join('\n');
      
      if (newContent.includes('import ')) {
        // Add after the last import statement
        const lastImportIndex = newContent.lastIndexOf('import ');
        const endOfImport = newContent.indexOf('\n', lastImportIndex);
        if (endOfImport !== -1) {
          newContent = 
            newContent.substring(0, endOfImport + 1) + 
            importStatements + '\n' + 
            newContent.substring(endOfImport + 1);
        }
      } else {
        // Add at the beginning of the file
        newContent = importStatements + '\n\n' + newContent;
      }
    }
    
    // Write the changes if the file was modified
    if (modified) {
      try {
        await writeFile(file, newContent, 'utf8');
        log(`Auto-converted tags in ${path.relative(rootDir, file)}`, 'fix');
      } catch (error) {
        log(`Failed to write to file ${file}: ${error.message}`, 'error');
        autoFixReport.errors.push(`Failed to write to file ${file}: ${error.message}`);
      }
    }
  }
  
  log('Completed auto-conversion of HTML tags', 'success');
}

/**
 * 2. Automatic Dependency Patching
 * 
 * Checks package.json for missing or outdated dependencies and updates them
 */
async function patchDependencies() {
  log('Starting automatic dependency patching');
  
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  
  try {
    // Read the package.json file
    const packageJsonContent = await readFile(packageJsonPath, 'utf8');
    const packageJson = JSON.parse(packageJsonContent);
    
    // Next.js recommended dependencies and versions
    const recommendedDeps = {
      dependencies: {
        'next': '14.0.3',  // Latest stable version at the time of writing
        'react': '18.2.0',
        'react-dom': '18.2.0',
        'next-auth': '4.24.5',
        'sharp': '^0.33.0'  // Required for Next.js Image optimization
      },
      devDependencies: {
        'eslint': '8.54.0',
        'eslint-config-next': '14.0.3',
        'autoprefixer': '10.4.16',
        'postcss': '8.4.31',
        'tailwindcss': '3.3.5'
      }
    };
    
    let modified = false;
    
    // Initialize dependencies objects if they don't exist
    packageJson.dependencies = packageJson.dependencies || {};
    packageJson.devDependencies = packageJson.devDependencies || {};
    
    // Check dependencies
    for (const [depType, deps] of Object.entries(recommendedDeps)) {
      for (const [dep, version] of Object.entries(deps)) {
        if (!packageJson[depType][dep]) {
          // Add missing dependency
          packageJson[depType][dep] = version;
          modified = true;
          autoFixReport.dependencyPatches.push({
            type: 'added',
            dependency: dep,
            version,
            depType
          });
          log(`Added missing ${depType.replace('dependencies', 'dependency')}: ${dep}@${version}`, 'fix');
        } else if (packageJson[depType][dep] !== version) {
          // Update outdated dependency
          const oldVersion = packageJson[depType][dep];
          packageJson[depType][dep] = version;
          modified = true;
          autoFixReport.dependencyPatches.push({
            type: 'updated',
            dependency: dep,
            oldVersion,
            newVersion: version,
            depType
          });
          log(`Updated ${dep} from ${oldVersion} to ${version}`, 'fix');
        }
      }
    }
    
    // Write updated package.json if changes were made
    if (modified) {
      await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
      log('Updated package.json with recommended dependencies', 'success');
    } else {
      log('No dependency updates needed in package.json', 'success');
    }
  } catch (error) {
    log(`Failed to patch dependencies: ${error.message}`, 'error');
    autoFixReport.errors.push(`Failed to patch dependencies: ${error.message}`);
  }
}

/**
 * 3. Automatic Installation of Missing Dependencies
 * 
 * Runs npm install to install any missing dependencies
 */
async function installMissingDependencies() {
  log('Starting automatic installation of dependencies');
  
  // Run npm install to install the dependencies from package.json
  const result = execCommand('npm install', { stdio: 'inherit' });
  
  if (result.success) {
    log('Successfully installed all dependencies', 'success');
    autoFixReport.dependencyInstallations.push({
      type: 'full-install',
      success: true
    });
  } else {
    log('Failed to install dependencies', 'error');
    autoFixReport.errors.push(`Failed to install dependencies: ${result.error}`);
    autoFixReport.dependencyInstallations.push({
      type: 'full-install',
      success: false,
      error: result.error
    });
  }
}

/**
 * Process Error Log for Missing Module Errors
 * 
 * Parses error messages for missing module errors and installs them
 */
function processErrorLogForMissingModules(errorLog) {
  const missingModuleRegex = /Module not found: Error: Can't resolve '([^']+)'/g;
  const matches = [...errorLog.matchAll(missingModuleRegex)];
  
  if (matches.length > 0) {
    log(`Detected ${matches.length} missing modules`, 'warning');
    
    // Extract unique module names
    const missingModules = [...new Set(matches.map(match => match[1]))];
    
    // Install each missing module
    for (const module of missingModules) {
      // Skip node core modules and relative imports
      if (module.startsWith('./') || module.startsWith('../') || 
          module.startsWith('/') || module === 'node:') {
        continue;
      }
      
      log(`Installing missing module: ${module}`, 'fix');
      const installResult = execCommand(`npm install ${module}`, { stdio: 'inherit' });
      
      autoFixReport.dependencyInstallations.push({
        type: 'missing-module',
        module,
        success: installResult.success
      });
      
      if (!installResult.success) {
        log(`Failed to install ${module}: ${installResult.error}`, 'error');
        autoFixReport.errors.push(`Failed to install ${module}: ${installResult.error}`);
      }
    }
    
    return missingModules.length > 0;
  }
  
  return false;
}

/**
 * Run ESLint with auto-fix
 */
function runEslintWithAutofix() {
  log('Running ESLint with auto-fix enabled');
  
  const result = execCommand('npx eslint . --ext .js,.jsx,.ts,.tsx --fix');
  
  if (result.success) {
    log('ESLint auto-fix completed successfully', 'success');
  } else {
    log('ESLint found issues that require manual fixing', 'warning');
    console.log(`\n${colors.yellow}${result.error}${colors.reset}\n`);
  }
  
  return result;
}

/**
 * Generate and print the final report
 */
function generateReport() {
  console.log(`\n${colors.cyan}${colors.bold}============================================================
                 VVS REPORT                 
============================================================${colors.reset}\n`);
  
  // Tag Conversions
  console.log(`${colors.magenta}${colors.bold}Tag Conversions:${colors.reset}`);
  if (autoFixReport.tagConversions.length === 0) {
    console.log(`  ${colors.dim}No tag conversions performed${colors.reset}`);
  } else {
    autoFixReport.tagConversions.forEach(conv => {
      console.log(`  ${colors.green}• ${path.relative(process.cwd(), conv.file)}:${colors.reset} ${conv.count} instance(s)`);
    });
  }
  
  // Dependency Patches
  console.log(`\n${colors.magenta}${colors.bold}Dependency Patches:${colors.reset}`);
  if (autoFixReport.dependencyPatches.length === 0) {
    console.log(`  ${colors.dim}No dependency patches needed${colors.reset}`);
  } else {
    autoFixReport.dependencyPatches.forEach(patch => {
      if (patch.type === 'added') {
        console.log(`  ${colors.green}• Added:${colors.reset} ${patch.dependency}@${patch.version} (${patch.depType})`);
      } else {
        console.log(`  ${colors.green}• Updated:${colors.reset} ${patch.dependency} from ${patch.oldVersion} to ${patch.newVersion} (${patch.depType})`);
      }
    });
  }
  
  // Dependency Installations
  console.log(`\n${colors.magenta}${colors.bold}Dependency Installations:${colors.reset}`);
  if (autoFixReport.dependencyInstallations.length === 0) {
    console.log(`  ${colors.dim}No dependency installations performed${colors.reset}`);
  } else {
    autoFixReport.dependencyInstallations.forEach(install => {
      if (install.type === 'full-install') {
        if (install.success) {
          console.log(`  ${colors.green}• Full dependency installation: Success${colors.reset}`);
        } else {
          console.log(`  ${colors.red}• Full dependency installation: Failed${colors.reset}`);
        }
      } else {
        if (install.success) {
          console.log(`  ${colors.green}• Installed missing module:${colors.reset} ${install.module}`);
        } else {
          console.log(`  ${colors.red}• Failed to install module:${colors.reset} ${install.module}`);
        }
      }
    });
  }
  
  // Errors
  if (autoFixReport.errors.length > 0) {
    console.log(`\n${colors.red}${colors.bold}Errors:${colors.reset}`);
    autoFixReport.errors.forEach(error => {
      console.log(`  ${colors.red}• ${error}${colors.reset}`);
    });
  }
  
  console.log(`\n${colors.cyan}${colors.bold}============================================================${colors.reset}\n`);
}

// Original validation steps
const validationSteps = [
  {
    name: 'Auto Tag Conversion',
    function: autoConvertTags,
    description: 'Converting HTML tags to Next.js components'
  },
  {
    name: 'Dependency Patching',
    function: patchDependencies,
    description: 'Checking and updating dependencies in package.json'
  },
  {
    name: 'Dependency Installation',
    function: installMissingDependencies,
    description: 'Installing missing dependencies'
  },
  {
    name: 'ESLint Auto-fix',
    function: runEslintWithAutofix,
    description: 'Running ESLint with auto-fix enabled'
  },
  {
    name: 'Next.js Build Simulation',
    command: 'npx next build',
    processErrors: true,
    description: 'Simulating production build to verify compile-time correctness',
    postProcess: (result) => {
      if (!result.success) {
        const modulesInstalled = processErrorLogForMissingModules(result.error);
        
        // If we installed missing modules, try the build again
        if (modulesInstalled) {
          log('Retrying Next.js build after installing missing modules', 'info');
          const retryResult = execCommand('npx next build', { stdio: 'inherit' });
          return retryResult.success;
        }
      }
      return result.success;
    }
  },
  {
    name: 'Environment Variables Check',
    function: async () => {
      log('Checking environment variables configuration');
      
      const envExamplePath = path.join(process.cwd(), '.env.local.example');
      
      if (!fs.existsSync(envExamplePath)) {
        log('No .env.local.example file found. Creating one with recommended variables.', 'warning');
        
        // Create a sample .env.local.example file
        const sampleEnv = `# CoinDailyNews Environment Variables
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_COINMARKETCAP_API_KEY=your-api-key-here
NEXT_PUBLIC_COINGECKO_API_KEY=your-api-key-here
OPENAI_API_KEY=your-openai-api-key-here
`;
        
        await writeFile(envExamplePath, sampleEnv, 'utf8');
        log('Created .env.local.example with recommended variables', 'fix');
        return true;
      }
      
      const envContent = await readFile(envExamplePath, 'utf8');
      const requiredVars = [
        'NEXT_PUBLIC_APP_URL',
        'NEXTAUTH_SECRET',
        'NEXTAUTH_URL'
      ];
      
      const missingVars = [];
      
      for (const variable of requiredVars) {
        if (!envContent.includes(variable)) {
          missingVars.push(variable);
        }
      }
      
      if (missingVars.length > 0) {
        log(`Missing required environment variables in .env.local.example: ${missingVars.join(', ')}`, 'warning');
        
        // Add the missing variables to the file
        let updatedEnvContent = envContent;
        for (const variable of missingVars) {
          updatedEnvContent += `\n${variable}=your-value-here`;
        }
        
        await writeFile(envExamplePath, updatedEnvContent, 'utf8');
        log('Added missing environment variables to .env.local.example', 'fix');
      } else {
        log('All required environment variables are properly configured', 'success');
      }
      
      return true;
    },
    description: 'Verifying required environment variables are properly configured'
  }
];

// Run all validation steps
async function runEnhancedValidation() {
  let hasError = false;
  
  for (const step of validationSteps) {
    log(`Starting: ${step.name} - ${step.description}`);
    
    try {
      if (step.function) {
        // Run custom function
        await step.function();
      } else if (step.command) {
        // Run command
        const result = execCommand(step.command, { stdio: 'inherit' });
        
        if (!result.success && step.processErrors) {
          // Process errors and potentially fix them
          const fixedSuccess = step.postProcess ? step.postProcess(result) : false;
          
          if (!fixedSuccess) {
            hasError = true;
          }
        } else if (!result.success) {
          hasError = true;
        }
      }
      
      log(`Completed: ${step.name}`, 'success');
    } catch (error) {
      log(`Failed: ${step.name}`, 'error');
      hasError = true;
      
      if (error.message) {
        console.error(`\n${colors.red}${error.message}${colors.reset}\n`);
        autoFixReport.errors.push(`${step.name}: ${error.message}`);
      }
    }
    
    console.log(''); // Add an empty line for better readability
  }
  
  // Generate and print the final report
  generateReport();
  
  if (hasError) {
    log('VVS: Some issues could not be automatically fixed. Please review the errors above.', 'warning');
    process.exit(1);
  } else {
    log('VVS: All validations passed. Code is ready for deployment!', 'success');
  }
}

// Execute the enhanced validation
runEnhancedValidation();