import {Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {HeaderService} from "../services/header.service";
import {ToasterService} from "../services/toaster.service";
import {ProductComponent} from "../product/product.component";
import {ProductHeaderComponent} from "../product-header/product-header.component";
import {SideBarComponent} from "../side-bar/side-bar.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductComponent, ProductHeaderComponent, RouterOutlet, SideBarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  logoValue!: string;

  jwtKey!:string|null;

  sidebar = false;

  @Output()
  sideEmitter:EventEmitter<boolean> = new EventEmitter();

  constructor(private http:HeaderService, private router: Router, private toast: ToasterService) {
    let json = JSON.parse(<string>localStorage.getItem('jwt'));
    this.jwtKey = json.jwt;
    let value = http.fetchUserName(this.jwtKey);
    value.then(value => {
      if(value.status === 200){
        value.text.then(text => this.logoValue = text);
      }else if(value.status === 401){
        console.log(value.status)
        setTimeout(() => {
          toast.show('Session expired', 'info');
          localStorage.removeItem('jwt');
          router.navigate(['']);
        }, 2000);
      }else {
        toast.show('Error occurred', 'danger');
      }
    });
  }

  setSidebar() {
    this.sidebar = !this.sidebar;
    this.sideEmitter.emit(this.sidebar);
    window.addEventListener("click", this.handleWindowClick)
  }

  handleWindowClick(){
    if(this.sidebar){
      this.sidebar = !this.sidebar
    }
  }
}
