const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Exercise = new Schema(
    {
        name: { type: String, maxLength: 255 },
        question: { type: String },
        lessionSlug: { type: String },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    },
);
module.exports = mongoose.model('Exercise', Exercise);
