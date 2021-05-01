const Course = require('../../models/Course');
const Lession = require('../../models/Lession');
const Exercise = require('../../models/Exercise');
const { mongooseToObject } = require('../../../util/mongoose');
const { multipleMongooseToObject } = require('../../../util/mongoose');

class coursesController {
    // COURSES
    // [GET] /admin/courses
    show(req, res, next) {
        let courseQuery = Course.find({});

        if (req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([courseQuery, Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) =>
                res.render('admin/list/courses-list', {
                    deletedCount,
                    courses: multipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
    // [GET] /admin/courses/create
    create(req, res, next) {
        res.render('admin/create/course-create');
    }
    // [POST] /admin/courses/store
    store(req, res, next) {
        const course = new Course(req.body);
        course
            .save()
            .then(() => {
                res.redirect('/admin/courses');
            })
            .catch(next);
    }

    // [GET] /admin/courses/:courseSlug/edit
    edit(req, res, next) {
        Course.findOne({ slug: req.params.courseSlug })
            .then((course) =>
                res.render('admin/edit/course-edit', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }

    // [PUT] /admin/courses/:courseSlug/update
    update(req, res, next) {
        Course.updateOne({ slug: req.params.courseSlug }, req.body)
            .then(() => res.redirect('/admin/courses'))
            .catch(next);
    }

    // [DELETE] /admin/courses/:courseSlug/delete
    delete(req, res, next) {
        let lessions = Lession.find({ courseSlug: req.params.courseSlug });
        lessions.select('slug');
        lessions.exec(function (err, lessions) {
            const lessionSlugs = lessions.map((lession) => lession.slug);
            Exercise.delete({ lessionSlug: lessionSlugs }).then(() => {});
        });
        Course.delete({ slug: req.params.courseSlug }).then(() => {});
        Lession.delete({ courseSlug: req.params.courseSlug })
            .then(res.redirect('back'))
            .catch(next);
    }

    // [GET] /admin/trash/courses
    trash(req, res, next) {
        let courseQuery = Course.findDeleted({});

        if (req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type,
            });
        }
        courseQuery
            .then((courses) =>
                res.render('admin/trash/courses-trash', {
                    courses: multipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }

    // [PATCH] /admin/trash/:courseSlug/restore
    restore(req, res, next) {
        Course.restore({ slug: req.params.courseSlug }).then(() => {});
        Lession.restore({ courseSlug: req.params.courseSlug }).then();

        let lessions = Lession.find({ courseSlug: req.params.courseSlug });
        lessions.select('slug');
        lessions.exec(function (err, lessions) {
            const lessionSlugs = lessions.map((lession) => lession.slug);
            Exercise.restore({ lessionSlug: lessionSlugs })
                .then(res.redirect('back'))
                .catch(next);
        });
    }

    // [PATCH] /admin/trash/:courseSlug/forceDelete
    forceDelete(req, res, next) {
        let lessions = Lession.findDeleted({
            courseSlug: req.params.courseSlug,
        });
        lessions.select('slug');
        lessions.exec(function (err, lessions) {
            const lessionSlugs = lessions.map((lession) => lession.slug);
            Exercise.deleteMany({ lessionSlug: lessionSlugs }).then(() => {});
        });
        Course.deleteOne({ slug: req.params.courseSlug }).then(() => {});
        Lession.deleteMany({ courseSlug: req.params.courseSlug })
            .then(res.redirect('back'))
            .catch(next);
    }

    // [POST] /admin/courses/handle-form-actions
    handleFormActions(req, res, next) {
        let lessions = Lession.find({
            courseSlug: { $in: req.body.checkSlugs },
        });
        lessions.select('slug');
        switch (req.body.action) {
            case 'delete':
                lessions.exec(function (err, lessions) {
                    const lessionSlugs = lessions.map(
                        (lession) => lession.slug,
                    );
                    Exercise.delete({
                        lessionSlug: lessionSlugs,
                    }).then(() => {});
                });
                Course.delete({ slug: { $in: req.body.checkSlugs } }).then();
                Lession.delete({ courseSlug: { $in: req.body.checkSlugs } })
                    .then(() => res.redirect('back'))
                    .catch(next);

                break;
            case 'forceDelete':
                lessions = Lession.findDeleted({
                    courseSlug: { $in: req.body.checkSlugs },
                });
                lessions.select('slug');
                lessions.exec(function (err, lessions) {
                    const lessionSlugs = lessions.map(
                        (lession) => lession.slug,
                    );
                    Exercise.deleteMany({ lessionSlug: lessionSlugs }).then();
                    Lession.deleteMany({
                        courseSlug: { $in: req.body.checkSlugs },
                    }).then();
                    Course.deleteMany({ slug: { $in: req.body.checkSlugs } })
                        .then(res.redirect('back'))
                        .catch(next);
                });
                break;
            case 'restore':
                lessions = Lession.findDeleted({
                    courseSlug: { $in: req.body.checkSlugs },
                });
                lessions.select('slug');
                lessions.exec(function (err, lessions) {
                    const lessionSlugs = lessions.map(
                        (lession) => lession.slug,
                    );
                    Exercise.restore({ lessionSlug: lessionSlugs }).then();
                });
                Lession.restore({
                    courseSlug: { $in: req.body.checkSlugs },
                }).then();
                Course.restore({ slug: { $in: req.body.checkSlugs } })
                    .then(() => res.redirect('back'))
                    .catch(next);

                break;
            default:
                res.json({ message: 'Action invalid' });
        }
    }
}

module.exports = new coursesController();
