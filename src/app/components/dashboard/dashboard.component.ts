import { Component, OnInit } from '@angular/core';
import { faCartPlus, faRupeeSign, faStar } from '@fortawesome/free-solid-svg-icons';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { CartsharingService } from 'src/app/services/sharing/cartsharing.service';
import { NotificationService } from 'src/app/services/sharing/notification.service';
import { staticData } from 'src/staticData';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  starIcon = faStar;
  rupeeSign = faRupeeSign;
  cartIcon = faCartPlus;

  itemsList: any = [];
  pageNo: number = 0;
  pageSize: number = 50;

  filter: string = 'ALL';
  value: string = '';

  restaurents: any = [];

  locationsList: any = [];

  selectedRestaurent: any = null;
  selectedRestaurentId: any = null;

  searchValue: any = 'ALL';
  searchDropDownList: Array<any> = []

  constructor(
    private dashboardService: DashboardService,
    private cartSharingService: CartsharingService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.getRestuarents();
    this.getLocations();
  }

  getItems() {
    this.dashboardService.getItems(this.pageNo, this.pageSize, this.selectedRestaurentId).subscribe(
      (items: any) => {
        console.log(items);
        if(items.success) {
          const dataList = items.data.items;
          if(dataList && dataList.length > 0) {
            dataList.forEach((item: any) => {
              let itemObj:any = {};
              itemObj.itemId = item.itemId;
              itemObj.itemName = item.itemName;
              itemObj.itemType = item.itemType;
              itemObj.itemPrice = item.itemPrice;
              itemObj.itemDescription = item.itemDescription;
              itemObj.toggle = false;
              this.itemsList.push(itemObj);
            });
          }
          this.notification.showSuccessMessage("Retreived items successfully!!!", "success");
        } else {
          console.log(items.data);
          this.notification.showErrorMessage(items.data, "Error");
        }
      }, (error) => {
        console.log(error);
        this.notification.showErrorMessage(error.msg, "Error");
      }
    )
  }

  loadMoreItems() {
    this.pageNo = this.pageNo + 1;
    this.getItems();
  }

  getRestuarents() {
    this.dashboardService.getRestaurents(this.filter, this.value).subscribe(
      (restaurentsData: any) => {
        if(restaurentsData.success) {
          console.log(restaurentsData.data);
          this.restaurents = restaurentsData.data.restaurants;
          this.notification.showSuccessMessage("Retreived restuerents successfully!!!", "success");
        } else {
          console.log(restaurentsData.data);
          this.notification.showErrorMessage(restaurentsData.data, "Error");
        }
      }, (error) => {
        console.log(error);
        this.notification.showErrorMessage(error.msg, "Error");
      } 
    )
  }

  initializeSelectedrestaurent(restaurentId: any) {
    this.itemsList = [];
    this.selectedRestaurentId = restaurentId;
    this.restaurents.forEach( (rest: any) => {
      if(restaurentId == rest.rest_id) {
        this.selectedRestaurent = rest;
      }
    });
  }

  selectRestaurent(restaurentId: any) {
    this.initializeSelectedrestaurent(restaurentId); 
    this.getItems();
  }

  isItemInCart(itemId: number) {
    let flag = false;
    this.cartSharingService.getCartItems().subscribe(
      (cartDetails: Array<any>) => {
        let currentCardDetails: Array<any> = cartDetails;
        currentCardDetails.forEach((cartItem: any) => {
          if(cartItem.itemId == itemId && cartItem.rest_id == this.selectedRestaurent.rest_id) {
            flag = true;
          }
        });
      }
    );
    console.log(flag);
    return flag;
  }

  addToCart(item: any) {
    item.rest_id = this.selectedRestaurent.rest_id;
    item.rest_name = this.selectedRestaurent.rest_name;
    let currentCardDetails: Array<any> = [];
    this.cartSharingService.getCartItems().subscribe(
      (cartDetails: Array<any>) => {
        currentCardDetails = cartDetails;
      }
    );
    item.quantity = 1;
    item.itemTotalPrice = (item.quantity*item.itemPrice);
    currentCardDetails.push(item);
    this.cartSharingService.addToCart(currentCardDetails);
    this.cartSharingService.setTotalObjectsInCart(currentCardDetails.length);
    this.consoleCart();
    this.notification.showInfoMessage("Item added to cart", "success");
  }

  removeFromCart(item: any) {
    let currentCardDetails: Array<any> = [];
    let itemIndex = -1;
    this.cartSharingService.getCartItems().subscribe(
      (cartDetails: Array<any>) => {
        currentCardDetails = cartDetails;
        currentCardDetails.forEach((cartItem: any, index: number) => {
          if(cartItem.itemId == item.itemId && cartItem.rest_id == this.selectedRestaurent.rest_id) {
            itemIndex = index;
          }
        })
      }
    );
    if(itemIndex != -1) {
      currentCardDetails.splice(itemIndex, 1);
    }
    this.cartSharingService.addToCart(currentCardDetails);
    this.cartSharingService.setTotalObjectsInCart(currentCardDetails.length);
    this.notification.showInfoMessage("Item removed from cart", "success");
    this.consoleCart();
  }

  consoleCart() {
    this.cartSharingService.cartDetails.subscribe(
      (cartObjs: any[]) => {
        console.log(cartObjs);
      }
    );
    this.cartSharingService.totalCartObjects.subscribe(
      (totalCount: number) => {
        console.log(totalCount);
      }
    )
  }

  getLocations() {
    this.dashboardService.getLocations().subscribe(
      (locations: any) => {
        if(locations.success) {
          this.notification.showSuccessMessage("Locations fetched successfully", "Success");
          this.locationsList = locations.data.locations;
          this.setSearchDropDownList();
        } else {
          this.notification.showErrorMessage(locations.data, "Error");
        }
      }, (error) => {
        this.notification.showErrorMessage(error, "Error");
      }
    )
  }

  setSearchDropDownList() {
    this.locationsList.forEach( (location: any) => {
      let index = this.searchDropDownList.indexOf(location.location_city);
      if(index == -1) {
        this.searchDropDownList.push(location.location_city);
      }
    });
  }

  selectRestaurentLoc(e: any) {
    this.value = this.searchValue;
    this.getRestuarents();
  }
}
