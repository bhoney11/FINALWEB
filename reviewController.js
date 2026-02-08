const Review = require("../models/Review");

exports.addReview = async (req, res) => {
    try {
        const review = await Review.create(req.body);
        res.status(201).json(review);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getReviewsByToy = async (req, res) => {
    try {
        const reviews = await Review.find({ toyId: req.params.toyId });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
