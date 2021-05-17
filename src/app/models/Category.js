const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

const Category = new Schema(
    {
        _id: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
        name: { type: String, maxLength: 255 },
        description: { type: String },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    },
);

// Add plugins
mongoose.plugin(slug);

module.exports = mongoose.model('Category', Category, 'categories');
