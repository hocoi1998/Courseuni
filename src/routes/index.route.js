const coursesRouter = require('./courses.route');
const detailLessonsRouter = require('./detailLessons.route');
const lessonsRouter = require('./lessons.route');
const exercisesRouter = require('./exercises.route');
const siteRouter = require('./site.route');
const adminRouter = require('./admin.route');
const authRouter = require('./auth.route');
const registerRouter = require('./register.route');
const profileRouter = require('./profile.route');
const categoriesRouter = require('./categories.route');

const AuthMiddleware = require('../app/middlewares/AuthMiddleware');
const Authorization = require('../app/middlewares/Authorization');

function route(app) {
    app.use('/login', authRouter);
    app.use('/register', registerRouter);
    app.use('/profile', AuthMiddleware, profileRouter);
    app.use('/categories', categoriesRouter);
    app.use('/admin', AuthMiddleware, Authorization, adminRouter);
    app.use('/courses', coursesRouter);
    app.use('/courses', AuthMiddleware, lessonsRouter);
    app.use('/courses/:courseSlug', AuthMiddleware, exercisesRouter);
    app.use('/courses', AuthMiddleware, detailLessonsRouter);

    app.use('/', siteRouter);
}

module.exports = route;
