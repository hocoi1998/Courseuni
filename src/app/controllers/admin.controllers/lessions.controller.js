const Lession = require('../../models/Lession');
const Exercise = require('../../models/Exercise');

const { mongooseToObject } = require('../../../util/mongoose');
const { multipleMongooseToObject } = require('../../../util/mongoose');

class lessionsController {
    // LESSION
    // [GET] /admin/courses/:courseSlug
    show(req, res, next) {
        let lessionQuery = Lession.find({ courseSlug: req.params.courseSlug });

        if (req.query.hasOwnProperty('_sort')) {
            lessionQuery = lessionQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([
            lessionQuery,
            Lession.countDocumentsDeleted({
                courseSlug: req.params.courseSlug,
            }),
        ])
            .then(([lessions, deletedCount]) =>
                res.render('admin/list/lessions-list', {
                    deletedCount,
                    lessions: multipleMongooseToObject(lessions),
                    courseSlug: req.params.courseSlug,
                }),
            )
            .catch(next);
    }

    // [GET] /admin/courses/:courseSlug/create
    create(req, res, next) {
        res.render('admin/create/lession-create', {
            courseSlug: req.params.courseSlug,
        });
    }
    // [POST] /admin/courses/:courseSlug/store
    store(req, res, next) {
        const lession = new Lession(req.body);
        lession
            .save()
            .then(() => {
                res.redirect(`/admin/courses/${req.params.courseSlug}`);
            })
            .catch(next);
    }

    // [GET] /admin/courses/:courseSlug/:lessionSlug/edit
    edit(req, res, next) {
        Lession.findOne({ slug: req.params.lessionSlug })
            .then((lession) =>
                res.render('admin/edit/lession-edit', {
                    lession: mongooseToObject(lession),
                }),
            )
            .catch(next);
    }

    // [PUT] /admin/courses/:courseSlug/:lessionSlug/update
    update(req, res, next) {
        Lession.updateOne({ slug: req.params.lessionSlug }, req.body)
            .then(() => res.redirect(`/admin/courses/${req.params.courseSlug}`))
            .catch(next);
    }

    // [DELETE] /admin/courses/:courseSlug/:lessionSlug/delete
    delete(req, res, next) {
        Lession.delete({ slug: req.params.lessionSlug }).then();
        Exercise.delete({ lessionSlug: req.params.lessionSlug })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [GET] /admin/trash/courses/:courseSlug
    trash(req, res, next) {
        let lessionQuery = Lession.findDeleted({
            courseSlug: req.params.courseSlug,
        });

        if (req.query.hasOwnProperty('_sort')) {
            lessionQuery = lessionQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        lessionQuery
            .then((lessions) =>
                res.render('admin/trash/lessions-trash', {
                    lessions: multipleMongooseToObject(lessions),
                    courseSlug: req.params.courseSlug,
                }),
            )
            .catch(next);
    }

    // [PATCH] /admin/trash/:courseSlug/:lessionSlug/restore
    restore(req, res, next) {
        Lession.restore({ slug: req.params.lessionSlug }).then();
        Exercise.restore({ lessionSlug: req.params.lessionSlug })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /admin/trash/:courseSlug/:lessionSlug/forceDelete
    forceDelete(req, res, next) {
        Lession.deleteOne({ slug: req.params.lessionSlug }).then();
        Exercise.deleteMany({ lessionSlug: req.params.lessionSlug })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [POST] /admin/courses/:courseSlug/handle-form-actions
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Lession.delete({ slug: { $in: req.body.checkSlugs } }).then();
                Exercise.delete({ lessionSlug: { $in: req.body.checkSlugs } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'forceDelete':
                Lession.deleteMany({
                    slug: { $in: req.body.checkSlugs },
                }).then();
                Exercise.deleteMany({
                    lessionSlug: { $in: req.body.checkSlugs },
                })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'restore':
                Lession.restore({ slug: { $in: req.body.checkSlugs } }).then();
                Exercise.restore({ lessionSlug: { $in: req.body.checkSlugs } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action invalid' });
        }
    }
}

module.exports = new lessionsController();
