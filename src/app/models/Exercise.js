const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Exercise = new Schema(
    {
        question: { type: String, required: true },
        answer: { type: Array },
        correct: { type: Array },
        slug: { type: String, slug: 'question', unique: true },
        lessionSlug: { type: String, required: true },
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
