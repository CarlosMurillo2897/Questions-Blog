import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Question } from '../question/question.model';
import { Answer } from './answer.model';
import { QuestionService } from '../question/question.service';

import SweetScroll from 'sweet-scroll';

@Component({
  selector: 'app-answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.css'],
  providers: [QuestionService],
})

export class AnswerFormComponent {
  @Input() question!: Question;
  sweetScroll: SweetScroll;

  constructor(private questionService: QuestionService) {
    this.sweetScroll = new SweetScroll();
  }
  
  onSubmit(form: NgForm) {
    const answer = new Answer(
      form.value.description,
      this.question
    );
    
    this.questionService
      .addAnswers(answer)
        .subscribe(
          a => {
            this.question.answers.unshift(a);
            this.sweetScroll.to('#title');
          },
          error => console.log(error)
        );
    
        form.reset();
    
  }
}