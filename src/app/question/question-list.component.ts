import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Question } from './question.model';
import { QuestionService } from './question.service';

@Component({
    selector: 'app-question-list',
    templateUrl: './question-list.component.html',
    styleUrls: ['./question-list.component.css'],
    providers: [ QuestionService ],
})

export class QuestionListComponent implements OnInit {
    constructor(
            private questionService: QuestionService,
            private authService: AuthService
        ) { }

    @Input() searchByUser = 'false';
    @Input() sort = '-createdAt';
    questions!: Question[];
    loading = true;

    ngOnInit() {
        if(this.authService.currentUser && this.searchByUser === 'true') {
            const id = this.authService.currentUser?._id || '';
                this.questionService
                 .getQuestionsByUser(id, this.sort)
                 .subscribe(res => {
                     this.questions = res;
                     this.loading = false;
                 },
                 error => console.log(error)
             );
        }
        else {
            this.questionService
                .getQuestions(this.sort)
                .subscribe(res => {
                    this.questions = res;
                    this.loading = false;
                },
                error => console.log(error)
            );
        }
        
    }
}