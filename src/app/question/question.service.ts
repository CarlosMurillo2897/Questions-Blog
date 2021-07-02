import { Injectable } from "@angular/core";
import { Question } from "./question.model";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class QuestionService {
    private questionsUrl: string;
    constructor(private HttpClient: HttpClient) {
        this.questionsUrl = environment.apiUrl + 'questions';
    }

    getQuestions(): Observable<Question[]> {
        return this.HttpClient.get(this.questionsUrl)
            .pipe(
                map( res => {
                    return res as Question[]
                })
            );
    }
    
    getQuestion(id: string): Observable<Question> {
        const url = this.questionsUrl + "/" + id;
        return this.HttpClient.get(url)
            .pipe(
                map( res => {
                    return res as Question
                })
            );
    }

    handleError(error: any) {
        const errMsg = error.message ? error.message : 
            error.status ? `${error.status} - ${error.statusText}` :
                'Server error';
        console.log(errMsg);
        
    }
}