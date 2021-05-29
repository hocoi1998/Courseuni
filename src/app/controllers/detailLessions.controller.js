const User = require('../models/User');
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
            .sort([['createdAt', 'descending']]);
        let course = Course.findOne({ slug: req.params.courseSlug });
        let user = User.findOne({ _id: req.signedCookies.userId });

        Promise.all([lessions, lession, exercises, comments, course, user])
            .then(
                ([lessions, lession, exercises, comments, course, user]) =>
                    res.render('detailLession', {
                        title: lession.name,
                        lessions: multipleMongooseToObject(lessions),
                        lession: mongooseToObject(lession),
                        exercises: multipleMongooseToObject(exercises),
                        comments: multipleMongooseToObject(comments),
                        course: mongooseToObject(course),
                        user: mongooseToObject(user),
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
    update(req, res, next) {
        Comment.updateOne({ _id: req.body.cmtId }, req.body)
            .then(() => res.redirect('back'))
            .catch(next);

        // res.json(req.body);
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
