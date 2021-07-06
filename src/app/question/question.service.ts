import { Injectable } from "@angular/core";
import { Question } from "./question.model";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Answer } from "../answers/answer.model";
import { identifierModuleUrl } from "@angular/compiler";

@Injectable()
export class QuestionService {
    private questionsUrl: string;
    constructor(private HttpClient: HttpClient) {
        this.questionsUrl = environment.apiUrl + 'questions';
    }

    getQuestions(sort = '-createdAt'): Observable<Question[]> {
        return this.HttpClient.get(`${this.questionsUrl}?sort=${sort}`)
            .pipe(
                map( res => {
                    return res as Question[]
                }), 
                catchError(
                    (error: Error) => {
                        error.message = this.handleError(error);
                        return throwError(error);
                    }
                )
            );
    }
    
    getQuestion(id: string): Observable<Question> {
        const url = this.questionsUrl + "/" + id;
        return this.HttpClient.get(url)
            .pipe(
                map( res => {
                    return res as Question
                }), 
                catchError(
                    (error: Error) => {
                        error.message = this.handleError(error);
                        return throwError(error);
                    }
                )
            );
    }
    
    getQuestionsByUser(id: string, sort: string): Observable<Question[]> {
        const url = `${this.questionsUrl}/user/${id}?sort=${sort}`;
        return this.HttpClient.get(url)
            .pipe(
                map( res => {
                    return res as Question[]
                }), 
                catchError(
                    (error: Error) => {
                        error.message = this.handleError(error);
                        return throwError(error);
                    }
                )
            );
    }

    getToken() {
        const token = localStorage.getItem('token');
        return `?token=${token}`;
    }

    addQuestion(question: Question) {
        const body = JSON.stringify(question);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const token = localStorage.getItem('token');
        const url = this.questionsUrl + this.getToken();

        return this.HttpClient
                .post(url, body, { headers }).pipe(
                    map((res) => { 
                        return res as Question
                    }), 
                    catchError(
                        (error: Error) => {
                            error.message = this.handleError(error);
                            return throwError(error);
                        }
                    )
                );
    }
    
    addAnswers(answer: Answer) {
        const a = {
            description: answer.description,
            question: {
                _id: answer.question._id
            }
        };
        const body = JSON.stringify(a);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = this.questionsUrl + `/${answer.question._id}/answers` + this.getToken();

        return this.HttpClient
                .post(url, body, { headers }).pipe(
                    map((res) => { 
                        return res as Answer
                    }), 
                    catchError(
                        (error: Error) => {
                            error.message = this.handleError(error);
                            return throwError(error);
                        }
                    )
                );
    }

    setActiveQuestion(question: any) {
        const body = JSON.stringify(question);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json'  });

        return this.HttpClient
                .put(this.questionsUrl, body, { headers }).pipe(
                    map((res) => { 
                        return res as Answer
                    }), 
                    catchError(
                        (error: Error) => {
                            error.message = this.handleError(error);
                            return throwError(error);
                        }
                    )
                );
    }

    handleError(error: any) {
        return error.message ? error.message : 
                    error.status ? `${error.status} - ${error.statusText}` :
                        'Server error';
    }
}