const mongoose = require('mongoose');
const Habit = require('./habit');
// const multer = require('multer');
// const path = require('path');
// const AVATAR_PATH = path.join('/uploads/users/avatars');
const userSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    habits : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'habit'
        }
    ],
    // avatar: {
    //     type: String
    // }
},{
    timestamps: true
})

// let storage = multer.diskStorage({
//     destination: function(req, file, cb){
//         cb(null, path.join(__dirname, '..' , AVATAR_PATH));
//     },
//     filename: function(req, file, cb){
//         cb(null, file.fieldname + '-' + Date.now());
//     }
// })

// static method 
// userSchema.static.uploadAvatar = multer({storage: storage}).single('avatar');
// userSchema.statics.avatarPath = AVATAR_PATH;
const user = mongoose.model('user', userSchema);
module.exports = user;