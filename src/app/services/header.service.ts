import { Injectable } from '@angular/core';
import {ToasterService} from "./toaster.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  baseUrl = 'http://localhost:8080/header';

  constructor(private toast: ToasterService, private router: Router) { }


  async fetchUserName(jwtKey:string|null){
    console.log(jwtKey);
    const response = await fetch(this.baseUrl + "/name", {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + jwtKey
      },
    });
    return {
        status: response.status,
        text: response.text()
    };
  }
}
