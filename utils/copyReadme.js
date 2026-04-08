const fs = require('fs');
const path = require('path');

const PACKAGES_DIR = path.resolve(process.cwd(), 'packages');
const README = path.resolve(process.cwd(), 'README.md');

const packages = fs.readdirSync(PACKAGES_DIR);

packages.forEach((packageName) => {
    if (packageName[0] === '.') {
        return;
    }

    const modulePath = path.resolve(PACKAGES_DIR, packageName);

    fs.copyFileSync(README, modulePath + '/README.md');
});
