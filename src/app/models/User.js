const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        name: { type: String, maxLength: 255 },
        email: { type: String, maxLength: 600 },
        password: { type: String },
        phone: { type: String },
        dateOfBirth: { type: Date },
        gender: { type: String },
        address: { type: String },
        role: { type: String },
        avatar: { type: String },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('User', User);
