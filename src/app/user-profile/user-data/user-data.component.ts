import {Component, Inject, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserInfo} from "../../login-profile/login-profile.component";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Roles, UserInfoDto} from "../user-profile.component";
import {FormsModule} from "@angular/forms";
import {ToasterService} from "../../services/toaster.service";
import {FetchService} from "../../services/fetch.service";
@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.css'
})
export class UserDataComponent {

  name!:string;
  email!:string;
  roles!:string;
  accountStatus!:string;
  nameInput = true
  emailInput = true
  rolesInput = true
  accountStatusInput = true
  saveBtn = true;
  constructor(@Inject(MAT_DIALOG_DATA) public data: UserInfoDto,
              private toast: ToasterService,
              private fetch: FetchService
              ) {
  }

  updateDataToFront() {
    this.data.name = this.name;
    this.data.email = this.email;
    this.data.roles = this.roles.trim().split(' ').map(r => new Roles(r));
    this.openFrom();
    this.toggleButtons();

    this.toast.show('Check before upload', 'danger')
  }

  loadDataToEdit(data:UserInfoDto) {
    this.name = data.name;
    this.email = data.email;
    this.accountStatus = 'TEXT';
    this.roles = this.getRoleString(data);
    this.openFrom();
    this.toggleButtons();
    this.toast.show('Editing Enabled', 'info');
  }

  updateUser() {
    let param = {
      empId: this.data.id + '',
      branchId: this.data.branch.branchId + ''
    }

    let map = {
      name: this.data.name,
      email: this.data.email,
      roles: this.getRoleString(this.data)
    }
    console.log('/supplier/employee/update?' + new URLSearchParams(param));
    this.fetch.patchWithParam('/supplier/employee/update?', new URLSearchParams(param), map)
      .then(result => {
        if (result.status === 200){
          this.toast.show(result.text, 'success');
        }else {
          this.toast.show(result.text, 'info');
        }
      })
  }

  getRoleString(data: UserInfoDto) {
    let roleStr = '';
    for(let role of data.roles){
      roleStr += role.name + ' ';
    }
    return roleStr;
  }

  openFrom(){
    this.nameInput = !this.nameInput;
    this.emailInput = !this.emailInput;
    this.rolesInput = !this.accountStatusInput;
    this.accountStatusInput = !this.accountStatusInput
  }

  toggleButtons(){
    let editBtn = <HTMLButtonElement>document.getElementById('edit');
    let saveBtn = <HTMLButtonElement>document.getElementById('save');
    if(editBtn && saveBtn){
      editBtn.disabled = !editBtn.disabled;
      console.log(editBtn.disabled)
      saveBtn.disabled = !saveBtn.disabled;
    }
  }
}
