const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        name: { type: String },
        email: { type: String },
        password: { type: String },
        phone: { type: String },
        dateOfBirth: { type: Date },
        gender: { type: String },
        address: { type: String },
        isAdmin: { type: Boolean, default: false },
        avatar: { type: String },
        learning: { type: Array },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('User', User);
