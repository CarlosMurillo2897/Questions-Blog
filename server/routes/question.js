import express from 'express';
import Debug from 'debug';
import { required, questionMiddleware, questionsMiddleware, questions } from '../middleware/index';

const app = express.Router();
const debug = new Debug("Questions-Blog:Questions");

// GET /api/questions
app.get('/', questionsMiddleware, (req, res) => { 
    debug('GET /api/questions');
    setTimeout(() => {
        res.status(200).json(req.questions)
    }, 400);
});

// GET /api/questions/:id
app.get('/:id', questionMiddleware, (req, res) => {
    debug('GET /api/questions/:id');
    res.status(200).json(req.question);
});

// POST /api/questions/
app.post('/', required, questionsMiddleware, (req, res) => {
    debug('POST /api/questions');
    const question = req.body;
    question.answers = [];
    question._id = +new Date();
    question.createdAt = new Date();
    question.user = req.user;
    
    questions.push(question);
    res.status(201).json(question);
});

// POST /api/questions/:id/answers
app.post('/:id/answers', required, questionMiddleware, (req, res) => {
    debug('POST /api/questions/:id/answers');
    const q = req.question;
    const answer = req.body;
    answer.createdAt = new Date();
    answer.user = req.user;
    
    q.answers.push(answer);
    res.status(201).json(answer);
});

export default app;