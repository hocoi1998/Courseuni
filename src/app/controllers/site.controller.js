const User = require('../models/User');
const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const md5 = require('md5');

class SiteController {
    // [GET] /
    index(req, res, next) {
        let courseQuery = Course.find({})
            .sort({ totalStudent: 'desc' })
            .limit(6);
        Promise.all([
            courseQuery,
            Course.countDocuments(),
            User.countDocuments(),
            User.countDocuments({ learning: [] }),
        ])
            .then(([courses, count, students, notLearning]) => {
                res.render('home', {
                    courses: multipleMongooseToObject(courses),
                    count,
                    students,
                    learning: students - notLearning,
                });
            })
            .catch(next);
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }

    // GET /profile
    profile(req, res, next) {
        User.findOne({ _id: req.signedCookies.userId })
            .then((user) =>
                res.render('profile', {
                    user: mongooseToObject(user),
                }),
            )
            .catch(next);
    }

    // [PUT] /profile/update
    profileUpdate(req, res, next) {
        // req.body.avatar = req.file.path.split('\\').slice(2).join('/');
        User.updateOne({ _id: req.signedCookies.userId }, req.body)
            .then(() => res.redirect('/profile'))
            .catch(next);
    }

    // [GET] /profile/security
    profileSecurity(req, res, next) {
        res.render('security');
    }

    // [PUT] /profile/security/update
    profileSecurityUpdate(req, res, next) {
        let password = req.body.password;
        let newPassword = req.body.newPassword;
        let reNewPassword = req.body.reNewPassword;
        User.findOne({ _id: req.signedCookies.userId }).then((u) => {
            let user = mongooseToObject(u);
            if (
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
            }
        });
    }

    // [GET] /logout
    logout(req, res) {
        res.clearCookie('userId');
        res.redirect('/');
    }
}

module.exports = new SiteController();
