import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string = '';
  password: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onLogin() {
    if(!this.userName || !this.password) {
      console.log("Empty username or password found");
      return;
    }
    this.loginUser();
  }

  loginUser() {
    console.log("Actual Login happens here");
  }

}
