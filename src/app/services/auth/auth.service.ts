import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isUserLoggedIn(): boolean {
    const userName = localStorage.getItem("userName");
    const sessionToken = localStorage.getItem("sessionToken");
    if(!userName || !sessionToken || userName.trim().length == 0 || sessionToken.trim().length == 0) {
      return false;
    } else {
      return true;
    }
  }
}
