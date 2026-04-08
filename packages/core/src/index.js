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

module.exports = { createCore };
