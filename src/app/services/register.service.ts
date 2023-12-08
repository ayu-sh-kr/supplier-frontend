import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RegisterDto} from "../register/register.component";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  baseUrl = "http://localhost:8080/user/register"

  constructor(private http:HttpClient) { }

  private getStandardOptions(){
    return {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': 'http://localhost:4200'
      })
    }
  }

  doRegister(details:RegisterDto){
    let options = this.getStandardOptions();
    return this.http.post<Response>(this.baseUrl, details, options);
  }
}
