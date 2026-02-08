const mongoose = require('mongoose');

const toySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        default: 'https://via.placeholder.com/200'
    },
    description: {
        type: String,
        default: 'A very cute and soft plushie.'
    }
}, { timestamps: true }); 

module.exports = mongoose.model('Toy', toySchema);
