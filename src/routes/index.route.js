const coursesRouter = require('./courses.route');
const lessionsRouter = require('./lessions.route');
const detailLessionsRouter = require('./detailLessions.route');
const siteRouter = require('./site.route');

function route(app) {
    app.use('/courses', detailLessionsRouter);
    app.use('/courses', lessionsRouter);
    app.use('/courses', coursesRouter);

    app.use('/', siteRouter);
}

module.exports = route;
