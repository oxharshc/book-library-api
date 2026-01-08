const express = require('express');
const mongoose = require('mongoose'); // Import mongoose
const Book = require('./models/book'); // Import the Book model
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

// Middleware to allow us to send JSON data
app.use(express.json());

// Connect to MongoDB
// 'book-library' will be the name of your database
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB!'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));

// const bookSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     author: {
//         type: String,
//         required: true
//     },
//     year: {
//         type: Number
//     }
// },
// {timestamps: true} // Automatically manage createdAt and updatedAt fields
// );

// const Book = mongoose.model('Book', bookSchema);

// A simple test route


// --- ROUTES --- //

// 1. CREATE: Add a new book (POST)
app.post('/books', async (req, res) => {
    try {
        const newBook = new Book(req.body); // Create a new book from user data
        const savedBook = await newBook.save(); // Save to database
        res.status(201).json(savedBook); // Send back the saved book
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 2. READ: Get all books (GET)
app.get('/books', async (req, res) => {
    try {
        const books = await Book.find(); // Find all books
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 3. READ: Get one book by ID (GET)
app.get('/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 4. UPDATE: Update a book by ID (PUT)
app.put('/books/:id', async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true } // Return the updated version, not the old one
        );
        if (!updatedBook) return res.status(404).json({ message: "Book not found" });
        res.json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 5. DELETE: Delete a book by ID (DELETE)
app.delete('/books/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).json({ message: "Book not found" });
        res.json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.get('/', (req, res) => {
    res.send('Hello! The Book Library API is running.');
});

// const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});