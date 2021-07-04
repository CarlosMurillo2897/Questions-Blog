import Debug from 'debug';
import { Question } from '../models';


const debug = new Debug('Questions-Blog:db-api:question');

export default {
    findAll: async () => {
        debug('Finding all Questions.');
        return await Question.find().populate('answers');
    }
    
};