import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FetchService} from "../services/fetch.service";
import {ToasterService} from "../services/toaster.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-branch-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './branch-form.component.html',
  styleUrl: './branch-form.component.css'
})
export class BranchFormComponent {
  branch_name!:string;
  branch_email!:string;
  supplier_id!:string;
  branch_password!:string;
  branch_address!:string;

  constructor(private fetchService: FetchService, private toast: ToasterService) {
  }

  async createBranch(){
    let branchDto = new BranchDTO(this.branch_name, this.branch_email, this.branch_password, this.branch_address);
    const params = {
      supId: this.supplier_id
    }
    const details = await this.fetchService.postWithParam(
        '/supplier/branch/create?', new URLSearchParams(params), branchDto
    );
    if(details.status === 200){
      this.toast.show(details.text, 'success')
    }else{
      console.log(details)
      this.toast.show(details.text, 'danger');
    }
  }

}

export class BranchDTO{
  constructor(
      public branch_name:string,
      public branch_email:string,
      public password:string,
      public address:string
  ) {
  }
}
