import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderSharingService } from 'src/app/services/sharing/headersharing.service';
import { NotificationService } from 'src/app/services/sharing/notification.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userName: string = '';
  password: string = '';
  confirmPassword: string = '';
  name: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private headerDataSharing: HeaderSharingService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData() {
    this.userName = "";
    this.password = "";
    this.confirmPassword = "";
    this.name = "";
  }

  onRegister() {
    if (!this.userName || !this.password || !this.confirmPassword || !this.name) {
      console.log("Data is not valid to register user");
      return;
    } else {
      this.registerUser();
    }
  }

  registerUser() {
    let registrationData = {
      email: this.userName,
      password: this.password,
      confirmPassword: this.confirmPassword,
      name: this.name
    }

    this.userService.registerUser(registrationData).subscribe(
      (registerdUser: any) => {
        console.log(registerdUser);
        if(registerdUser.success) {
          const sessionToken = registerdUser.data.token;
          const userRole = registerdUser.data.role;
          localStorage.setItem("userName", registrationData.email);
          localStorage.setItem("sessionToken", sessionToken);
          localStorage.setItem("role", userRole);
          this.headerDataSharing.setUserName();
          this.initializeData();
          this.router.navigate(['/dashboard']);
        } else {
          console.log(registerdUser.data);
          this.notification.showErrorMessage(registerdUser.data, "Error");
        }
      }, (error) => {
        console.log(error);
        this.notification.showErrorMessage(error.msg, "Error");
      }
    )
  }
}
