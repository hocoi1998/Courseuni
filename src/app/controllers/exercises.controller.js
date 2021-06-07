const User = require('../models/User');
const Exercise = require('../models/Exercise');
const { mongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');

class ExercisesController {
    // [GET] /:slug
    show(req, res, next) {
        Promise.all([
            Exercise.findOne({ slug: req.params.slug }),
            Exercise.find({ lessonSlug: req.params.lessonSlug }),
        ])
            .then(([exercise, exercises]) => {
                res.render('exercises', {
                    exercise: mongooseToObject(exercise),
                    isRadio: exercise.correct.length === 1,
                    exercises: multipleMongooseToObject(exercises),
                });
            })
            .catch(next);
    }
    update(req, res, next) {
        User.updateOne(
            { _id: req.body.id },
            { $push: { exDone: req.body.exDone } },
        )
            .then(res.redirect('back'))
            .catch(next);
    }
}

module.exports = new ExercisesController();
