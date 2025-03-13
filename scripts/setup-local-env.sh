#!/bin/bash

# Set up environment variables for better control
set -e  # Exit immediately if any command fails
set -o pipefail  # Pipeline fails if any command fails

# Display colorful output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Parse command line arguments
DRY_RUN=false
for arg in "$@"; do
  case $arg in
    --dry-run)
      DRY_RUN=true
      shift
      ;;
    *)
      # Unknown option
      ;;
  esac
done

# Step 1: Check if the "CoinDailyNews" repository exists locally
PROJECT_DIR="/Users/chinmayjoshi/Documents/Coding/CoindailyNews"
REPO_URL="https://github.com/Chinmayjoshi18/CoinDailyNews.git"  # Updated with the correct GitHub repository URL

echo -e "${YELLOW}Setting up CoinDailyNews local environment...${NC}"
if [ "$DRY_RUN" = true ]; then
  echo -e "${YELLOW}DRY RUN MODE: Commands will be shown but not executed${NC}"
fi

if [ -d "$PROJECT_DIR" ]; then
    echo -e "${GREEN}Project directory exists at $PROJECT_DIR.${NC}"
else
    echo -e "${YELLOW}Project directory not found. Cloning from GitHub...${NC}"
    if [ "$DRY_RUN" = true ]; then
      echo "Would run: cd /Users/chinmayjoshi/Documents/Coding || exit"
      echo "Would run: git clone \"$REPO_URL\" CoindailyNews"
    else
      cd /Users/chinmayjoshi/Documents/Coding || exit
      git clone "$REPO_URL" CoindailyNews
      if [ $? -ne 0 ]; then
          echo -e "${RED}Failed to clone repository. Please check the URL and your internet connection.${NC}"
          exit 1
      fi
    fi
fi

# Step 2: Navigate to the project directory
echo -e "${YELLOW}Navigating to project directory...${NC}"
if [ "$DRY_RUN" = true ]; then
  echo "Would run: cd \"$PROJECT_DIR\""
else
  cd "$PROJECT_DIR" || { echo -e "${RED}Failed to navigate to project directory.${NC}"; exit 1; }
fi

# Step 3: Install all dependencies and patch missing SWC dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
if [ "$DRY_RUN" = true ]; then
  echo "Would run: npm install"
else
  npm install
  if [ $? -ne 0 ]; then
      echo -e "${RED}Failed to install dependencies. Attempting to fix lockfile...${NC}"
      rm -f package-lock.json
      npm install --no-fund --no-audit
      if [ $? -ne 0 ]; then
          echo -e "${RED}Failed to install dependencies even after fixing lockfile. Please check npm errors.${NC}"
          exit 1
      fi
  fi
fi

# Step 4: Install missing dependencies (e.g., react-quill)
echo -e "${YELLOW}Installing missing modules...${NC}"
if [ "$DRY_RUN" = true ]; then
  echo "Would run: npm install react-quill"
else
  npm install react-quill
  if [ $? -ne 0 ]; then
      echo -e "${RED}Failed to install react-quill. Check npm errors.${NC}"
      exit 1
  fi
fi

# Step 5: Run ESLint auto-fix to resolve unused variables and console warnings
echo -e "${YELLOW}Running ESLint auto-fix...${NC}"
if [ "$DRY_RUN" = true ]; then
  echo "Would run: npx eslint . --fix"
else
  npx eslint . --fix
  if [ $? -ne 0 ]; then
      echo -e "${YELLOW}ESLint found issues that couldn't be auto-fixed. Check the output above.${NC}"
      # Don't exit as this is not a critical failure
  fi
fi

# Step 6: Run VVS to validate the codebase
echo -e "${YELLOW}Running Vercel Validation System...${NC}"
if [ "$DRY_RUN" = true ]; then
  echo "Would run: npm run validate:code"
else
  npm run validate:code || {
      echo -e "${YELLOW}VVS found issues. Please check the output above.${NC}"
      # Don't exit as this is not a critical failure
  }
fi

# Step 7: Build the project to verify that issues are resolved
echo -e "${YELLOW}Building the project...${NC}"
if [ "$DRY_RUN" = true ]; then
  echo "Would run: npm run build"
else
  npm run build
  if [ $? -ne 0 ]; then
      echo -e "${RED}Build failed. Please check the errors above.${NC}"
      exit 1
  fi
fi

echo -e "${GREEN}Local environment setup completed successfully!${NC}"
echo -e "${YELLOW}You can now start the development server with:${NC} npm run dev" 