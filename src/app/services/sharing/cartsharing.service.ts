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
}
