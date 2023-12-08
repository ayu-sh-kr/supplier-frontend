import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductFormComponent} from "../product-form/product-form.component";
import {FetchService} from "../services/fetch.service";
import {EventService} from "../services/event.service";

@Component({
  selector: 'app-product',
  standalone: true,
    imports: [CommonModule, ProductFormComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  products:Product[] = [];
  @Input()
  filterIdx!:number;

  constructor(private fetchService: FetchService, private eventService: EventService) {
    eventService.listen('filter', (data:number) => {
        this.filterIdx = data;
        this.applyFilter(this.filterIdx);
    })
  }

  ngOnInit(){
    let data = this.fetchService.getData("/supplier/product/get-all");
    data.then(data => this.products = <Product[]>data);
  }

  applyFilter(idx:number){
    this.products.sort(filter[idx]);
  }

}

export class Product {
  constructor(
    public id:number,
    public category:string,
    public price:number,
    public product_name:string,
    public imageUrl:string,
    public origin:string,
    public expiry?:string
  ) {}

}

export const filter = [
  (a:Product, b:Product) => {
    if(a.product_name > b.product_name) return 1
    else if(a.product_name < b.product_name) return -1;
    return 0;
  },

  (a:Product, b:Product) => {
    return a.price - b.price
  }
]
