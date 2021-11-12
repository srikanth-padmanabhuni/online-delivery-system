import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartsharingService {

  public cartDetails: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  public totalCartObjects: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { 
    let localCartItems = localStorage.getItem('cartItems');
    if(localCartItems) {
      this.addToCart(JSON.parse(localCartItems));
    }
  }

  getCartObjsCount() {
    return this.totalCartObjects.asObservable();
  }

  getCartItems() {
    return this.cartDetails.asObservable();
  }

  addToCart(cartObjs: Array<any>) {
    this.cartDetails.next(Object.assign([], cartObjs));
    this.addInLocalStorage(cartObjs);
  }

  setTotalObjectsInCart(totalObjects: number) {
    totalObjects = (totalObjects < 0) ? 0 : totalObjects;
    this.totalCartObjects.next(totalObjects);
  }

  isItemInCart(itemId: number): boolean {
    let flag: boolean = false;
    this.getCartItems().subscribe(
      (cartObjs: Array<any>) => {
        cartObjs.forEach((cartItem: any) => {
          if(cartItem.itemId == itemId) {
            flag = true;
          }
        });
        return flag;
      }
    );
    return flag;
  }

  addInLocalStorage(cartObjs: Array<any>) {
    localStorage.setItem('cartItems', JSON.stringify(cartObjs));
    this.setTotalObjectsInCart(cartObjs.length);
  }

  removeFromCart(item: any, restaurentId: number) {
    let currentCardDetails: Array<any> = [];
    let itemIndex = -1;
    this.getCartItems().subscribe(
      (cartDetails: Array<any>) => {
        currentCardDetails = cartDetails;
        currentCardDetails.forEach((cartItem: any, index: number) => {
          if(cartItem.itemId == item.itemId && cartItem.rest_id == restaurentId) {
            itemIndex = index;
          }
        })
      }
    );
    if(itemIndex != -1) {
      currentCardDetails.splice(itemIndex, 1);
    }
    this.addToCart(currentCardDetails);
    this.setTotalObjectsInCart(currentCardDetails.length);
  }

  removeFromCartByCartItem(cartItemObj: any) {
    let currentCardDetails: Array<any> = [];
    let itemIndex = -1;
    this.getCartItems().subscribe(
      (cartDetails: Array<any>) => {
        currentCardDetails = cartDetails;
        currentCardDetails.forEach((cartItem: any, index: number) => {
          if(cartItem.itemId == cartItemObj.itemId && cartItem.rest_id == cartItemObj.rest_id) {
            itemIndex = index;
          }
        })
      }
    );
    if(itemIndex != -1) {
      currentCardDetails.splice(itemIndex, 1);
    }
    this.addToCart(currentCardDetails);
    this.setTotalObjectsInCart(currentCardDetails.length);
  }

  initializeCart() {
    localStorage.removeItem("cartItems");
    this.cartDetails.next(Object.assign([], []));
    this.totalCartObjects.next(0);
  }
}
