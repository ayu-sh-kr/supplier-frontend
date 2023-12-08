import {Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {ProductComponent} from "../product/product.component";
import {EventService} from "../services/event.service";

@Component({
  selector: 'app-sort',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductComponent],
  templateUrl: './sort.component.html',
  styleUrl: './sort.component.css'
})
export class SortComponent {
  @Output()
  filterEmit:EventEmitter<number> = new EventEmitter();

  listFilter!: number;

  constructor(private eventService: EventService) {
  }


  updateFilter() {
    this.eventService.emit('filter', this.listFilter);
  }
}
