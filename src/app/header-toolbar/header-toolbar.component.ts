import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header-toolbar',
  templateUrl: './header-toolbar.component.html',
  styleUrls: ['./header-toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderToolbarComponent implements OnInit {

  @Input() titulo: string;
  avatar: string = "";
  userName: string = "";
  constructor(private cookie: CookieService) {
    this.userName = this.cookie.get('username');
    this.avatar = this.cookie.get('avatar');
  }

  ngOnInit(): void {
  }
}
