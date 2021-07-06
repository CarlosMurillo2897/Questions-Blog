import express from 'express';
import Debug from 'debug';
import { required, questionMiddleware } from '../middleware';
import { question } from '../db-api';
import handleError from '../utils';
import User from '../models/user';

const app = express.Router();
const debug = new Debug("Questions-Blog:Questions");

// GET /api/questions
app.get('/', async (req, res) => { 
    try {
        debug('GET /api/questions');
        const { sort } = req.query;
        const questions = await question.findAll(sort);
        res.status(200).json(questions);
    } catch(err) {
        handleError(error, res);
    }
});
    
// GET /api/questions/:id
app.get('/:id', questionMiddleware, async (req, res) => {
    try {
        debug('GET /api/questions/:id');
        res.status(200).json(req.question);
    } catch (error) {
        handleError(error, res);
    }
});

// GET /api/questions/user/:id
app.get('/user/:id', async (req, res) => {
    try {
        debug('GET /api/questions/user/:id');
        const { id } = req.params;
        const { sort } = req.query;
        const questions = await question.findQuestionsByUser(id, sort);
        res.status(200).json(questions);
    } catch (error) {
        handleError(error, res);
    }
});

// POST /api/questions/
app.post('/', required, async (req, res) => {
    debug('POST /api/questions');
    const { title, description, icon } = req.body;
    const q = {
        title,
        description,
        icon,
        user: req.user._id,
    };

    try {
        const savedQuestion = await question.create(q);
        res.status(201).json(savedQuestion);
    } catch (error) {
        handleError(error, res);
    }
});

// POST /api/questions/:id/answers
app.post('/:id/answers', required, questionMiddleware, async (req, res) => {
    debug('POST /api/questions/:id/answers');
    const a = req.body;
    const q = req.question;
    a.user = new User(req.user);
    
    try {
        const savedAnswer = await question.createAnswer(q, a);
        res.status(201).json(savedAnswer);
    } catch (error) {
        handleError(error, res);
    }
});

// PUT /api/questions/
app.put('/', async (req, res) => {
    try {
        debug('PUT /api/questions/');
        await question.setActiveQuestion(req.body);
        res.status(200).json(question);
    } catch (error) {
        handleError(error, res);
    }
});

export default app;