const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phone: { type: String, maxLength: 11 },
        dateOfBirth: { type: Date },
        gender: { type: String },
        address: { type: String },
        avatar: { type: String, default: 'img/avt_default.png' },
        learning: { type: Array },
        isAdmin: { type: Boolean, default: false },
        banned: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('User', User);
