import { Component } from '@angular/core';
import { Question } from './question.model';

const q = new Question(
    'How can I reuse a Component on Android?',
    'I\'m a begginer on Android development.. So..',
    new Date(),
    'devicon-android-plain'
);

@Component({
    selector: 'app-question-list',
    templateUrl: './question-list.component.html',
    styleUrls: ['./question-list.component.css'],
})

export class QuestionListComponent {
    questions: Question[] = new Array(10).fill(q);
}