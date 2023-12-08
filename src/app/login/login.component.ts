import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {LoginService} from "../services/login.service";
import {ToasterService} from "../services/toaster.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email!: string;
  password!: string;
  jwtKey!:string
  constructor(private login:LoginService, private router:Router, private toast:ToasterService) {
    let json = JSON.parse(<string>localStorage.getItem('jwt'));

  }

  doLogin() {
    const response =  this.login.doSecureLogin(new LoginDto(this.email, this.password));
    response.then(value => {
      if(value.status === 200){
        value.text.then(text => this.jwtKey = text);
        this.toast.show("Login successful", 'success');
        setTimeout(() => {
            localStorage.clear()
            localStorage.setItem('jwt', this.jwtKey);
            this.router.navigate(['home']);
        }, 1000);
      }else{
        this.toast.show('Invalid email or password', 'danger');
        this.password = '';
        this.email = '';
      }
    })
  }
}

export class LoginDto{
  constructor(private email:string, private password:string) {
  }
}

export class jwtMap{
  constructor(private _jwt:string) {
  }

  get jwt(): string {
    return this._jwt;
  }
}
