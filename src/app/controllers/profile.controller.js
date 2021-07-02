const User = require('../models/User');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const { multipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const md5 = require('md5');

class ProfileController {
    // GET /profile
    profile(req, res, next) {
        const title = 'Thông tin tài khoản';
        User.findOne({ _id: req.signedCookies.userId })
            .then((user) =>
                res.render('profile', {
                    user: mongooseToObject(user),
                    title,
                }),
            )
            .catch(next);
    }

    // [PUT] /profile/update
    profileUpdate(req, res, next) {
        // req.body.avatar = req.file.path.split('\\').slice(2).join('/');
        let name = req.body.name;
        let email = req.body.email;

        if (!name || !email) {
            res.redirect('/profile');
        } else if (email) {
            const re = /^[a-zA-Z0-9_\.%\+\-]+@[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,}$/;
            const result = re.test(String(email).toLowerCase());
            if (result) {
                User.updateOne({ _id: req.signedCookies.userId }, req.body)
                    .then(() => res.redirect('/profile'))
                    .catch(next);
            } else {
                res.redirect('/profile');
            }
        }
    }

    // [GET] /profile/avatar
    profileAvatar(req, res, next) {
        const title = 'Đổi ảnh đại diện';
        res.render('avatar', {
            title,
        });
    }

    // [POST] /profile/avatar
    profileUpdateAvatar(req, res, next) {
        req.body.avtar = req.file.path.split('\\').slice(2).join('/');
        User.updateOne(
            { _id: req.signedCookies.userId },
            { avatar: req.body.avtar },
        )
            .then(() => {
                res.redirect('/');
            })
            .catch(next);
    }

    // [GET] /profile/security
    profileSecurity(req, res, next) {
        const title = 'Thay đổi mật khẩu';
        res.render('security', {
            title,
        });
    }

    // [PUT] /profile/security/update
    profileSecurityUpdate(req, res, next) {
        let password = req.body.password;
        let newPassword = req.body.newPassword;
        let reNewPassword = req.body.reNewPassword;
        User.findOne({ _id: req.signedCookies.userId }).then((u) => {
            let user = mongooseToObject(u);
            if (newPassword.length < 6) {
                res.redirect('back');
            } else if (
                md5(password) === user.password &&
                newPassword === reNewPassword
            ) {
                User.updateOne(
                    { _id: req.signedCookies.userId },
                    { password: md5(newPassword) },
                )
                    .then(() => {
                        res.clearCookie('userId');
                        res.redirect('/login');
                    })
                    .catch(next);
            } else {
                res.redirect('back');
            }
        });
    }

    // [GET] /profile/courses
    profileCourses(req, res, next) {
        const title = 'Khoá học của tôi';
        User.findOne({ _id: req.signedCookies.userId }).then((u) => {
            let courseQuery = Course.find({ slug: u.learning });
            let lessonQuery = Lesson.find({ courseSlug: u.learning });
            Promise.all([courseQuery, lessonQuery]).then(
                ([courses, lessons]) => {
                    res.render('learning', {
                        title,
                        courses: multipleMongooseToObject(courses),
                        lessons: multipleMongooseToObject(lessons),
                    });
                },
            );

            // Course.find({ slug: u.learning })
            //     .then((courses) => {
            //         Lesson.find({ courseSlug: courses.slug })
            //             .then((lessons) => {
            //                 res.render('learning', {
            //                     title,
            //                     courses: multipleMongooseToObject(courses),
            //                     lessons: multipleMongooseToObject(lessons),
            //                 })
            //             })
            //     })
        });
    }
}

module.exports = new ProfileController();
