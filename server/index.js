import Debug from 'debug';
import app from './app';

const PORT = 3000;
const debug = new Debug('Questions-Blog:root');

app.listen(PORT, () => {
        debug(`Server running at PORT ${PORT}.`);
});