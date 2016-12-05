/* eslint-disable global-require */

// The top-level (parent) route
export default {

  path: '/',

  // Keep in mind, routes are evaluated in order
  children: [
    require('./add').default,
    require('./detail').default,
    require('./list').default,
    require('./add-state').default,
    require('./res-catagory').default,
    require('./stat').default,
    require('./home').default,
    require('./state').default,
    require('./contact').default,
    require('./login').default,
    require('./register').default,
    require('./admin').default,

    // place new routes before...
    require('./content').default,
    require('./notFound').default,
  ],

  async action({ next }) {
    // Execute each child route until one of them return the result
    const route = await next();

    // Provide default values for title, description etc.
    route.title = `${route.title || 'Untitled Page'}`;
    route.description = route.description || '';

    return route;
  },

};
