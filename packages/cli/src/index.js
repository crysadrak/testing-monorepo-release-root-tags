/**
 * CLI entry point.
 */
const { createCore } = require('@test-mono/core');

function runCli(args = []) {
    const core = createCore();

    console.log(`${core.name} cli running with args:`, args);
}

// change comment to summary of the file

module.exports = { runCli };
