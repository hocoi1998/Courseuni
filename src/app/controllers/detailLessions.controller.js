const Course = require('../models/Course');
const Lession = require('../models/Lession');
const Exercise = require('../models/Exercise');
const { multipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class DetailLessionsController {
    show(req, res, next) {
        // [GET] /:courseSlug/:lessionSlug

        let lessions = Lession.find({ courseSlug: req.params.courseSlug });
        let lession = Lession.findOne({ slug: req.params.lessionSlug });
        let exercises = Exercise.find({ lessionSlug: req.params.lessionSlug });
        let course = Course.findOne({ slug: req.params.courseSlug });

        Promise.all([lessions, lession, exercises, course])
            .then(([lessions, lession, exercises, course]) =>
                res.render('detailLession', {
                    lessions: multipleMongooseToObject(lessions),
                    lession: mongooseToObject(lession),
                    exercises: multipleMongooseToObject(exercises),
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }
}

module.exports = new DetailLessionsController();
