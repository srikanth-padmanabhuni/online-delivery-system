import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private toastr: ToastrService
  ) { }

  showSuccessMessage(msg: any, title: any) {
    this.toastr.success(msg, title);
  }

  showErrorMessage(msg: any, title: any) {
    this.toastr.error(msg, title);
  }

  showInfoMessage(msg: any, title: any) {
    this.toastr.info(msg, title);
  }

  showWarningMessage(msg: any, title: any) {
    this.toastr.warning(msg, title);
  }
}
