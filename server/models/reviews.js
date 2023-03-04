const mongoose = require('mongoose');

// have to do something with defaults
const ReviewSchema = new mongoose.Schema( {
    email  : {type: String, required: true},
    title  : {type: String, required: true},
    rating : {type: Number, required: true},
    review : {type: String, required: true},
    poster: {type: String},
    grade : {type: String},
    feedback : {type: String},
    date : {type: String}
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;