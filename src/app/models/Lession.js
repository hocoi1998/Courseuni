const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Lession = new Schema(
    {
        name: { type: String, required: true },
        videoId: { type: String, required: true },
        courseSlug: { type: String },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    },
);

// Add plugins
mongoose.plugin(slug);
Lession.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});
module.exports = mongoose.model('Lession', Lession);
