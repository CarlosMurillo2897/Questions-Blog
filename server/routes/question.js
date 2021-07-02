import express from 'express';

const app = express.Router();

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

// /api/questions
app.get('/', (_, res) => { 
    setTimeout(() => {
        res.status(200).json(questions)
    }, 400);
});

// /api/questions/:id
app.get('/:id', (_, res) => {
    setTimeout(() => {
        res.status(200).json(question)    
    }, 400);
});

export default app;