import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderSharingService } from 'src/app/services/sharing/headersharing.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string = '';
  password: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private headerDataSharing: HeaderSharingService
  ) { }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData() {
    this.userName = "";
    this.password = "";
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
    let loginData = {
      email: this.userName,
      password: this.password
    };

    this.userService.loginUser(loginData).subscribe(
      (login: any) => {
        console.log(login);
        if(login.success) {
          const sessionToken = login.data.token;
          const userRole = login.data.role;
          localStorage.setItem('userName', this.userName);
          localStorage.setItem('role', userRole);
          localStorage.setItem('sessionToken', sessionToken);
          this.initializeData();
          this.headerDataSharing.setUserName(this.userName);
          this.router.navigate(['/dashboard']);
        } else {
          console.log(login.data);
        }
      }, (error) => {
        console.log(error);
      }
    )
  }

}
