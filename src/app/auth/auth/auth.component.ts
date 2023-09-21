import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLogin = true;
  isLoading = false;
  error: string | null = null;

  constructor(
    private auth: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  onSwitch() {
    this.isLogin = !this.isLogin;
  }
  handleError() {
    this.error = null;
  }

  onSubmit(AuthForm: NgForm) {
    const email = AuthForm.value.email;
    const pass = AuthForm.value.pass;
    const phone = AuthForm.value.num;
    const username = AuthForm.value.username;
    const userData = {
      Email: email,
      Password: '*'.repeat(pass.length),
      PhoneNumber: phone,
      UserName: username,
    };
    this.isLoading = true;

    if (this.isLogin) {
      this.auth.signIn(email, pass).subscribe(
        (signData) => {
          this.router.navigate(['/recipes']);
          console.log(signData);
          this.isLoading = false;
          if (signData) {
            Swal.fire({
              icon: 'success',
              title: 'Login Successful',
              confirmButtonText: 'OK',
            });
          }
        },
        (error) => {
          console.log(error);
          switch (error.error.error.message) {
            case 'INVALID_PASSWORD':
            case 'EMAIL_NOT_FOUND':
              this.error = 'Invalid email or password';
          }
          this.isLoading = false;
        }
      );
    } else {
      this.auth.signUp(email, pass, userData).subscribe(
        (response) => {
          console.log(response);
          this.isLoading = false;
          if (response) {
            Swal.fire({
              icon: 'success',
              title: 'Registration Successful!',
              confirmButtonText: 'OK',
            });
          }
        },
        (error) => {
          console.log(error);
          switch (error.error.error.message) {
            case 'EMAIL_EXISTS':
              this.error = 'This Email is already exist';
          }
          this.isLoading = false;
        }
      ),
        tap();
    }

    AuthForm.reset();
  }
}
