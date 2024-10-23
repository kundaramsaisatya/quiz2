const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const quizRoutes = require('./routes/quizRoutes');
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/quiz-app').then(() => {
    console.log('MongoDB Connected');
}).catch(err => console.log(err));

app.use('/', quizRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
