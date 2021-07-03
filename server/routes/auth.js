import express from 'express';
import Debug from 'debug';
import jwt from 'jsonwebtoken';
import { secret } from '../config';
import { findUserByEmail, users } from '../middleware';

const app = express.Router();
const debug = new Debug('Questions-Blog:Auth');

function comparePassword (providedPassword, userPassword) {
    return providedPassword === userPassword;
}

app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    const user = findUserByEmail(email);

    if(!user) { 
        debug(`User with email ${email} not found.`)
        return handleLoginFailed(res);
    }
    
    if(!comparePassword(password, user.password)) {
        debug(`Passwords do not match.`)
        return handleLoginFailed(res, 'Provided Password is not valid.');
    }

    const token = createToken(user);
    res.status(200).json({
        message: 'Login succeded.',
        token,
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    });
});

app.post('/signup', (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const user = {
        _id: +new Date(),
        firstName,
        lastName,
        email,
        password,
    };
    debug(`Creating new user: ${user}. `);
    users.push(user);
    const token = createToken(user);
    res.status(201).json({
        message: 'User saved',
        token,
        userId: user._id,
        firstName,
        lastName,
        email 
    });
});

const handleLoginFailed = (res, message) => 
    res.status(401).json({
        message: 'Login failed.',
        error: message || 'Email and Password do not match.',
});

const createToken = (user) => jwt.sign({ user }, secret, { expiresIn: 43200 });

export default app;