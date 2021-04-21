const Exercise = require('../models/Exercise');
const { mongooseToObject } = require('../../util/mongoose');

class ExercisesController {
    // [GET] /:slug
    show(req, res, next) {
        Exercise.findOne({
            lessionSlug: req.params.lessionSlug,
            slug: req.params.slug,
        })
            .then((exercise) => {
                res.render('exercises', {
                    exercise: mongooseToObject(exercise),
                });
            })
            .catch(next);
    }
    // [GET] /courses/:slug/create
    create(req, res, next) {
        res.render('admin/create/exercise-create', {
            lessionSlug: req.params.lessionSlug,
        });
    }
    // [POST] /courses/:slug/store
    store(req, res, next) {
        const exercise = new Exercise(req.body);
        exercise
            .save()
            .then(() => {
                res.redirect('/courses');
            })
            .catch((error) => {});
    }
}

module.exports = new ExercisesController();
