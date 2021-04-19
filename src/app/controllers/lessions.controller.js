const Lession = require('../models/Lession');
const { multipleMongooseToObject } = require('../../util/mongoose');

class LessionsController {
    // [GET] /:slug
    show(req, res, next) {
        Lession.find({ courseSlug: req.params.slug })
            .then((lessions) => {
                res.render('lessions', {
                    lessions: multipleMongooseToObject(lessions),
                });
            })
            .catch(next);
    }
}

module.exports = new LessionsController();
