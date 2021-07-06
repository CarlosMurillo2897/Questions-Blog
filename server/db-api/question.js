import Debug from 'debug';
import { Answer, Question } from '../models';

const debug = new Debug('Questions-Blog:db-api:question');

export default {
    findAll: (sort = '-createdAt') => {
        debug('Finding all Questions.');
         return Question.aggregate([
            {
              '$project': {
                'title': 1, 
                'description': 1, 
                'icon': 1,
                'answers': 1,
                'createdAt': 1,
                'active': 1,
                'answers_length': {
                  '$size': '$answers'
                }
              }
            }
          ]).sort(sort);
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

    findQuestionsByUser: (_id, sort) => {
        debug(`Finding Question from user ${_id}, sorted by ${sort}.`);
        return Question.find({
            user: _id
        }).populate({
            path: 'answers',
            populate: {
                path: 'user',
                model: 'User',
                select: '-password'
            }
        }).sort(sort);
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
    },

    setActiveQuestion: (q) => {
        return Question.findOneAndUpdate(
            { _id: q._id },
            { active: !q.active }
        );
    },
    
};