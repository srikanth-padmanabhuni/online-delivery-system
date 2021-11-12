import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { NotificationService } from 'src/app/services/sharing/notification.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  ordersList: any = [];
  orderItems: any = [];

  restaurents: any = [];

  userName = localStorage.getItem('userName');

  showOrderedItems: boolean = false;

  constructor(
    private orderService: OrdersService,
    private dashboardService: DashboardService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.getRestaurents();
  }

  getRestaurents() {
    this.dashboardService.getRestaurents("ALL", "").subscribe(
      (restaurentsData: any) => {
        if(restaurentsData.success) {
          console.log(restaurentsData.data);
          this.restaurents = restaurentsData.data.restaurants;
        } else {
          console.log(restaurentsData.data);
        }
        this.getOrders();
      }, (error) => {
        console.log(error);
        this.getOrders();
      } 
    )
  }

  getOrders() {
    this.orderService.getOrders(this.userName).subscribe(
      (orders: any) => {
        if(orders.success) {
          console.log(orders.data);
          this.ordersList = orders.data.orders;
          this.ordersList.forEach( (order: any) => {
            let rest = this.restaurents.filter( (rest: any) => {
              if(rest.rest_id == order.rest_id) {
                return rest.rest_name;
              }
            })
            order.rest_name = rest[0].rest_name;
          });
          this.notification.showSuccessMessage("Orders retreived successfully!!!", "success");
        } else {
          console.log(orders.data);
          this.notification.showErrorMessage(orders.data, "Error");
        }
      }, (error) => {
        console.log(error);
        this.notification.showErrorMessage(error.msg, "Error");
      }
    )
  }

  cancelOrder(orderId: number) {
    this.orderService.cancelOrder(orderId, this.userName).subscribe(
      (canceledOrder: any) => {
        if(canceledOrder.success) {
          console.log(canceledOrder.data);
          this.closeOrderedItems();
          this.getOrders();
          this.notification.showInfoMessage("Order has been successfully !!!", "success");
        } else {
          console.log(canceledOrder.data);
          this.notification.showErrorMessage(canceledOrder.data, "Error");
        }
      }, (error) => {
        console.log(error);
        this.notification.showErrorMessage(error.msg, "Error");
      }
    )
  }

  loadOrderItems(orderId: number) {
    this.showOrderedItems = true;
    this.orderService.getOrderItems(orderId).subscribe(
      (orderedItems: any) => {
        if(orderedItems.success) {
          this.orderItems = orderedItems.data.orderItems[0].order_details;
          console.log(this.orderItems);
          this.notification.showInfoMessage("Ordered Items has been fetched successfully !!!", "success");
        } else {
          console.log(orderedItems.data);
          this.notification.showErrorMessage(orderedItems.data, "Error");
        }
      }, (error) => {
        console.log(error);
        this.notification.showErrorMessage(error.msg, "Error");
      }
    )
  }

  closeOrderedItems() {
    this.orderItems = [];
    this.showOrderedItems = false;
  }
}
