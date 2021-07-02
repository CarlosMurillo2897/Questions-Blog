import express from 'express';
import { question } from './routes';
import Debug from 'debug';

const app = express();
const debug = new Debug("Questions-Blog:app.js");

if(process.env.NODE_ENV.trim() === 'development') {
    debug('Added Headers.')
    app.use((_, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With', 'Content-Type', 'Accept');
        res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
        next();
    });
}

app.use('/api/questions', question);

export default app;