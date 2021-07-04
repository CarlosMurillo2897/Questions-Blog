import express from 'express';
import Debug from 'debug';
import { required } from '../middleware/index';
import { question } from '../db-api';
import handleError from '../utils';

const app = express.Router();
const debug = new Debug("Questions-Blog:Questions");

// GET /api/questions
app.get('/', async (_, res) => { 
    try {
            debug('GET /api/questions');
            const questions = await question.findAll();
            res.status(200).json(questions);
        } catch(err) {
            handleError(error, res);
        }
    });
    
// GET /api/questions/:id
app.get('/:id', async (req, res) => {
    try {
        debug('GET /api/questions/:id');
        const q = await question.findById(req.params.id);
        res.status(200).json(q);
    } catch (error) {
        handleError(error, res);
    }
});

// POST /api/questions/
app.post('/', required, (req, res) => {
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
app.post('/:id/answers', required, (req, res) => {
    debug('POST /api/questions/:id/answers');
    const q = req.question;
    const answer = req.body;
    answer.createdAt = new Date();
    answer.user = req.user;
    
    q.answers.push(answer);
    res.status(201).json(answer);
});

export default app;