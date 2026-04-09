/**
 * Core library entry point.
 */

function createCore(config = {}) {
    return {
        name: 'core',
        version: '0.1.0',
        config,
    };
}

// change logic

module.exports = { createCore };
