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
    user: {
        firstName: 'Carlos',
        lastName: 'Murillo',
        email: 'email@email.com',
        password: '123456'
    }
};

const questions = new Array(10).fill(question);

// GET /api/questions
app.get('/', (_, res) => { 
    debug('GET /api/questions');
    setTimeout(() => {
        res.status(200).json(questions)
    }, 400);
});

// GET /api/questions/:id
app.get('/:id', (req, res) => {
    const { id } = req.params;
    const q = questions.find(({ _id }) => _id === +id);
    
    debug('GET /api/questions/:' + id);
    res.status(200).json(q);
});

// POST /api.questions/
app.post('/', (req, res) => {
    debug('POST /api/questions');
        const question = req.body;
        question.answers = [];
        question._id = +new Date();
        question.createdAt = new Date();
        question.user = {
            email: 'email@email.com',
            password: 'pwd12345',
            firstName: 'Charlie',
            lastName: 'Sheen',
        };
        
        questions.push(question);
        res.status(200).json(question);
});

export default app;