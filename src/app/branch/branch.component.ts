import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FetchService} from "../services/fetch.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-branch',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './branch.component.html',
  styleUrl: './branch.component.css'
})
export class BranchComponent {
  branchItems!: Branch[];
  constructor(private fetchService: FetchService) {
    const response = this.fetchService.getData("/supplier/branch/get");
    response.then(data => {
      this.branchItems = <Branch[]>data;
    })
  }
}

export class Branch{
  constructor(
    public branchId:number,
    public supplierId:number,
    public name:string,
    public email:string,
    public address:string
  ) {
  }
}
