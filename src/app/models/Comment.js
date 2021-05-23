const mongoose = require('mongoose');
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

module.exports = mongoose.model('Comment', Comment);
