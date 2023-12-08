import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {FetchService} from "../../services/fetch.service";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSelectModule} from "@angular/material/select";
import {MatListModule} from "@angular/material/list";
import {ToasterService} from "../../services/toaster.service";

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, MatInputModule, FormsModule, MatIconModule, MatExpansionModule, MatSelectModule, MatListModule, MatButtonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  // value!:number;
  orders!:OrderDetails[];
  orderStatus!: string;
  constructor(private fetchService: FetchService, private toast: ToasterService) {
    fetchService.getData('/supplier/order/all')
      .then(data => {
        console.log(data)
        this.orders = <OrderDetails[]>data
      });
  }

  getStatus(order:OrderDetails) {
    if(order.orderStatus === 'ACCEPTED'){
      return 10;
    } else if(order.orderStatus === 'PLACED'){
      return 20;
    }else if(order.orderStatus === 'SHIPPED'){
      return 40;
    }else if(order.orderStatus === 'NEARBY'){
      return 90;
    }else if(order.orderStatus === 'DELIVERED'){
      return 100;
    }
    return 0
  }

  updateStatus(order: OrderDetails) {
    let param = new URLSearchParams({
      orderId: order.id + '',
    })
    if(this.orderStatus === null){
      this.toast.show('No value selected', 'danger');
    }
    let payload = {
      status: order.orderStatus,
    }
    console.log(param);
    this.fetchService.patchWithParam("/employee/order/update-status?", param, payload)
      .then(data => {
        if(data.status === 202){
          this.toast.show(data.text, 'success');
          // order.orderStatus = this.orderStatus;
          // this.orderStatus = '';
        }else{
          this.toast.show(data.text, 'info');
        }
      })
  }
}

export class OrderDetails{
  constructor(
    public id: number,
    public branchId: number,
    public buyerId: number,
    public orderStatus: string,
    public value: number = 0,
    public buyerName: string,
    public branchName: string,
  ) {
  }
}
