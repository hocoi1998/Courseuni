const User = require('../models/User');
const { mongooseToObject } = require('../../util/mongoose');

const md5 = require('md5');

class RegisterController {
    // [GET] /register
    register(req, res, next) {
        res.render('auth/register', {
            title: 'Đăng ký tài khoản',
            layout: 'auth',
        });
    }

    // [POST] /postRegister
    postRegister(req, res, next) {
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;
        let rePassword = req.body.rePassword;

        let errors = {};

        if (email) {
            User.findOne({ email: email }).then((u) => {
                let user = mongooseToObject(u);
                if (user) {
                    errors.emailMsg = 'Email đã được sử dụng';
                }
                if (password.length < 6) {
                    errors.passMsg = 'Mật khẩu phải chứa ít nhất 6 ký tự';
                }

                if (password !== rePassword) {
                    errors.rePassMsg = 'Mật khẩu không trùng khớp';
                }

                if (errors.emailMsg || errors.passMsg || errors.rePassMsg) {
                    res.render('auth/register', {
                        title: 'Đăng ký tài khoản',
                        layout: 'auth',
                        errors: errors,
                        values: req.body,
                    });
                } else {
                    User({
                        name,
                        email,
                        password: md5(password),
                    })
                        .save()
                        .then(() => {
                            res.render('auth/register', {
                                title: 'Đăng ký tài khoản',
                                layout: 'auth',
                                values: req.body,
                                successfully: true,
                            });
                        })
                        .catch(next);
                }
            });
        }
    }
}

module.exports = new RegisterController();
