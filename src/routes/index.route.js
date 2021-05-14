const coursesRouter = require('./courses.route');
const detailLessionsRouter = require('./detailLessions.route');
const lessionsRouter = require('./lessions.route');
const exercisesRouter = require('./exercises.route');
const siteRouter = require('./site.route');
const adminRouter = require('./admin.route');
const authRouter = require('./auth.route');
const registerRouter = require('./register.route');

const AuthMiddleware = require('../app/middlewares/AuthMiddleware');

function route(app) {
    app.use('/login', authRouter);
    app.use('/register', registerRouter);
    app.use('/admin', AuthMiddleware, adminRouter);
    app.use('/courses', coursesRouter);
    app.use('/courses', AuthMiddleware, lessionsRouter);
    app.use('/courses/:courseSlug', AuthMiddleware, exercisesRouter);
    app.use('/courses', AuthMiddleware, detailLessionsRouter);

    app.use('/', siteRouter);
}

module.exports = route;
