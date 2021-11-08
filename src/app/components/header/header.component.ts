import { Component, OnInit } from '@angular/core';

import { faUserMd } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName: string = '';
  userIcon = faUserMd;

  constructor() { }

  ngOnInit(): void {
  }

  logout() {

  }

}
