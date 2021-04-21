const Lession = require('../models/Lession');
const { multipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class DetailLessionsController {
    // [GET] /:courseSlug/:lessionSlug
    show(req, res, next) {
        Lession.find({ courseSlug: req.params.courseSlug })
            .then((lessions) => {
                lessions.map((lession) => {
                    if (lession.slug === req.params.lessionSlug) {
                        res.render('detailLession', {
                            lession: mongooseToObject(lession),
                            lessions: multipleMongooseToObject(lessions),
                        });
                    }
                });
            })
            .catch(next);
    }
}

module.exports = new DetailLessionsController();
