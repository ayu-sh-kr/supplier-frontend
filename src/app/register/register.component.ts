import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {RegisterService} from "../services/register.service";
import {HttpHeaders} from "@angular/common/http";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatExpansionModule, MatSelectModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name!:string;
  email!:string;
  password!:string
  confirmPass!:string

  constructor(private register:RegisterService) {
  }

  doRegisteration(){
    if(this.password === this.confirmPass){
        let registerDetails = new RegisterDto(this.name, this.email, this.password);
        console.log(registerDetails);
        this.register.doRegister(registerDetails).toPromise().then(response => {
          console.log(response?.status);
        });
    }
  }
}

export class RegisterDto{
  constructor(private name:string, private email: string, private password: string) {
  }
}
