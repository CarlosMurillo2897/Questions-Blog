import express from 'express';
import Debug from 'debug';
import jwt from 'jsonwebtoken';
import { secret } from '../config';
import { User } from '../models';
import { handleLoginFailed } from '../utils';
import {
    hashSync as hash,
    compareSync as comparePassword,
} from 'bcryptjs';

const app = express.Router();
const debug = new Debug('Questions-Blog:Auth');

app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if(!user) { 
        const errorMsg = `User with email ${email} not found.`
        debug(errorMsg);
        return handleLoginFailed(res, errorMsg);
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

app.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const u = new User({
            firstName,
            lastName,
            email,
            password: hash(password, 10),
        });
        debug(`Creating new user: ${u}. `);
        
        const user = await u.save();
        const token = createToken(user);
        
        res.status(201).json({
            message: 'User saved',
            token,
            userId: user._id,
            firstName,
            lastName,
            email 
        });
    } catch (error) {
        handleLoginFailed(res, error.message);
    }
});

const createToken = (user) => jwt.sign({ user }, secret, { expiresIn: 43200 });

export default app;