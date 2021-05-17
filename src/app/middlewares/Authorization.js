const User = require('../models/User');
const { mongooseToObject } = require('../../util/mongoose');
module.exports = function Authorization(req, res, next) {
    User.findOne({ _id: req.signedCookies.userId }).then((u) => {
        let user = mongooseToObject(u);

        if (!user.isAdmin) {
            res.redirect('/');
            return;
        }
        next();
    });
};
