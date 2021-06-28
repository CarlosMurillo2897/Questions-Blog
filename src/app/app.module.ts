import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material Angular
import { MaterialModule } from './material.module';

// Components
import { QuestionDetailComponent } from './question/question-detail.component'
import { AnswersComponent } from './answers/answers.component';

// Scripts
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [
    AppComponent,
    QuestionDetailComponent,
    AnswersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MomentModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { };