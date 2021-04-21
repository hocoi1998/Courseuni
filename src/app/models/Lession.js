const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Lession = new Schema(
    {
        name: { type: String, maxLength: 255 },
        videoId: { type: String },
        courseSlug: { type: String },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    },
);
module.exports = mongoose.model('Lession', Lession);
