import { Component, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartsharingService } from 'src/app/services/sharing/cartsharing.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: Array<any> = [];
  totalCartCount: number = 0;

  deleteIcon = faTrash;
  constructor(
    private cartSharingService: CartsharingService
  ) { 
    this.getItemsFromCart();
  }

  ngOnInit(): void {
  }

  getItemsFromCart() {
    this.cartSharingService.getCartItems().subscribe(
      (cartObjs: Array<any>) => {
        this.cartItems = cartObjs;
        this.totalCartCount = this.cartItems.length;
      }
    )
  }

  removeFromCart(cartItem: any) {

  }
}
