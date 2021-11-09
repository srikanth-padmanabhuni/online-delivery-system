import { Component, OnInit } from '@angular/core';

import { faUserMd } from '@fortawesome/free-solid-svg-icons';
import { HeaderSharingService } from 'src/app/services/sharing/headersharing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName: string = '';
  userIcon = faUserMd;

  constructor(
    private headerSharingService: HeaderSharingService
  ) { }

  ngOnInit(): void {
    this.getUserName();
  }

  getUserName() {
    this.headerSharingService.userName.subscribe(
      (userName: any) => {
        this.userName = userName;
      }
    )
  }

  logout() {
    localStorage.clear();
    this.headerSharingService.userName.next(null);
  }

}
