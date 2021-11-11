import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { NotificationService } from 'src/app/services/sharing/notification.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  ordersList: any = [];

  constructor(
    private orderService: OrdersService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrders().subscribe(
      (orders: any) => {
        if(orders.success) {
          console.log(orders.data);
          this.ordersList = orders.data.orders;
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
    this.orderService.cancelOrder(orderId).subscribe(
      (canceledOrder: any) => {
        if(canceledOrder.success) {
          console.log(canceledOrder.data);
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

}
