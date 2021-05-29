const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Comment = new Schema(
    {
        content: { type: String, required: true },
        commentBy: { type: Schema.Types.ObjectId, ref: 'User' },
        lessionSlug: { type: String },
        reply: [
            {
                replyBy: { type: Schema.Types.ObjectId, ref: 'User' },
                content: { type: String },
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
