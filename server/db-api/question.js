import Debug from 'debug';
import { Answer, Question } from '../models';

const debug = new Debug('Questions-Blog:db-api:question');

export default {
    findAll: () => {
        debug('Finding all Questions.');
        return Question.find().populate('answers');
    },
    
    findById: (_id) => {
        debug(`Finding Question with an id ${_id}.`);
        return Question.findOne({ _id })
            .populate({
                path: 'user',
                select: '-password'
            }).populate({
                path: 'answers',
                options: { sort: '-createdAt' },
                populate: {
                    path: 'user',
                    model: 'User',
                    select: '-password'
                }
            });
    },
    
    create: (q) => {
        debug(`Creating new Question ${q}`);
        const question = new Question(q);
        return question.save();
    },

    createAnswer: async (q, a) => {
        debug(`Creating new Answer ${a}`);
        const answer = new Answer(a);
        const savedAnswer = await answer.save();
        q.answers.push(answer);
        await q.save();
        return savedAnswer;
    }
    
};