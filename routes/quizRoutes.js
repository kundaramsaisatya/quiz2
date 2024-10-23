const express = require('express');
const Quiz = require('../models/quizModel'); 
const router = express.Router();

// homeeee pageeeee
router.get('/', async (req, res) => {
    try {
        const quizzes = await Quiz.find(); 
        res.render('index', { quizzes });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Add a new quiz
router.post('/quiz/add', async (req, res) => {
    const { question, options, correctAnswer } = req.body;
    try {
        const newQuiz = new Quiz({ question, options: options.split(','), correctAnswer });
        await newQuiz.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/quiz/add', async (req, res) => {
    res.render('addnew')
});
router.get('/quiz/crud', async (req, res) => {
    const quizzes = await Quiz.find(); 
    res.render('crud',{quizzes})
});

// update an existing quiz
router.post('/quiz/update/:id', async (req, res) => {
    const { id } = req.params;
    const { question, options, correctAnswer } = req.body;
    try {
        //fixed the bugggg of whitespacess
        const trimmedOptions = options.split(',').map(option => option.trim()).filter(option => option !== "");
        
        await Quiz.findByIdAndUpdate(id, { question, options: trimmedOptions, correctAnswer });
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// this is for deleting a quiz
router.post('/quiz/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Quiz.findByIdAndDelete(id);
        res.redirect('/quiz/crud');
    } catch (err) { 
        res.status(500).send(err.message);
    }
});


// submit quiz and calculate score
router.post('/submit-quiz', async (req, res) => {
    let correctScore = 0;
    try {
        const quizzes = await Quiz.find(); // Fetch all quizzes from DB
        quizzes.forEach((quiz, index) => {
            const userAnswer = req.body[`answer-${index}`];
            if (userAnswer === quiz.correctAnswer) {
                correctScore++;
            }
        });
        res.render('result', { correctScore, totalQuestions: quizzes.length });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
