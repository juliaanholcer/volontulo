import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../auth.service';


@Component({
  selector: 'volontulo-password-reset-confirm',
  templateUrl: './password-reset-confirm.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetConfirmComponent implements OnInit {
  @ViewChild('resetForm') resetForm: NgForm;
  uidb64: string;
  token: string;

  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(params => {
        this.uidb64 = params.uidb64;
        this.token = params.token;
      });
  }

  onSubmit() {
    this.authService.confirmResetPassword({password: this.resetForm.value.password}, this.uidb64, this.token)
      .subscribe();
    this.router.navigate(['login']);
  }
}
