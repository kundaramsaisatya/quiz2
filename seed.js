const mongoose = require('mongoose');
const Quiz = require('./models/quizModel');
const quizData = require('./data/quizData.json');

mongoose.connect('mongodb://localhost:27017/quiz-app').then(async () => {
    console.log('MongoDB Connected');
    await Quiz.insertMany(quizData);
    console.log('Quiz data inserted');
    mongoose.connection.close();
}).catch(err => console.log(err));

