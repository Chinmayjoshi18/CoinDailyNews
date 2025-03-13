#!/usr/bin/env node

/**
 * Vercel Validation System (VVS)
 * This script validates the codebase to ensure it meets Vercel deployment requirements.
 * It runs ESLint and simulates a Next.js build to catch any issues before deployment.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ANSI color codes for better console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

console.log(`${colors.cyan}${colors.bold}
============================================================
            VERCEL VALIDATION SYSTEM (VVS)                
============================================================${colors.reset}
`);

// Log with timestamp
function log(message, type = 'info') {
  const timestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  const prefix = type === 'error' ? `${colors.red}[ERROR]` :
                type === 'warning' ? `${colors.yellow}[WARNING]` :
                type === 'success' ? `${colors.green}[SUCCESS]` :
                `${colors.cyan}[INFO]`;
  
  console.log(`${prefix} ${timestamp}${colors.reset} - ${message}`);
}

// Validation steps
const steps = [
  {
    name: 'ESLint Validation',
    command: 'npx eslint . --ext .js,.jsx',
    description: 'Checking code for style and potential errors'
  },
  {
    name: 'Next.js Build Simulation',
    command: 'npx next build',
    description: 'Simulating production build to verify compile-time correctness'
  },
  {
    name: 'Environment Variables Check',
    customCheck: checkEnvironmentVariables,
    description: 'Verifying required environment variables are properly configured'
  }
];

// Check for required environment variables
function checkEnvironmentVariables() {
  log('Checking environment variables configuration');
  
  const envExamplePath = path.join(process.cwd(), '.env.local.example');
  
  if (!fs.existsSync(envExamplePath)) {
    log('No .env.local.example file found. This is recommended for Vercel deployments.', 'warning');
    return;
  }
  
  const envContent = fs.readFileSync(envExamplePath, 'utf8');
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
  } else {
    log('All required environment variables are properly configured', 'success');
  }
}

// Run all validation steps
async function runValidation() {
  let hasError = false;
  
  for (const step of steps) {
    log(`Starting: ${step.name} - ${step.description}`);
    
    try {
      if (step.customCheck) {
        await step.customCheck();
      } else {
        execSync(step.command, { stdio: 'inherit' });
      }
      log(`Completed: ${step.name}`, 'success');
    } catch (error) {
      log(`Failed: ${step.name}`, 'error');
      hasError = true;
      
      if (error.message) {
        console.error(`\n${colors.red}${error.message}${colors.reset}\n`);
      }
    }
    
    console.log(''); // Add an empty line for better readability
  }
  
  if (hasError) {
    log('VVS: Code validation failed. Please fix the errors above.', 'error');
    process.exit(1);
  } else {
    log('VVS: All validations passed. Code is ready for deployment!', 'success');
  }
}

// Execute validation
runValidation();