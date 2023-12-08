import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {FetchService} from "../services/fetch.service";
import {ToasterService} from "../services/toaster.service";

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  product_name!:string;
  category!:string;
  price!:number;
  expiry!:string;
  imageUrl!:string;
  origin!:string

  constructor(private fetch: FetchService, private toast: ToasterService) {
  }

  async createProduct() {
    let product = new ProductDTO(this.category, this.price, this.product_name, this.imageUrl, this.origin, this.expiry);
    console.log(JSON.stringify(product));
    console.log(product)
    // post product;
    let response = await this.fetch.postData(product, '/supplier/product/create');
    let text = await response.text();
    if(response.status === 201){
      this.toast.show(text, 'success')
    }else if(response.status === 406){
      this.toast.show(text, 'danger')
    }else{
      this.toast.show(text, 'danger');
    }
    // this.product_name = '';
    // this.category = '';
    // this.price = 0;
    // this.expiry = '';
    // this.origin = '';
  }
}

export class ProductDTO{
  constructor(
      public category:string,
      public price:number,
      public product_name:string,
      public imageUrl:string,
      public origin:string,
      public expiry:string = "undefined"
  ) {
  }
}
