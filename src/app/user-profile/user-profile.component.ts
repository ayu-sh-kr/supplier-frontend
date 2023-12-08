import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FetchService} from "../services/fetch.service";
import {UserInfo} from "../login-profile/login-profile.component";
import {MatDialog} from "@angular/material/dialog";
import {UserDataComponent} from "./user-data/user-data.component";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  name!:string;
  email!:string;
  roles!:string[];
  branchId!:number;
  userId!:number;

  userDetails!:UserInfoDto[];

  constructor(private fetchService:FetchService, public matDialog:MatDialog) {
    fetchService.getData("/supplier/employee/get-all")
      .then(data => {
        console.log(data);
        this.userDetails = <UserInfoDto[]> data;
      });
  }

  openDialog(details:UserInfoDto) {
    this.matDialog.open(UserDataComponent, {
      data: details
    })
  }
}

export class UserInfoDto{
  constructor(
    public name:string,
    public email:string,
    public roles:Roles[],
    public branch:BranchId,
    public id:number
  ) {
  }
}

export class BranchId{
  public branchId!:number;
}

export class Roles{
  constructor(public name:String) {
  }
}
