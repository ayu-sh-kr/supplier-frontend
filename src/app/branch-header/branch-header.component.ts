import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-branch-header',
  standalone: true,
    imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './branch-header.component.html',
  styleUrl: './branch-header.component.css'
})
export class BranchHeaderComponent {

}
