import { Component, OnInit } from '@angular/core';
import { faMinus, faPlus, faRupeeSign, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/services/cart/cart.service';
import { CartsharingService } from 'src/app/services/sharing/cartsharing.service';
import { NotificationService } from 'src/app/services/sharing/notification.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: Array<any> = [];
  totalCartCount: number = 0;
  totalPrice: number = 0.0;

  reqObj: any = {};
  
  minusSign = faMinus;
  plusSign = faPlus;
  deleteIcon = faTrash;
  rupeeSign = faRupeeSign;

  finalDialouge: boolean = false;

  constructor(
    private cartSharingService: CartsharingService,
    private cartService: CartService,
    private notification: NotificationService
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
        this.notification.showSuccessMessage("Retreived Items from Cart", "success");
      }, (error) => {
        console.log(error);
        this.notification.showErrorMessage(error.msg, "Error");
      }
    );
    this.calculatePrice();
  }

  calculatePrice() {
    this.cartItems.forEach((cartItem: any) => {
      this.calculateIndividualItemPrice(cartItem);
      this.totalPrice += cartItem.itemTotalPrice; 
    })
  }

  removeFromCart(cartItem: any) {
    this.cartSharingService.removeFromCartByCartItem(cartItem);
    this.getItemsFromCart();
    this.calculatePrice();
    this.notification.showInfoMessage("Removed item From Cart", "success");
  }

  calculateIndividualItemPrice(cartItemObj: any) {
    this.cartItems.forEach((cartItem: any) => {
      if(cartItem.itemId == cartItemObj.itemId && cartItem.rest_id == cartItemObj.rest_id) {
        cartItem.quantity = ((!cartItemObj.quantity || cartItemObj.quantity == 0) ? 1 : cartItemObj.quantity);
        cartItem.itemTotalPrice = (cartItemObj.quantity * cartItemObj.itemPrice);
      }
    })
  }

  setQuantity(cartItemObj: any, increase: boolean) {
    this.cartItems.forEach((cartItem: any) => {
      if(cartItem.itemId == cartItemObj.itemId && cartItem.rest_id == cartItemObj.rest_id) {
        if (increase) {
          cartItem.quantity += 1;
        } else {
          cartItem.quantity -= 1;
        }
        cartItem.quantity = ((!cartItemObj.quantity || cartItemObj.quantity == 0) ? 1 : cartItemObj.quantity);
        cartItem.itemTotalPrice = (cartItemObj.quantity * cartItemObj.itemPrice);
      }
    })
    this.cartSharingService.addToCart(this.cartItems);
  }

  palceOrder() {
    this.reqObj = {}
    this.reqObj.items = this.cartItems;
    this.reqObj.email = localStorage.getItem('userName');
    this.reqObj.address = "";
    this.reqObj.totalPrice = this.totalPrice;
    this.reqObj.totalItems = this.totalCartCount;
    this.showFinalDialouge(this.reqObj);
  }

  showFinalDialouge(reqObj: any) {
    this.finalDialouge = true;
  }

  confirmOrder(order: any) {
    this.cartService.saveOrder(order).subscribe(
      (orderConfirmation: any) => {
        if(orderConfirmation.success) {
          console.log(orderConfirmation.data);
          this.cartSharingService.initializeCart();
          this.notification.showSuccessMessage("Order Confirmed succesfully!!!", "success");
        } else {
          console.log(orderConfirmation.data);
          this.notification.showErrorMessage(orderConfirmation.data, "Error");
        }
      }, (error) => {
        console.log(error);
        this.notification.showErrorMessage(error.msg, "Error");
      }
    )
  }

  cancelOrder() {
    this.finalDialouge = false;
  }
}
