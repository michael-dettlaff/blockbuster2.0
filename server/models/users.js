const mongoose = require('mongoose');

// have to do something with defaults
const UserSchema = new mongoose.Schema( {
    name : {type : String, required : true},
    email : { type : String, unique : true },
    password : { type : String, required : true },
    role : {type : String, required : true },
    classNum : {type : Number, required : true},
    numReviews : {type : Number, required : true},
    reviewsUngraded : {type : Number }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;