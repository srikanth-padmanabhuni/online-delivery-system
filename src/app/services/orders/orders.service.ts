import { Injectable } from '@angular/core';
import { staticData } from 'src/staticData';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { orderRoutes } from 'src/routes/orderRoutes';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  baseUrl: string = staticData.backendBaseUrl;
  headers = new HttpHeaders();

  constructor(
    private httpClient: HttpClient
  ) { 
    this.headers.set('content-type', 'application/json')
                .set('Access-Control-Allow-Origin', '*')
                .set('secretappkey', environment.secretAppKey);
  }

  getOrders(emailId: any) {
    let url = this.baseUrl + orderRoutes.getOrders;
    url = url.replace(":EMAIL", emailId);
    return this.httpClient.get(url, {headers: this.headers});
  }

  cancelOrder(orderId: number, emailId: any) {
    let url = this.baseUrl + orderRoutes.cancelOrder;
    url = url.replace(':ORDER_ID', orderId.toString());
    url = url.replace(':EMAIL', emailId);

    return this.httpClient.delete(url, {headers: this.headers});
  }

  getOrderItems(orderId: number) {
    let url = this.baseUrl + orderRoutes.getOrderItems;
    url = url.replace(':ORDER_ID', orderId.toString());

    return this.httpClient.get(url, {headers: this.headers});
  }
}
