const { createCore } = require('@test-mono/core');

function createRouter(routes = []) {
    const core = createCore();

    return {
        name: 'router',
        core,
        routes,
    };
}

// change in router

module.exports = { createRouter };
