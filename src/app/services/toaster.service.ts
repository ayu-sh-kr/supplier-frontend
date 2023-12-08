import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toast: ToastrService) { }

  show(message: string, type: string, options?: any){
    if(!options){
      options = {
        timeOut: 5000,
        positionClass: 'toast-top-right',
        preventDuplicate: true,
        tapToDismiss: true,
        progressBar: true,
        progressAnimation: 'decreasing'
      };
    }

    switch (type){
      case 'success':
        this.toast.success(message, 'Success', options);
        break;
      case 'danger':
        this.toast.warning(message, 'Danger', options);
        break;
      case 'error':
        this.toast.error(message, 'Error', options);
        break
      default:
        this.toast.info(message, 'Info', options);
    }
  }
}
