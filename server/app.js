import express from 'express';
import { question, auth } from './routes';
import path from 'path';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if(process.env.NODE_ENV.trim() === 'development') {
    app.use((_, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept');
        res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS');
        next();
    });
}

if(process.env.NODE_ENV.trim() === 'production') {
    app.use(
        express.static(
            path.join(
                process.cwd(), 
                'dist/Questions-Blog'
            )
        )
    );
}


app.use('/api/questions', question);
app.use('/api/auth', auth);

export default app;