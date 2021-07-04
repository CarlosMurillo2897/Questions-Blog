import Debug from 'debug';
import { Question } from '../models';


const debug = new Debug('Questions-Blog:db-api:question');

export default {
    findAll: async () => {
        debug('Finding all Questions.');
        return await Question.find().populate('answers');
    },

    findById: async (_id) => {
        debug(`Finding Question with an id ${id}.`);
        return await Question
            .findOne({ _id })
            .populate('user')
            .populate({
                path: 'answers',
                options: { sort: '-createdAt' },
                populate: {
                    path: 'user',
                    model: 'User'
                }
            });
    }
    
};