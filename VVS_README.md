# Vercel Validation System (VVS)

This document explains the Vercel Validation System (VVS) integration in the CoinDailyNews project.

## Overview

The Vercel Validation System (VVS) is a custom validation framework designed to ensure that code is ready for deployment on Vercel. It automates the process of checking for common issues, linting errors, and deployment readiness.

## Components

### 1. Pre-Commit Hook with Husky

A pre-commit hook has been set up using Husky to run the VVS validation before each commit. This ensures that only code that passes all validations can be committed to the repository.

### 2. VVS Script

The VVS script (`scripts/run-vvs.js`) performs several validation steps:

- **ESLint Validation**: Checks code for style and potential errors
- **Build Simulation**: Simulates a production build to verify compile-time correctness
- **Environment Variables Check**: Ensures all required environment variables are properly configured

### 3. GitHub Actions Workflow

A GitHub Actions workflow (`.github/vvs.yml`) has been set up to run the VVS validation on every push and pull request to the main branch. This provides an additional layer of validation in the CI/CD pipeline.

## Usage

### Manual Validation

To manually run the VVS validation:

```bash
npm run validate:code
```

### Pre-Commit Validation

The VVS validation will automatically run before each commit. If validation fails, the commit will be aborted.

### CI/CD Validation

The VVS validation will run automatically on GitHub Actions for every push and pull request to the main branch.

## Configuration

### Adding New Validation Steps

To add new validation steps to the VVS script, edit the `steps` array in `scripts/run-vvs.js`.

### Modifying ESLint Rules

ESLint rules can be modified in the `.eslintrc.json` file.

## Troubleshooting

If VVS validation fails, review the error messages and make the necessary corrections. Common issues include:

- ESLint errors
- Build errors
- Missing environment variables

## Integration with Vercel

Once code passes VVS validation, it is ready to be deployed on Vercel. The validation ensures that all Vercel-specific requirements are met, including:

- Proper Next.js configuration
- Production-ready code quality
- Correct environment variable setup