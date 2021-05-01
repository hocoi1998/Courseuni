const coursesRouter = require('./courses.route');
const detailLessionsRouter = require('./detailLessions.route');
const lessionsRouter = require('./lessions.route');
const exercisesRouter = require('./exercises.route');
const siteRouter = require('./site.route');
const adminRouter = require('./admin.route');

function route(app) {
    app.use('/admin', adminRouter);
    app.use('/courses', coursesRouter);
    app.use('/courses', lessionsRouter);
    app.use('/courses/:courseSlug', exercisesRouter);
    app.use('/courses', detailLessionsRouter);

    app.use('/', siteRouter);
}

module.exports = route;
