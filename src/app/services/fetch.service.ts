import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  baseUrl:string = 'http://localhost:8080';
  jwtKey!:string;


  constructor() {
    let json = JSON.parse(<string>localStorage.getItem('jwt'));
    this.jwtKey = json.jwt;
  }
  private getHeader(){
      return {
        'Authorization': 'Bearer ' + this.jwtKey,
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200'
    };
  }
  async postData(data:any, apiURL:string){
    console.log(this.baseUrl + apiURL)
    console.log(this.jwtKey)
    const response = await fetch(this.baseUrl + apiURL, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + this.jwtKey,
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200'
      },
      body: JSON.stringify(data)
    });

    return response;
  }

  async getData(apiUrl:string){
    const response = await fetch(this.baseUrl + apiUrl, {
      method: 'GET',
      headers: this.getHeader(),
    });
    const data = await response.json();
    console.log(data);
    return data;
  }

  async postWithParam(apiUrl:string, params:URLSearchParams, data:any){
      const response = await fetch(this.baseUrl + apiUrl + params, {
          method: 'POST',
          headers: this.getHeader(),
          body: JSON.stringify(data)
      });
      const status = response.status;
      const result = await response.text();
      return {
          status: status,
          text: result
      }
  }

  async getDataWithParam(apiUrl:string, params:URLSearchParams){
    const response = await fetch(this.baseUrl + apiUrl + params, {
      method: 'GET',
      headers: this.getHeader(),
    });

    const status: number = response.status;
    const result:any = await response.json();
    return {
      status: status,
      data: result
    }
  }

  async patchWithParam(apiUrl:string, params:URLSearchParams, data:any){
    const response = await fetch(this.baseUrl + apiUrl + params, {
      method: 'PATCH',
      headers: this.getHeader(),
      body:JSON.stringify(data)
    });
    const result = await response.text();
    return {
      status: response.status,
      text: result
    }
  }
}
