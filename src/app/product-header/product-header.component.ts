import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-product-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './product-header.component.html',
  styleUrl: './product-header.component.css'
})
export class ProductHeaderComponent {

}
