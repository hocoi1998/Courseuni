const Course = require('../models/Course');
const Lession = require('../models/Lession');
const Comment = require('../models/Comment');
const Exercise = require('../models/Exercise');
const { multipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class DetailLessionsController {
    show(req, res, next) {
        // [GET] /:courseSlug/:lessionSlug

        let lessions = Lession.find({ courseSlug: req.params.courseSlug });
        let lession = Lession.findOne({ slug: req.params.lessionSlug });
        let exercises = Exercise.find({ lessionSlug: req.params.lessionSlug });
        let comments = Comment.find({ lessionSlug: req.params.lessionSlug })
            .populate('commentBy')
            .populate('reply.replyBy')
            .sort([['updatedAt', 'descending']]);
        let course = Course.findOne({ slug: req.params.courseSlug });

        Promise.all([lessions, lession, exercises, comments, course])
            .then(
                ([lessions, lession, exercises, comments, course]) =>
                    res.render('detailLession', {
                        title: lession.name,
                        lessions: multipleMongooseToObject(lessions),
                        lession: mongooseToObject(lession),
                        exercises: multipleMongooseToObject(exercises),
                        comments: multipleMongooseToObject(comments),
                        course: mongooseToObject(course),
                    }),
                // res.json(comments)
            )
            .catch(next);
    }
    comment(req, res, next) {
        const comment = new Comment(req.body);
        comment
            .save()
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
    }

    reply(req, res, next) {
        let cmtId = req.body.cmtId;
        Comment.updateOne({ _id: cmtId }, { $push: { reply: req.body } })
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
    }
}

module.exports = new DetailLessionsController();
