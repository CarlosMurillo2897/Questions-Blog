import { Component, OnInit } from '@angular/core';
import { Question } from './question.model';
import { QuestionService } from './question.service';

@Component({
    selector: 'app-question-list',
    templateUrl: './question-list.component.html',
    styleUrls: ['./question-list.component.css'],
    providers: [ QuestionService ],
})

export class QuestionListComponent implements OnInit {
    constructor(private questionService: QuestionService) { }

    questions!: Question[];
    loading = true; 

    ngOnInit() {
        this.questionService
                .getQuestions()
                    .subscribe(res => {
                        this.questions = res;
                        this.loading = false;
                    },
                    error => console.log(error)
        );
    }
}