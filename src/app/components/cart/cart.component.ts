import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  totalQuantity: number = 0;

  rest_id: number = -1;
  rest_name: string = "";

  reqObj: any = {};
  
  minusSign = faMinus;
  plusSign = faPlus;
  deleteIcon = faTrash;
  rupeeSign = faRupeeSign;

  finalDialouge: boolean = false;

  constructor(
    private cartSharingService: CartsharingService,
    private cartService: CartService,
    private notification: NotificationService,
    private router: Router
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
    this.totalPrice = 0;
    this.cartItems.forEach((cartItem: any) => {
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
        this.calculateIndividualItemPrice(cartItem);
      }
    });
    this.calculatePrice();
    this.cartSharingService.addToCart(this.cartItems);
  }

  palceOrder() {
    this.getTotalQuantity();
    this.getRestaurentDetails();
    this.reqObj = {}
    this.reqObj.items = this.cartItems;
    this.reqObj.email = localStorage.getItem('userName');
    this.reqObj.address = "";
    this.reqObj.totalPrice = this.totalPrice;
    this.reqObj.totalItems = this.totalCartCount;
    this.reqObj.quantity = this.totalQuantity;
    this.reqObj.rest_id = this.rest_id;
    this.reqObj.rest_name = this.rest_name;
    this.showFinalDialouge(this.reqObj);
  }

  getRestaurentDetails() {
    this.cartItems.forEach((cartItem: any) => {
      this.rest_id = cartItem.rest_id;
      this.rest_name = cartItem.rest_name;
    })
  }

  getTotalQuantity() {
    this.totalQuantity = 0;
    this.cartItems.forEach((cartItem: any) => {
      this.totalQuantity += cartItem.quantity;
    })
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
          this.finalDialouge = false;
          this.notification.showSuccessMessage("Order Confirmed succesfully!!!", "success");
          this.notification.showInfoMessage("Your order will be delivered by : "+orderConfirmation.data.orderDetails[0].veh_name, "Info");
          this.moveToOrders();
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

  moveToOrders() {
    this.router.navigate(['/orders']);
  }

  cancelOrder() {
    this.finalDialouge = false;
  }
}
