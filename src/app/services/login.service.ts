import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {jwtMap, LoginDto} from "../login/login.component";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userBaseUrl = "http://localhost:8080/user";

  constructor(private http:HttpClient) { }

  doLogin(loginData:LoginDto){
    try {
      let var1 =  this.http.post<jwtMap>(this.userBaseUrl + "/login", loginData);
      return var1;
    }catch (e){
      console.log(e);
      return null;
    }
  }

  async doSecureLogin(loginData:LoginDto){
    const response = await fetch(this.userBaseUrl + "/login", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(loginData)
    });
    return {
        status: response.status,
        text: response.text()
    };
  }
}
