const User = require('../models/User');
const { mongooseToObject } = require('../../util/mongoose');
module.exports = function AuthMiddleware(req, res, next) {
    if (!req.signedCookies.userId) {
        res.redirect('/login');
        return;
    }

    User.findOne({ _id: req.signedCookies.userId }).then((u) => {
        let user = mongooseToObject(u);

        if (!user) {
            res.redirect('login');
            return;
        }

        next();
    });
};
