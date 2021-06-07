const User = require('../models/User');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const Comment = require('../models/Comment');
const Exercise = require('../models/Exercise');
const { multipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class DetailLessonsController {
    show(req, res, next) {
        // [GET] /:courseSlug/:lessonSlug

        let lessons = Lesson.find({ courseSlug: req.params.courseSlug });
        let lesson = Lesson.findOne({ slug: req.params.lessonSlug });
        let exercises = Exercise.find({ lessonSlug: req.params.lessonSlug });
        let comments = Comment.find({ lessonSlug: req.params.lessonSlug })
            .populate('commentBy')
            .populate('reply.replyBy')
            .sort([['createdAt', 'descending']]);
        let course = Course.findOne({ slug: req.params.courseSlug });
        let user = User.findOne({ _id: req.signedCookies.userId });

        let lsDone = User.updateOne(
            { _id: req.signedCookies.userId },
            { $push: { lsDone: req.params.lessonSlug } },
        );

        Promise.all([lessons, lesson, exercises, comments, course, user])
            .then(
                ([lessons, lesson, exercises, comments, course, user]) => {
                    res.render('detailLesson', {
                        title: lesson.name,
                        lessons: multipleMongooseToObject(lessons),
                        lesson: mongooseToObject(lesson),
                        exercises: multipleMongooseToObject(exercises),
                        comments: multipleMongooseToObject(comments),
                        course: mongooseToObject(course),
                        user: mongooseToObject(user),
                    });
                    if (!user.lsDone.includes(req.params.lessonSlug)) {
                        return lsDone;
                    }
                },
                // res.json(req.params)
            )
            .catch(next);
    }
    comment(req, res, next) {
        const comment = new Comment(req.body);
        comment
            .save()
            .then(() => {
                res.send(true);
            })
            .catch(next);
    }
    update(req, res, next) {
        Comment.updateOne({ _id: req.body.cmtId }, req.body)
            .then(() => res.send(true))
            .catch(next);
    }

    reply(req, res, next) {
        let cmtId = req.body.cmtId;
        Comment.updateOne({ _id: cmtId }, { $push: { reply: req.body } })
            .then(() => {
                res.send(true);
            })
            .catch(next);
        // res.json(req.body);
    }

    updateReply(req, res, next) {
        let repId = req.body.repId;
        // Đang lỗi để tạm, chỉ sửa được reply đứng 1 mình, nhiều reply sẽ bị mất
        Comment.updateOne(
            { 'reply._id': repId },
            {
                $set: {
                    'reply.$.content': req.body.content,
                },
            },
        )
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
        // res.json(req.body);
    }
}

module.exports = new DetailLessonsController();
