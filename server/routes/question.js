import express from 'express';
import Debug from 'debug';

const app = express.Router();
const debug = new Debug("Questions-Blog:Questions");

const question = {
    _id: 1,
    title: 'How to re-use a Component on Android?',
    description: 'Look, this is my question..',
    createdAt: new Date(),
    icon: 'devicon-android-plain',
    answers: [],
};

const questions = new Array(10).fill(question);

function questionMiddleware(req, _, next) {
    const { id } = req.params;
    req.question = questions.find(({ _id }) => _id === +id);
    next();
}

function userMiddleware(req, _, next) {
    req.user = currentUser
    next();
}

// GET /api/questions
app.get('/', (_, res) => { 
    debug('GET /api/questions');
    setTimeout(() => {
        res.status(200).json(questions)
    }, 400);
});

// GET /api/questions/:id
app.get('/:id', questionMiddleware, (req, res) => {
    debug('GET /api/questions/:id');
    res.status(200).json(req.question);
});

// POST /api/questions/
app.post('/', userMiddleware, (req, res) => {
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
app.post('/:id/answers', questionMiddleware, userMiddleware, (req, res) => {
    debug('POST /api/questions/:id/answers');
    const q = req.question;
    const answer = req.body;
    answer.createdAt = new Date();
    answer.user = req.user;
    
    q.answers.push(answer);
    res.status(201).json(answer);
});

export default app;