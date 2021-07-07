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

    @Input() searchByUser: boolean = false;
    @Input() sort = '-createdAt';
    questions!: Question[];
    loading = true;

    ngOnInit() {
        if(this.authService.currentUser && this.searchByUser) {
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

    toggleQuestions(_id: string = '', active: Boolean = true) {
        // Prevent click on List item action.
        const question = { _id, active };
        this.questionService
            .setActiveQuestion(question)
            .subscribe(
                () => this.questions.find(({ _id }) => _id === question._id)!.active = !question.active,
                error => console.log(error)
            );
        event?.stopPropagation();
    }
}