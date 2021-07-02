import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Question } from './question.model';
import icons  from './icons';
import { QuestionService } from './question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styles: [`
    i {
      font-size: 48px;
    }

    small {
      display: block;
    }
  `],
  providers: [ QuestionService, ],
})

export class QuestionFormComponent {
  icons: Array<any> = icons;

  constructor(
      private questionService: QuestionService,
      private router: Router
    ) { }

  getIconVersion(icon: any) {
    let version = 'plain';
    if(!icon.versions.font.includes(version)) {
      version = icon.versions.font.includes('plain-wordmark') ? 'plain-wordmark' : icon.versions.font[0];
    }
    if(icon.name !== 'yunohost') {
      version += ' colored';
    }
    return version;
  }

  onSubmit(form: NgForm) {
    const { title, description, icon } = form.value;
    const q = new Question(
      title, 
      description,
      new Date(),
      icon,
    );
    
    this.questionService
      .addQuestion(q)
        .subscribe(
          ({ _id }) => this.router.navigate(['/questions', _id]),
          error => console.log('Error founded: ', error)
        );
    form.resetForm();
  }
}