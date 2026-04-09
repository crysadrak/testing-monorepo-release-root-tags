const { createCore } = require('@test-mono/core');

function createRouter(routes = []) {
    const core = createCore();

    return {
        name: 'router',
        core,
        routes,
    };
}

module.exports = { createRouter };

// additional change in router
