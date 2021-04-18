const coursesRouter = require('./courses.route');
const siteRouter = require('./site.route');

function route(app) {
                                            app.use('/courses', coursesRouter);

    app.use('/', siteRouter);
}

module.exports = route;
