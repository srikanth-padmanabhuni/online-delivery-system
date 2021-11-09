import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { dashboardRoutes } from 'src/routes/dashboardRoutes';
import { staticData } from 'src/staticData';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  headers = new HttpHeaders();
  baseUrl = staticData.backendBaseUrl;

  constructor(
    private httpClient: HttpClient
  ) { 
    this.headers.set('content-type', 'application/json')
                .set('Access-Control-Allow-Origin', '*')
                .set('secretappkey', environment.secretAppKey);
  }

  getItems(pageNo: number, pageSize: number) {
    let url = dashboardRoutes.listItems;
    url = url.replace(':PAGE_NO', pageNo.toString());
    url = url.replace(':PAGE_SIZE', pageSize.toString());

    return this.httpClient.get(this.baseUrl+url, {headers: this.headers});
  }
}
