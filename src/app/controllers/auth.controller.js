const User = require('../models/User');
const { mongooseToObject } = require('../../util/mongoose');

const md5 = require('md5');

class AuthController {
    // [GET] /login
    login(req, res, next) {
        res.render('auth/login');
    }

    // [POST] /postLogin
    postLogin(req, res, next) {
        let email = req.body.email;
        let password = req.body.password;

        User.findOne({ email: email })
            .then((u) => {
                let user = mongooseToObject(u);

                if (!user) {
                    res.render('auth/login', {
                        errors: ['Tài khoản không tồn tại'],
                        values: req.body,
                    });
                    return;
                }
                let hashedPassword = md5(password);
                if (user.password !== hashedPassword) {
                    res.render('auth/login', {
                        errors: ['Mật khẩu không chính xác'],
                        values: req.body,
                    });
                    return;
                }

                res.cookie('userId', user._id, {
                    signed: true,
                });
                res.redirect('/admin/courses');
            })
            .catch(next);
    }
}

module.exports = new AuthController();
