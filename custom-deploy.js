#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Custom deployment script for BOSS multi-version app
 * 
 * This script:
 * 1. Creates an all-builds folder at the root
 * 2. Copies build folders from version directories (v1, v2, etc.) to all-builds
 * 3. Deploys the consolidated builds to gh-pages
 */

const ROOT_DIR = __dirname;
const ALL_BUILDS_DIR = path.join(ROOT_DIR, 'all-builds');

// Color codes for better console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logStep(step, message) {
  log(`[${step}] ${message}`, colors.cyan);
}

function logSuccess(message) {
  log(`✅ ${message}`, colors.green);
}

function logError(message) {
  log(`❌ ${message}`, colors.red);
}

function logWarning(message) {
  log(`⚠️  ${message}`, colors.yellow);
}

/**
 * Check if a directory exists
 */
function directoryExists(dirPath) {
  try {
    return fs.statSync(dirPath).isDirectory();
  } catch (error) {
    return false;
  }
}

/**
 * Create directory if it doesn't exist
 */
function ensureDirectory(dirPath) {
  if (!directoryExists(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    logSuccess(`Created directory: ${dirPath}`);
  }
}

/**
 * Remove directory recursively
 */
function removeDirectory(dirPath) {
  if (directoryExists(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
    logSuccess(`Removed directory: ${dirPath}`);
  }
}

/**
 * Copy directory contents recursively
 */
function copyDirectory(source, destination) {
  ensureDirectory(destination);
  
  const items = fs.readdirSync(source);
  
  for (const item of items) {
    const sourcePath = path.join(source, item);
    const destinationPath = path.join(destination, item);
    
    const stat = fs.statSync(sourcePath);
    
    if (stat.isDirectory()) {
      copyDirectory(sourcePath, destinationPath);
    } else {
      fs.copyFileSync(sourcePath, destinationPath);
    }
  }
}

/**
 * Find all version directories (v1, v2, v3, etc.)
 */
function findVersionDirectories() {
  const items = fs.readdirSync(ROOT_DIR);
  const versionDirs = items.filter(item => {
    const itemPath = path.join(ROOT_DIR, item);
    return directoryExists(itemPath) && /^v\d+$/.test(item);
  });
  
  return versionDirs.sort((a, b) => {
    const numA = parseInt(a.slice(1));
    const numB = parseInt(b.slice(1));
    return numA - numB;
  });
}

/**
 * Build all versions before deployment
 */
function buildAllVersions(versionDirs) {
  logStep('BUILD', 'Building all versions...');
  
  for (const versionDir of versionDirs) {
    const versionPath = path.join(ROOT_DIR, versionDir);
    const packageJsonPath = path.join(versionPath, 'package.json');
    
    if (!fs.existsSync(packageJsonPath)) {
      logWarning(`No package.json found in ${versionDir}, skipping build`);
      continue;
    }
    
    try {
      log(`\n${colors.bright}Building ${versionDir}...${colors.reset}`);
      
      // Check if pnpm-lock.yaml exists to determine package manager
      const pnpmLockPath = path.join(versionPath, 'pnpm-lock.yaml');
      const usesPnpm = fs.existsSync(pnpmLockPath);
      
      const buildCommand = usesPnpm ? 'pnpm build' : 'npm run build';
      
      execSync(buildCommand, {
        cwd: versionPath,
        stdio: 'inherit'
      });
      
      logSuccess(`Built ${versionDir} successfully`);
    } catch (error) {
      logError(`Failed to build ${versionDir}: ${error.message}`);
      process.exit(1);
    }
  }
}

/**
 * Copy build folders from version directories to all-builds
 */
function copyVersionBuilds(versionDirs) {
  logStep('COPY', 'Copying version builds to all-builds folder...');
  
  // Remove existing all-builds directory
  removeDirectory(ALL_BUILDS_DIR);
  
  // Create fresh all-builds directory
  ensureDirectory(ALL_BUILDS_DIR);
  
  let copiedVersions = 0;
  
  for (const versionDir of versionDirs) {
    const buildPath = path.join(ROOT_DIR, versionDir, 'build');
    const distPath = path.join(ROOT_DIR, versionDir, 'dist');
    const destinationPath = path.join(ALL_BUILDS_DIR, versionDir);
    
    let sourcePath = null;
    let sourceType = null;
    
    if (directoryExists(buildPath)) {
      sourcePath = buildPath;
      sourceType = 'build';
    } else if (directoryExists(distPath)) {
      sourcePath = distPath;
      sourceType = 'dist';
    }
    
    if (sourcePath) {
      log(`Copying ${versionDir}/${sourceType} to all-builds/${versionDir}...`);
      copyDirectory(sourcePath, destinationPath);
      logSuccess(`Copied ${versionDir} ${sourceType} folder`);
      copiedVersions++;
    } else {
      logWarning(`No build or dist folder found for ${versionDir}`);
    }
  }
  
  if (copiedVersions === 0) {
    logError('No build or dist folders found to copy');
    process.exit(1);
  }
  
  logSuccess(`Copied ${copiedVersions} version(s) to all-builds`);
}

/**
 * Create an index.html file in all-builds for version navigation
 */
function createIndexPage(versionDirs) {
  const indexPath = path.join(ALL_BUILDS_DIR, 'index.html');
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BOSS - Version Selection</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
        }
        .container {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 2rem;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
        }
        h1 {
            text-align: center;
            margin-bottom: 2rem;
            font-size: 3rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .version-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin-top: 2rem;
        }
        .version-card {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 15px;
            padding: 1.5rem;
            text-align: center;
            transition: all 0.3s ease;
            border: 2px solid transparent;
        }
        .version-card:hover {
            transform: translateY(-5px);
            border-color: rgba(255, 255, 255, 0.5);
            box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);
        }
        .version-link {
            color: white;
            text-decoration: none;
            font-size: 1.5rem;
            font-weight: bold;
            display: block;
        }
        .version-description {
            margin-top: 0.5rem;
            opacity: 0.8;
            font-size: 0.9rem;
        }
        .footer {
            text-align: center;
            margin-top: 3rem;
            opacity: 0.7;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 BOSS</h1>
        <p style="text-align: center; font-size: 1.2rem; margin-bottom: 2rem;">
            Select a version to explore
        </p>
        
        <div class="version-grid">
${versionDirs.map(version => `            <div class="version-card">
                <a href="./${version}/" class="version-link">
                    ${version.toUpperCase()}
                </a>
                <div class="version-description">
                    Click to access ${version}
                </div>
            </div>`).join('\n')}
        </div>
        
        <div class="footer">
            <p>Generated on ${new Date().toLocaleDateString()}</p>
        </div>
    </div>
</body>
</html>`;

  fs.writeFileSync(indexPath, html);
  logSuccess('Created index.html for version navigation');
}

/**
 * Deploy to GitHub Pages
 */
function deployToGitHubPages() {
  logStep('DEPLOY', 'Deploying to GitHub Pages...');
  
  try {
    execSync('npm run deploy', {
      cwd: ROOT_DIR,
      stdio: 'inherit'
    });
    logSuccess('Deployed to GitHub Pages successfully!');
  } catch (error) {
    logError(`Failed to deploy: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Main deployment function
 */
function main() {
  log(`${colors.bright}${colors.magenta}🚀 Starting BOSS Custom Deployment${colors.reset}\n`);
  
  // Find all version directories
  const versionDirs = findVersionDirectories();
  
  if (versionDirs.length === 0) {
    logError('No version directories (v1, v2, etc.) found');
    process.exit(1);
  }
  
  log(`Found versions: ${versionDirs.join(', ')}\n`);
  
  // Check if --skip-build flag is provided
  const skipBuild = process.argv.includes('--skip-build');
  
  if (!skipBuild) {
    // Build all versions first
    buildAllVersions(versionDirs);
  } else {
    logWarning('Skipping build step (--skip-build flag provided)');
  }
  
  // Copy builds to all-builds folder
  copyVersionBuilds(versionDirs);
  
  // Create index page for version navigation
  createIndexPage(versionDirs);
  
  // Deploy to GitHub Pages
  deployToGitHubPages();
  
  log(`\n${colors.bright}${colors.green}🎉 Deployment completed successfully!${colors.reset}`);
  log(`${colors.bright}Your app should be available at your GitHub Pages URL${colors.reset}\n`);
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  main,
  findVersionDirectories,
  copyVersionBuilds,
  createIndexPage,
  deployToGitHubPages
};