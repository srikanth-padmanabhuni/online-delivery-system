import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { faCartArrowDown, faUserMd } from '@fortawesome/free-solid-svg-icons';
import { CartsharingService } from 'src/app/services/sharing/cartsharing.service';
import { HeaderSharingService } from 'src/app/services/sharing/headersharing.service';

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

  constructor(
    private headerSharingService: HeaderSharingService,
    private cartSharingService: CartsharingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUserName();
    this.getCartCount();
  }

  getUserName() {
    this.headerSharingService.userName.subscribe(
      (userName: any) => {
        this.userName = userName;
      }
    )
  }

  logout() {
    localStorage.clear();
    this.headerSharingService.userName.next(null);
  }

  getCartCount() {
    this.cartSharingService.getCartObjsCount().subscribe(
      (totalCount: number) => {
          this.cartCount = totalCount;
      }
    )
  }

  moveToCart() {
    this.router.navigate(['/cart'])
  }
}
