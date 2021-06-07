const Lesson = require('../../models/Lesson');
const Comment = require('../../models/Comment');
const Exercise = require('../../models/Exercise');

const { mongooseToObject } = require('../../../util/mongoose');
const { multipleMongooseToObject } = require('../../../util/mongoose');

class lessonsController {
    // Lesson
    // [GET] /admin/courses/:courseSlug
    show(req, res, next) {
        let currentPage = parseInt(req.query.page) || 1;
        let perPage = 10;
        let skip = (currentPage - 1) * perPage;

        let lessonQuery = Lesson.find({ courseSlug: req.params.courseSlug })
            .skip(skip)
            .limit(perPage);
        Promise.all([
            lessonQuery,
            Lesson.countDocumentsDeleted({
                courseSlug: req.params.courseSlug,
            }),
            Lesson.countDocuments({ courseSlug: req.params.courseSlug }),
        ])
            .then(([lessons, deletedCount, count]) =>
                res.render('admin/list/lessons-list', {
                    layout: 'admin',
                    title: 'Quản lý bài học',
                    deletedCount,
                    lessons: multipleMongooseToObject(lessons),
                    courseSlug: req.params.courseSlug,
                    pagination: {
                        page: currentPage,
                        limit: perPage,
                        totalRows: count,
                    },
                }),
            )
            .catch(next);
    }

    // [GET] /admin/courses/:courseSlug/create
    create(req, res, next) {
        res.render('admin/create/lesson-create', {
            layout: 'admin',
            title: 'Quản lý bài học',
            courseSlug: req.params.courseSlug,
        });
    }
    // [POST] /admin/courses/:courseSlug/store
    store(req, res, next) {
        const lesson = new Lesson(req.body);
        lesson
            .save()
            .then(() => {
                res.redirect(`/admin/courses/${req.params.courseSlug}`);
            })
            .catch(next);
    }

    // [GET] /admin/courses/:courseSlug/:lessonSlug/edit
    edit(req, res, next) {
        Lesson.findOne({ slug: req.params.lessonSlug })
            .then((lesson) =>
                res.render('admin/edit/lesson-edit', {
                    layout: 'admin',
                    title: 'Sửa bài học',
                    lesson: mongooseToObject(lesson),
                }),
            )
            .catch(next);
    }

    // [PUT] /admin/courses/:courseSlug/:lessonSlug/update
    update(req, res, next) {
        Lesson.updateOne({ slug: req.params.lessonSlug }, req.body)
            .then(() => res.redirect(`/admin/courses/${req.params.courseSlug}`))
            .catch(next);
    }

    // [DELETE] /admin/courses/:courseSlug/:lessonSlug/delete
    delete(req, res, next) {
        Lesson.delete({ slug: req.params.lessonSlug }).then();
        Comment.delete({ lessonSlug: req.params.lessonSlug }).then();
        Exercise.delete({ lessonSlug: req.params.lessonSlug })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [GET] /admin/trash/courses/:courseSlug
    trash(req, res, next) {
        let currentPage = parseInt(req.query.page) || 1;
        let perPage = 10;
        let skip = (currentPage - 1) * perPage;

        let lessonQuery = Lesson.findDeleted({
            courseSlug: req.params.courseSlug,
        })
            .skip(skip)
            .limit(perPage);

        Promise.all([
            lessonQuery,
            Lesson.countDocumentsDeleted({
                courseSlug: req.params.courseSlug,
            }),
        ])
            .then(([lessons, count]) =>
                res.render('admin/trash/lessons-trash', {
                    layout: 'admin',
                    title: 'Bài học đã xoá',
                    lessons: multipleMongooseToObject(lessons),
                    courseSlug: req.params.courseSlug,
                    pagination: {
                        page: currentPage,
                        limit: perPage,
                        totalRows: count,
                    },
                }),
            )
            .catch(next);
    }

    // [PATCH] /admin/trash/:courseSlug/:lessonSlug/restore
    restore(req, res, next) {
        Lesson.restore({ slug: req.params.lessonSlug }).then();
        Comment.restore({ lessonSlug: req.params.lessonSlug }).then();
        Exercise.restore({ lessonSlug: req.params.lessonSlug })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /admin/trash/:courseSlug/:lessonSlug/forceDelete
    forceDelete(req, res, next) {
        Lesson.deleteOne({ slug: req.params.lessonSlug }).then();
        Comment.deleteMany({ lessonSlug: req.params.lessonSlug }).then();
        Exercise.deleteMany({ lessonSlug: req.params.lessonSlug })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [POST] /admin/courses/:courseSlug/handle-form-actions
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Lesson.delete({ slug: { $in: req.body.checkSlugs } }).then();
                Comment.delete({
                    lessonSlug: { $in: req.body.checkSlugs },
                }).then();
                Exercise.delete({ lessonSlug: { $in: req.body.checkSlugs } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'forceDelete':
                Lesson.deleteMany({
                    slug: { $in: req.body.checkSlugs },
                }).then();
                Comment.deleteMany({
                    lessonSlug: { $in: req.body.checkSlugs },
                }).then();
                Exercise.deleteMany({
                    lessonSlug: { $in: req.body.checkSlugs },
                })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'restore':
                Lesson.restore({ slug: { $in: req.body.checkSlugs } }).then();
                Comment.restore({
                    lessonSlug: { $in: req.body.checkSlugs },
                }).then();
                Exercise.restore({ lessonSlug: { $in: req.body.checkSlugs } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action invalid' });
        }
    }
}

module.exports = new lessonsController();
