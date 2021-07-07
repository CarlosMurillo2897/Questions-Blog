import Debug from 'debug';
import app from './app';
import mongoose from 'mongoose';
import { mongoUrl } from './config';
import { PORT } from './config';

const debug = new Debug('Questions-Blog:root');

async function start() {
        await mongoose.connect(mongoUrl, { 
                        useNewUrlParser: true, 
                        useUnifiedTopology: true,
                        useCreateIndex: true,
                        useFindAndModify: false,
                });

        app.listen(PORT, () => {
                debug(`Server running at PORT ${PORT}.`);
        });
}

start();