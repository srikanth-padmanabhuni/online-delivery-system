import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { faCartArrowDown, faShoppingBasket, faUserMd } from '@fortawesome/free-solid-svg-icons';
import { CartsharingService } from 'src/app/services/sharing/cartsharing.service';
import { HeaderSharingService } from 'src/app/services/sharing/headersharing.service';
import { NotificationService } from 'src/app/services/sharing/notification.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName: string = '';
  userIcon = faUserMd;

  cartIcon = faCartArrowDown;
  cartCount: number = 0;

  orderIcon = faShoppingBasket;

  constructor(
    private headerSharingService: HeaderSharingService,
    private cartSharingService: CartsharingService,
    private router: Router,
    private userService: UserService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.getUserName();
    this.getCartCount();
  }

  getUserName() {
    this.headerSharingService.getUserName().subscribe(
      (userName: any) => {
        this.userName = userName;
      }
    )
  }

  logout() {
    // this.logoutFromBackend();
    this.logoutFromfrontend();
  }

  logoutFromBackend() {
    this.userService.logout().subscribe(
      (loggedOut: any) => {
        if(loggedOut.success) {
          this.notification.showInfoMessage("User logged out", "Success");
          this.logoutFromfrontend();
        } else {
          this.notification.showErrorMessage("Error occurred while logging out", "Error");
        }
      }, (error) => {
        this.notification.showErrorMessage("Error occurred while logging out", "Error");
      }
    )
  }

  logoutFromfrontend() {
    localStorage.clear();
    this.headerSharingService.userName.next(null);
    this.router.navigate(['/']);
  }

  getCartCount() {
    this.cartSharingService.getCartObjsCount().subscribe(
      (totalCount: number) => {
          this.cartCount = totalCount;
      }
    )
  }

  moveToCart() {
    this.router.navigate(['/cart']);
  }

  moveToOrders() {
    this.router.navigate(['/orders']);
  }

  moveToHome() {
    this.router.navigate(['/dashboard']);
  }
}
