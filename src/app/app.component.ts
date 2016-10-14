import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { NoticeService } from '../services/notice.service';
import { AuthenticateService } from '../services/authenticate.service';

import { TabsPage } from '../pages/tabs/tabs';
// import { TutorialPage } from '../pages/tutorial/tutorial';


@Component({
  template: `<ion-nav [root]="rootPage" swipeBackEnabled="true"></ion-nav>`
})
export class MyApp {
  noticeInterval: any;

  rootPage = TabsPage;
  // rootPage = TutorialPage;


  //
  // constructor
  constructor(
    public events: Events,
    public authService: AuthenticateService,
    public noticeService: NoticeService,
    public platform: Platform
  ) {
    platform.ready().then(() => {
      console.log('Hey Community ~');

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });

    //
    this.authService.wechatLogin();

    //
    this.events.subscribe('auth:loggedIn', () => {
      console.log('user is logged-in');

      this.noticeInterval = setInterval(() => {
        this.noticeService.getIndex();
      }, 15000);
    });

    //
    this.events.subscribe('auth:loggedOut', () => {
      console.log('user is logged-out');

      clearInterval(this.noticeInterval);
    });

  }
}
