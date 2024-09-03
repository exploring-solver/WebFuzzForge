const mongoose = require('./db');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const reportSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    toolName: {
        type: String,
        required: true,
    },
    output: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
const Report = mongoose.model('Report', reportSchema);

module.exports = { User, Report };
