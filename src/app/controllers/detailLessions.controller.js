const DetailLession = require('../models/DetailLession');
const Lession = require('../models/Lession');
const { multipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class DetailLessionsController {
    // [GET] /:slug/:slug
    showLessions(req, res, next) {
        Lession.find({ courseSlug: req.params.courseSlug })
            .then((lessions) => {
                res.render('detailLession', {
                    lessions: multipleMongooseToObject(lessions),
                });
            })
            .catch(next);
    }
    showVideo(req, res, next) {
        Lession.findOne({ slug: req.params.slug })
            .then((lession) => {
                res.render('detailLession', {
                    lession: mongooseToObject(lession),
                });
            })
            .catch(next);
    }
}

module.exports = new DetailLessionsController();
