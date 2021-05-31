const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Exercise = new Schema(
    {
        question: { type: String },
        answer: { type: Array },
        correct: { type: String },
        lessionSlug: { type: String },
    },
    {
        timestamps: true,
    },
);

// Add plugins
mongoose.plugin(slug);
Exercise.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});
module.exports = mongoose.model('Exercise', Exercise);
