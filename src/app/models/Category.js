const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Category = new Schema(
    {
        // _id: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
        name: { type: String, required: true },
        description: { type: String },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    },
);

// Add plugins
mongoose.plugin(slug);
Category.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Category', Category, 'categories');
