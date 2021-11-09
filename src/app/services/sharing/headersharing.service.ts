import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { staticData } from 'src/staticData';

@Injectable({
  providedIn: 'root'
})
export class HeaderSharingService {

  public userName: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() { }

  setUserName(userName: string) {
    this.userName.next(userName);
  }
}
