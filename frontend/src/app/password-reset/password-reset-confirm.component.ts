import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../auth.service';


@Component({
  selector: 'volontulo-password-reset-confirm',
  templateUrl: './password-reset-confirm.component.html',
  styleUrls: ['./password-reset-confirm.component.scss'],
})
export class PasswordResetConfirmComponent implements OnInit {
  @ViewChild('resetForm') resetForm: NgForm;
  uid: string;
  token: string;

  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService) {
  }
  ngOnInit() {
    this.activatedRoute.params
      .subscribe(params => {
        this.uid = params.uid;
        this.token = params.token;
      });
  }

  onSubmit() {
    console.log(`${this.uid} ${this.token}`);
    this.authService.confirmResetPassword(this.uid, this.token);
  }

}
