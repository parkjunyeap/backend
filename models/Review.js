const mongoose = require('mongoose');
const { Schema } = mongoose;

// 리뷰 등록 스키마 작성
const reviewSchema = new Schema({
    title: String,
    content: String,
    score: Number
}, {
    timestamps: true
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
