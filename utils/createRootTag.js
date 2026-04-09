const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const changelog = fs.readFileSync(
    path.join(__dirname, '../CHANGELOG.md'),
    'utf-8',
);

// Read the version directly from the latest release heading written by syncRootChangelog.
// The heading format is "## release-vX.X.X".
const latestHeadingMatch = changelog.match(/^## release-v(\d+\.\d+\.\d+)/m);

if (!latestHeadingMatch) {
    console.error('Could not find a release-vX.X.X heading in root CHANGELOG.md');
    process.exit(1);
}

const version = latestHeadingMatch[1];

execSync(`git tag -a "release-v${version}" -m "Release v${version}"`, { stdio: 'inherit' });
