const User = require('../models/User');
const { mongooseToObject } = require('../../util/mongoose');

const expressValidator = require('express-validator');

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

        User.findOne({ email: email }).then((u) => {
            let user = mongooseToObject(u);

            if (user) {
                res.render('auth/register', {
                    title: 'Đăng ký tài khoản',
                    layout: 'auth',
                    emailValidation: 'Tài khoản đã tồn tại',
                    values: req.body,
                });
                return;
            }

            if (password === rePassword) {
                const userr = new User({
                    name,
                    email,
                    password: md5(password),
                });
                userr
                    .save()
                    .then(() => {
                        res.redirect('login');
                    })
                    .catch(next);
            }

            res.render('auth/register', {
                errors: ['Mật khẩu không trùng khớp'],
                values: req.body,
            });
        });
    }
}

module.exports = new RegisterController();
