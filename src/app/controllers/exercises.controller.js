const Exercise = require('../models/Exercise');
const { mongooseToObject } = require('../../util/mongoose');

class ExercisesController {
    // [GET] /:slug
    show(req, res, next) {
        Exercise.findOne({
            _id: req.params.id,
        })
            .then((exercise) => {
                res.render('exercises', {
                    exercise: mongooseToObject(exercise),
                    isRadio: exercise.correct.length === 1,
                });
            })
            .catch(next);
    }
}

module.exports = new ExercisesController();
