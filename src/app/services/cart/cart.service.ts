import { Injectable } from '@angular/core';
import { staticData } from 'src/staticData';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { cartRoutes } from 'src/routes/cartRoutes';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl: string = staticData.backendBaseUrl;
  headers = new HttpHeaders();

  constructor(
    private httpClient: HttpClient
  ) { 
    this.headers.set('content-type', 'application/json')
                .set('Access-Control-Allow-Origin', '*')
                .set('secretappkey', environment.secretAppKey);
  }

  saveOrder(orderObj: any) {
    let url = this.baseUrl+cartRoutes.saveOrder;
    return this.httpClient.post(url, orderObj, {headers: this.headers})
  }
}
