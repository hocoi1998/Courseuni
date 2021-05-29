const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Course = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        image: { type: String, required: true },
        slug: { type: String },
        category: { type: Schema.Types.ObjectId, ref: 'Category' },
        author: { type: String },
        slug: { type: String, slug: 'name', unique: true },
        totalStudent: { type: Number, default: 0 },
        obtain: { type: Array },
    },
    {
        timestamps: true,
    },
);

// Add plugins
mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Course', Course);
