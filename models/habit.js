const mongoose = require('mongoose');
const User = require('./users');

const habitSchema = new mongoose.Schema({
    habitname:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    start: {
        type: Array,
        required: true,
    },
    current_streak: {
        type: Number, 
        required: true,
    },
    best_streak: {
        type: Number,
        default: 0,
    },
    success_Days: {
        type: Number, 
        default: 0,
    },
    completions: [{
        date: String,
        complete: String
    }],
    description: {
        type: String,
        required: true,
    }
},{
    timestamps: true,
});

const Habit = mongoose.model('habit', habitSchema);
module.exports = Habit;