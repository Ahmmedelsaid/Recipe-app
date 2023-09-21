import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  private expireTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string, userData: any) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCYln2RH2TDwQ2Q8xpVNthVv1O_kW-eqwk',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorResponse) => {
          return throwError(errorResponse);
        }),
        tap((resData) => {
          // Calculate the expiration date
          const expiresInMilliseconds = +resData.expiresIn * 1000;
          const expirationDate = new Date(
            new Date().getTime() + expiresInMilliseconds
          );

          // Create a new User object
          const user = new User(
            resData.email,
            resData.localId,
            resData.idToken,
            expirationDate
          );

          this.saveUserDataToDatabase(user, userData);
        })
      );
  }

  private saveUserDataToDatabase(user: User, userData: any) {
    // Replace 'YOUR_FIREBASE_REALTIME_DB_URL' with your Firebase Realtime Database URL
    const databaseUrl =
      'https://recipe-angular-app-4298a-default-rtdb.firebaseio.com/';

    // Create a request to save user data
    const request = {
      // Customize the structure and location where you want to save the user data
      // For example, here we're saving it under a 'users' node with the user's localId as the key
      [`users/${user.id}`]: userData,
    };

    // Send the request to Firebase Realtime Database
    this.http
      .patch(`${databaseUrl}.json?auth=${user.token}`, request)
      .subscribe(
        (response) => {
          console.log(
            'User data saved to Firebase Realtime Database:',
            response
          );
        },
        (error) => {
          console.error(
            'Error saving user data to Firebase Realtime Database:',
            error
          );
        }
      );
  }
  signIn(ema: string, pass: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCYln2RH2TDwQ2Q8xpVNthVv1O_kW-eqwk',
        {
          email: ema,
          password: pass,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((resData) => {
          return throwError(resData);
        }),
        tap((resData) => {
          // Calculate the expiration date
          const expiresInMilliseconds = +resData.expiresIn * 1000;
          const expirationDate = new Date(
            new Date().getTime() + expiresInMilliseconds
          );

          // Create a new User object
          const user = new User(
            resData.email,
            resData.localId,
            resData.idToken,
            expirationDate
          );

          // Notify subscribers (e.g., components) that a user has signed up
          this.user.next(user);
          localStorage.setItem('userData', JSON.stringify(user));

          // You can do something with the user object here, e.g., store it in a service or state
        })
      );
  }
  autoLogin() {
    const userData = localStorage.getItem('userData');
    if (!userData) {
      return;
    }
    const userInfo = JSON.parse(userData);
    const loadedUser = new User(
      userInfo.email,
      userInfo.id,
      userInfo._token,
      new Date(userInfo._tokenExpire)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expDate =
        new Date(userInfo._tokenExpire).getTime() - new Date().getTime();
      this.autoLogout(expDate);
    }
  }
  autoLogout(expireDate: number) {
    this.expireTimer = setTimeout(() => {
      this.logOut();
    }, expireDate);
  }
  logOut() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'you will be logged out',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout',
    }).then((result) => {
      if (result.isConfirmed) {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.expireTimer) {
          clearTimeout(this.expireTimer);
        }
        this.expireTimer = null;
      }
    });
  }
}
