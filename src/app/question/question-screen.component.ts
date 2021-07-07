import { Component  } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Component({
    selector: 'app-question-screen',
    templateUrl: './question-screen.component.html',
    styles: [`
    .add-question {
        position: fixed;
        bottom: 30px;
        right: 30px;
        font-size: 24px;
        z-index: 1;
    }
    `]
})

export class QuestionScreenComponent {
    
    constructor(private authService: AuthService) { }
    
    isLoggedIn() {
        return this.authService.isLoggedIn();
    }
}