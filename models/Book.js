const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    year: {
        type: Number
    }
},
{timestamps: true} // Automatically manage createdAt and updatedAt fields
);

module.exports = mongoose.model('Book', bookSchema);