import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from './user.model';

@Component({
  selector: 'app-signup-screen',
  templateUrl: './signup-screen.component.html'
})
export class SignupScreenComponent implements OnInit {

  signinForm!: FormGroup;

  ngOnInit() {
    this.signinForm = new FormGroup({
        nombre : new FormControl(null, Validators.required),
        apellido: new FormControl(null, Validators.required),
        email: new FormControl(null, [
            Validators.required,
            Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
        ]),
        password: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    if(this.signinForm.valid) {
      const { nombre, apellido, email, password } = this.signinForm.value;
      const user = new User(email, password, nombre, apellido);
      console.log(user);
    }
    
  }

}