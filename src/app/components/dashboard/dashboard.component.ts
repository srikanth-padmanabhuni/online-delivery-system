import { Component, OnInit } from '@angular/core';
import { faCartPlus, faRupeeSign, faStar } from '@fortawesome/free-solid-svg-icons';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { CartsharingService } from 'src/app/services/sharing/cartsharing.service';
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

  filter: string = '';
  value: string = '';

  restaurents: any = [];

  selectedRestaurent: any = null;
  selectedRestaurentId: any = null;

  constructor(
    private dashboardService: DashboardService,
    private cartSharingService: CartsharingService
  ) { }

  ngOnInit(): void {
    this.getRestuarents();
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
        } else {
          console.log(items.data);
        }
      }, (error) => {
        console.log(error);
      }
    )
  }

  loadMoreItems() {
    this.pageNo = this.pageNo + 1;
    this.getItems();
  }

  getRestuarents() {
    // staticData.restaurents.forEach((rest : any) => {
    //   this.restaurents.push(rest);
    // });
    // console.log(this.restaurents);
    // staticData.items.forEach( (item) => {
    //   this.itemsList.push(item);
    // })
    // console.log(this.itemsList);
    this.dashboardService.getRestaurents(this.filter, this.value).subscribe(
      (restaurentsData: any) => {
        if(restaurentsData.success) {
          console.log(restaurentsData.data);
          restaurentsData.data.forEach( (restaurent: any) => {
            this.restaurents[restaurent.rest_id] = restaurent;
          });
        } else {
          console.log(restaurentsData.data);
        }
      }, (error) => {
        console.log(error);
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
    // const menuItems:any = staticData.menuItems;
    // let itemIds: any = [];
    // menuItems.forEach( (menuItem: any) => {
    //   if(menuItem.rest_id == restaurentId) {
    //     itemIds.push(menuItem.item_id);
    //   }
    // });
    // itemIds.forEach( (itemId: any) => {
    //   staticData.items.forEach( (item: any) => {
    //     if (item.itemId == itemId) {
    //       this.itemsList.push(item);
    //     }
    //   });
    // });
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
    currentCardDetails.push(item);
    this.cartSharingService.addToCart(currentCardDetails);
    this.cartSharingService.setTotalObjectsInCart(currentCardDetails.length);
    this.consoleCart();
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
}
