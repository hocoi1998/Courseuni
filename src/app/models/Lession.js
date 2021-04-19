const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Lession = new Schema({
    _id: {},
    name: { type: String, maxLength: 255 },
    videoId: { type: String },

    slug: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Lession', Lession);
