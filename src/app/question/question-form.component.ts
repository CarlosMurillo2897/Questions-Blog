import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Question } from './question.model';
import icons  from './icons';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
})

export class QuestionFormComponent {
  icons: Array<any> = icons;

  getIconVersion(icon: any) {
    let version = 'plain';
    if(!icon.versions.font.includes(version)) {
      version = icon.versions.font.includes('plain-wordmark') ? 'plain-wordmark' : icon.versions.font[0];
    }
    
    return version;
  }

  onSubmit(form: NgForm) {
    const { title, description } = form.value;
    const q = new Question(
      title, 
      description,
    );
    form.reset();
    console.log(q);
    
  }
}