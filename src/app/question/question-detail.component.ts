import { Component } from '@angular/core';
import { Question } from './question.model';

@Component({
    selector: 'app-question-detail',
    templateUrl: './question-detail.component.html',
    styleUrls: ['./question-detail.component.css'],
})

export class QuestionDetailComponent {
    question: Question = new Question(
        'Quick Question on Android',
        'Look, I\'ve a doubt with some app that Im buidling...',
        new Date,
        'devicon-android-plain',
    );
};