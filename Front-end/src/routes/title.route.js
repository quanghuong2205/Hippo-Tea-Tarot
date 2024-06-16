'use strict';
import publicRoutes from './public.route';
import privateRoutes from './private.route';

/* Map title */
const routes = [...publicRoutes, ...privateRoutes];
const titles = {};
routes.forEach((r) => {
    titles[r.path] = r.title;
});

/* Get title */
const getHtmlTitle = ({ path }) => {
    return titles[path];
};

export default getHtmlTitle;
