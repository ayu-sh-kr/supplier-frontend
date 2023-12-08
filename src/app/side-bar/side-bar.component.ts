import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  @Input()
  username!:string;

  @Input()
  sidebar!: boolean;
}
