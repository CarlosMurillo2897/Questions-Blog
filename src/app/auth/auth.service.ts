import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "./user.model";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
    usersUrl: string;
    currentUser!: User | null;

    constructor(
            private httpClient: HttpClient,
            private router: Router,
        ) {
        this.usersUrl = environment.apiUrl + 'auth';
        
        if(this.isLoggedIn()) {
            const { email, firstName, lastName, userId } = JSON.parse(localStorage.getItem('user')!);
            this.currentUser = new User(email, '', firstName, lastName, userId);
        }
        
    }

    signUp(user: User) {
        const body = JSON.stringify(user);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.httpClient.post(this.usersUrl + '/signup', body, { headers }).pipe(
            map(
                (res) => this.login(res as any)
            ),
            catchError(
                error => throwError(error)
            )
        );

    }

    signIn(user: User) {
        const body = JSON.stringify(user);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.httpClient
                .post( this.usersUrl + '/signin', body, { headers }).pipe(
                        map(
                            (res) => this.login(res as any)
                        ),
                        catchError(
                            error => throwError(error)
                        )
                    );
    }

    login(params: any) {
        const { token, userId, firstName, lastName, email } = params;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({ userId, firstName, lastName, email }));
        this.router.navigateByUrl('/');
    }

    isLoggedIn() {
        let logged = localStorage.getItem('token') !== null;
        
        if(logged) {
            const { email, firstName, lastName, userId } = JSON.parse(localStorage.getItem('user')!);
            this.currentUser = new User(email, '', firstName, lastName, userId);
        }
        return logged;
    }

    logout() {
        localStorage.clear();
        this.currentUser = null;
        this.router.navigateByUrl('/');
    };


};