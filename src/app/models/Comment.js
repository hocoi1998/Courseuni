const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Comment = new Schema(
    {
        content: { type: String, required: true },
        commentBy: { type: Schema.Types.ObjectId, ref: 'User' },
        lessonSlug: { type: String, required: true },
        reply: [
            {
                type: new mongoose.Schema(
                    {
                        replyBy: { type: Schema.Types.ObjectId, ref: 'User' },
                        content: { type: String },
                    },
                    {
                        timestamps: true,
                    },
                ),
            },
        ],
    },
    {
        timestamps: true,
    },
);
// Add plugins
Comment.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Comment', Comment);
