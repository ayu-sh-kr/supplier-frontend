import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FetchService} from "../services/fetch.service";
import {ToasterService} from "../services/toaster.service";
import {UserInfoDto} from "../user-profile/user-profile.component";

@Component({
  selector: 'app-login-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login-profile.component.html',
  styleUrl: './login-profile.component.css'
})
export class LoginProfileComponent {

  // address_type!:string;
  // city!:string;
  // state!:string;
  // country!:string;
  // pincode!:number;
  userDetails!:UserInfo;
  address!:Address
  image: string[] = [
    '/assets/images/user-profile/img.png',
    '/assets/images/user-profile/img_1.png',
    '/assets/images/user-profile/img_2.png'
  ];

  constructor(private fetchService:FetchService, private toast: ToasterService) {
    fetchService.getData("/employee/get")
      .then(data => {
        this.userDetails = <UserInfo> data;
      });

    fetchService.getData('/employee/address')
      .then(result => {
          this.address = <Address>result;
      });
  }

  getRoles(){
    let role:string = '';
    for(let i = 0; i < this.userDetails.roles.length; i++){
      role += this.userDetails.roles[i] + ' ';
    }
    return role;
  }

  getImages(){
    return this.image[Math.floor(Math.random()) * 3];
  }
}
export class Address{
  constructor(
    public addressType:string,
    public city: string,
    public state: string,
    public country: string,
    public pincode: number
  ) {
  }
}

export class UserInfo{
  constructor(
    public name:string,
    public email:string,
    public roles: string[],
    public id: number,
    public branch: number
  ) {
  }
}
