import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';


@Component({
  selector: 'volontulo-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent {
  @ViewChild('resetForm') resetForm: NgForm;
  alertSuccessClosed = true;
  alertErrorClosed = true;

  constructor(private authService: AuthService) { }

  onSubmit() {
    this.authService.resetPassword(this.resetForm.value)
      .subscribe(status => {
        if (status === 'success') {
          this.alertErrorClosed = true;
          this.alertSuccessClosed = false;
          this.resetForm.reset();
        } else if (status === 'error') {
          this.alertSuccessClosed = true;
          this.alertErrorClosed = false;
        }
      });
  }
}
