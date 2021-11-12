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

  getItems(pageNo: number, pageSize: number, selectedRestaurent: any) {
    let url = dashboardRoutes.listItems;
    url = url.replace(':PAGE_NO', pageNo.toString());
    url = url.replace(':PAGE_SIZE', pageSize.toString());
    if(selectedRestaurent) {
      url = url.replace(':REST_ID', selectedRestaurent.toString());
    }
    return this.httpClient.get(this.baseUrl+url, {headers: this.headers});
  }

  getRestaurents(filter: string, value: string) {
    let url = dashboardRoutes.listRestaurents;
    url = url.replace(':FILTER', filter);
    url = url.replace(':VALUE', value);

    return this.httpClient.get(this.baseUrl+url, {headers: this.headers});
  }

  getLocations() {
    let url = this.baseUrl + dashboardRoutes.listLocations;

    return this.httpClient.get(url, {headers: this.headers});
  }
}
