import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FetchService} from "../services/fetch.service";

@Component({
  selector: 'app-branch-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './branch-details.component.html',
  styleUrl: './branch-details.component.css'
})
export class BranchDetailsComponent {

  constructor(private fetch:FetchService) {
  }

}

