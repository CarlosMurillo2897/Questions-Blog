import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Question } from './question.model';
import icons  from './icons';

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
})

export class QuestionFormComponent {
  icons: Array<any> = icons;

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
    form.reset();
    console.log(q);
    
  }
}