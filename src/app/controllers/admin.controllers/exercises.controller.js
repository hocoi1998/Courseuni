const Exercise = require('../../models/Exercise');

const { mongooseToObject } = require('../../../util/mongoose');
const { multipleMongooseToObject } = require('../../../util/mongoose');

class exercisesController {
    // EXERCISE
    // [GET] /admin/courses/:courseSlug/:lessionSlug
    show(req, res, next) {
        let exerciseQuery = Exercise.find({
            lessionSlug: req.params.lessionSlug,
        });

        Promise.all([
            exerciseQuery,
            Exercise.countDocumentsDeleted({
                lessionSlug: req.params.lessionSlug,
            }),
        ])
            .then(([exercises, deletedCount]) =>
                res.render('admin/list/exercises-list', {
                    layout: 'admin',
                    title: 'Quản lý bài tập',
                    deletedCount,
                    exercises: multipleMongooseToObject(exercises),
                    courseSlug: req.params.courseSlug,
                    lessionSlug: req.params.lessionSlug,
                }),
            )
            .catch(next);
    }

    // [GET] /admin/courses/:courseSlug/:lessionSlug/create
    create(req, res, next) {
        res.render('admin/create/exercise-create', {
            layout: 'admin',
            title: 'Thêm bài tập',
            lessionSlug: req.params.lessionSlug,
        });
    }
    // [POST] /admin/courses/:courseSlug/:lessionSlug/store
    store(req, res, next) {
        const exercises = new Exercise(req.body);
        exercises
            .save()
            .then(() => {
                res.redirect(
                    `/admin/courses/${req.params.courseSlug}/${req.params.lessionSlug}`,
                );
            })
            .catch(next);
        // res.json(req.body)
    }

    // [GET] /admin/courses/:courseSlug/:lessionSlug/:slug/edit
    edit(req, res, next) {
        Exercise.findOne({ slug: req.params.slug })
            .then((exercise) =>
                res.render('admin/edit/exercise-edit', {
                    layout: 'admin',
                    title: 'Sửa bài tập',
                    exercise: mongooseToObject(exercise),
                }),
            )
            .catch(next);
    }

    // [PUT] /admin/courses/:courseSlug/:lessionSlug/:slug/update
    update(req, res, next) {
        Exercise.updateOne({ slug: req.params.slug }, req.body)
            .then(() =>
                res.redirect(
                    `/admin/courses/${req.params.courseSlug}/${req.params.lessionSlug}`,
                ),
            )
            .catch(next);
    }
    // [DELETE] /admin/courses/:courseSlug/:lessionSlug/:slug/delete
    delete(req, res, next) {
        Exercise.delete({ slug: req.params.slug })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [GET] /admin/trash/courses/:courseSlug/:lessionSlug
    trash(req, res, next) {
        let exerciseQuery = Exercise.findDeleted({
            lessionSlug: req.params.lessionSlug,
        });

        exerciseQuery
            .then((exercises) =>
                res.render('admin/trash/exercises-trash', {
                    exercises: multipleMongooseToObject(exercises),
                    layout: 'admin',
                    title: 'Bài tập đã xoá',
                    courseSlug: req.params.courseSlug,
                    lessionSlug: req.params.lessionSlug,
                }),
            )
            .catch(next);
    }

    // [PATCH] /admin/trash/:courseSlug/:lessionSlug/:slug/restore
    restore(req, res, next) {
        Exercise.restore({ slug: req.params.slug })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /admin/trash/:courseSlug/:lessionSlug/:slug/forceDelete
    forceDelete(req, res, next) {
        Exercise.deleteOne({ slug: req.params.slug })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [POST] /admin/courses/:courseSlug/:lessionSlug/handle-form-actions
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Exercise.delete({ slug: { $in: req.body.checkSlugs } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'forceDelete':
                Exercise.deleteMany({ slug: { $in: req.body.checkSlugs } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'restore':
                Exercise.restore({ slug: { $in: req.body.checkSlugs } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action invalid' });
        }
    }
}

module.exports = new exercisesController();
