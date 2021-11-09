import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { userRoutes } from 'src/routes/userRoutes';
import { staticData } from 'src/staticData';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = staticData.backendBaseUrl;
  headers = new HttpHeaders();

  constructor(
    private httpClient: HttpClient
  ) { 
    this.headers.set('content-type', 'application/json')
                .set('Access-Control-Allow-Origin', '*')
                .set('secretappkey', environment.secretAppKey);
  }

  loginUser(loginData: any) {
    let url = userRoutes.signIn;
    return this.httpClient.post(this.baseUrl+url, loginData, {headers: this.headers});
  }

  registerUser(registrationData: any) {
    let url = userRoutes.signUp;
    return this.httpClient.post(this.baseUrl+url, registrationData, {headers: this.headers});
  }

  getUser(userName: any) {
    let url = userRoutes.getUser;
    url = url.replace(':userName', userName);
    return this.httpClient.get(this.baseUrl+url, {headers: this.headers});
  }

}
