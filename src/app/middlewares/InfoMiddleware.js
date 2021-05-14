const User = require('../models/User');
const { mongooseToObject } = require('../../util/mongoose');
module.exports = function InfoMiddleware(req, res, next) {
    User.findOne({ _id: req.signedCookies.userId }).then((u) => {
        let user = mongooseToObject(u);
        res.locals.user = user;

        next();
    });
};
