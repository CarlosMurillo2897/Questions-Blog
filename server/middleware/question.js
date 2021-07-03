const question = {
    _id: 1,
    title: 'How to re-use a Component on Android?',
    description: 'Look, this is my question..',
    createdAt: new Date(),
    icon: 'devicon-android-plain',
    answers: [],
};

export const questions = new Array(10).fill(question);

export const questionMiddleware = (req, _, next) => {
    const { id } = req.params;
    req.question = questions.find(({ _id }) => _id === +id);
    next();
}

export const questionsMiddleware = (req, _, next) => {
    req.questions = questions;
    next();
}