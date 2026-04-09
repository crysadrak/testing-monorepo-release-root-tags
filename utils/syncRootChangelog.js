const fs = require('fs');
const path = require('path');

const ROOT_CHANGELOG = path.join(__dirname, '../CHANGELOG.md');
const PACKAGES_DIR = path.join(__dirname, '../packages');

const SECTION_ORDER = ['Major Changes', 'Minor Changes', 'Patch Changes'];

function syncChangelog() {
    const packageDirs = fs.readdirSync(PACKAGES_DIR);
    const sections = {};
    let hasUpdates = false;

    packageDirs.forEach((dir) => {
        const pkgLogPath = path.join(PACKAGES_DIR, dir, 'CHANGELOG.md');

        if (!fs.existsSync(pkgLogPath)) {
            return;
        }

        const content = fs.readFileSync(pkgLogPath, 'utf-8');
        // Matches the most recent version block in the package changelog
        const match = content.match(/## \d+\.\d+\.\d+[\s\S]*?(?=\n## |$)/);

        if (!match) {
            return;
        }

        hasUpdates = true;
        const block = match[0];
        const sectionRegex = /### (.+)\n([\s\S]*?)(?=\n### |\n## |$)/g;
        let sectionMatch;

        while ((sectionMatch = sectionRegex.exec(block)) !== null) {
            const heading = sectionMatch[1].trim();
            const body = sectionMatch[2].trim();

            if (body) {
                if (!sections[heading]) {
                    sections[heading] = [];
                }
                sections[heading].push(body);
            }
        }
    });

    if (!hasUpdates) {
        return;
    }

    let aggregatedUpdates = `## Release (${new Date().toISOString().split('T')[0]})\n\n`;

    const orderedKeys = [
        ...SECTION_ORDER.filter((k) => sections[k]),
        ...Object.keys(sections).filter((k) => !SECTION_ORDER.includes(k)),
    ];

    for (const heading of orderedKeys) {
        aggregatedUpdates += `### ${heading}\n\n${sections[heading].join('\n')}\n\n`;
    }

    const existingContent = fs.existsSync(ROOT_CHANGELOG)
        ? fs.readFileSync(ROOT_CHANGELOG, 'utf-8')
        : '';

    // Prevent duplicate entries if the script is run twice
    if (existingContent.includes(aggregatedUpdates.trim())) {
        console.info('Root changelog already up to date.');
        return;
    }

    fs.writeFileSync(ROOT_CHANGELOG, aggregatedUpdates + '\n' + existingContent);
    console.info('Root CHANGELOG.md updated.');
}

syncChangelog();
