const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/testdb';

mongoose.connect(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

const Cat = mongoose.model('Cat', { name: String });

app.get('/', async (req, res) => {
    try {
        const kitty = new Cat({ name: 'Cat ' + Math.floor(Math.random() * 100) });
        await kitty.save();
        res.send(`
        <h1>Привіт! Це Docker App.</h1>
        <p>Я підключений до MongoDB!</p>
        <p>Тільки що створив кота: <b>${kitty.name}</b></p>
        <p>Онови сторінку, щоб створити ще одного кота.</p>
                `)
    } catch (error) {
        res.status(500).send('Error with database operation: ' + error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})