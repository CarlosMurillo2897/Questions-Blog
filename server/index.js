import Debug from 'debug';
import app from './app';
import mongoose from 'mongoose';
import { mongoUrl } from './config';

const PORT = 3000;
const debug = new Debug('Questions-Blog:root');

async function start() {
        await mongoose.connect(mongoUrl, { 
                        useNewUrlParser: true, 
                        useUnifiedTopology: true,
                        useCreateIndex: true,
                });

        app.listen(PORT, () => {
                debug(`Server running at PORT ${PORT}.`);
        });
}

start();