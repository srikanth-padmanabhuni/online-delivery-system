import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderSharingService {

  public userName: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() { 
    this.getUsernameFromLocal();
  }

  setUserName() {
    this.userName.next(localStorage.getItem('userName'));
  }

  getUserName() {
    return this.userName.asObservable();
  }

  getUsernameFromLocal() {
    this.userName.next(localStorage.getItem('userName'));
  }
}
