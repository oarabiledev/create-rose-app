#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const args = process.argv.slice(2);
const projectName = args[0];

if (!projectName) {
    console.error(
        "\x1b[31m%s\x1b[0m",
        "Error: Please specify the project name"
    );
    console.log(
        "\x1b[36m%s\x1b[0m",
        "Usage: create-roseview-app <project-name>"
    );
    process.exit(1);
}

const projectPath = path.join(process.cwd(), projectName);
const templatePath = path.join(__dirname, "app");

if (fs.existsSync(projectPath)) {
    console.error(
        "\x1b[31m%s\x1b[0m",
        `Error: Directory ${projectName} already exists`
    );
    process.exit(1);
}

// Function to recursively copy a directory
function copyDirectory(src, dest) {
    const entries = fs.readdirSync(src, { withFileTypes: true });

    fs.mkdirSync(dest, { recursive: true });

    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        entry.isDirectory()
            ? copyDirectory(srcPath, destPath)
            : fs.copyFileSync(srcPath, destPath);
    }
}

try {
    // Print a yellow flower
    console.log(
        "\x1b[33m%s\x1b[0m",
        "🌼 Initializing project... Here's a yellow flower for you!"
    );
    copyDirectory(templatePath, projectPath);
    console.log(
        "\x1b[32m%s\x1b[0m",
        `Project ${projectName} has been created at ${projectPath}`
    );
} catch (error) {
    console.error("\x1b[31m%s\x1b[0m", "Error copying files:", error);
    process.exit(1);
}

// Change to the newly created project directory
process.chdir(projectPath);

// Initialize a new package.json file if it doesn't exist
if (!fs.existsSync("package.json")) {
    try {
        console.log("\x1b[34m%s\x1b[0m", "Initializing a new package.json...");
        execSync("npm init -y", { stdio: "inherit" });
    } catch (error) {
        console.error(
            "\x1b[31m%s\x1b[0m",
            "Error initializing package.json:",
            error
        );
        process.exit(1);
    }
}

// Read the existing package.json and modify it
try {
    const packageJsonPath = path.join(projectPath, "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

    // Add scripts to package.json
    packageJson.scripts = {
        ...packageJson.scripts,
        build: "vite build",
        dev: "vite",
    };

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log(
        "\x1b[32m%s\x1b[0m",
        "Updated package.json with build and dev scripts."
    );
} catch (error) {
    console.error("\x1b[31m%s\x1b[0m", "Error updating package.json:", error);
    process.exit(1);
}

// Check if the 'roseview' package is installed
function isRoseviewInstalled() {
    try {
        const installedVersion = JSON.parse(
            execSync("npm list roseview --depth=0", { encoding: "utf-8" })
        ).dependencies.roseview.version;

        // Check the latest version of 'roseview'
        const latestVersion = execSync("npm show roseview version", {
            encoding: "utf-8",
        }).trim();

        return installedVersion === latestVersion;
    } catch (error) {
        // If not installed, will throw an error
        return false;
    }
}

if (!isRoseviewInstalled()) {
    // Install the roseview package and other dependencies
    try {
        console.log("\x1b[34m%s\x1b[0m", "Installing 'roseview' package...");
        execSync("npm install roseview", { stdio: "inherit" });
        console.log("\x1b[32m%s\x1b[0m", "Installed 'roseview' package.");
    } catch (error) {
        console.error(
            "\x1b[31m%s\x1b[0m",
            "Failed to install dependencies:",
            error
        );
        process.exit(1);
    }
} else {
    console.log(
        "\x1b[32m%s\x1b[0m",
        "'roseview' package is already installed and is the latest version."
    );
}

// Optional: Open the project in VSCode if it's installed
const openInEditor = args.includes("--open");
if (openInEditor) {
    try {
        console.log("\x1b[34m%s\x1b[0m", "Opening project in VSCode...");
        execSync("code .", { stdio: "inherit" });
    } catch (error) {
        console.error(
            "\x1b[31m%s\x1b[0m",
            "VSCode is not installed or not in your PATH"
        );
    }
}

console.log(
    "\x1b[32m%s\x1b[0m",
    "Project setup complete! Ready to start developing!"
);
