import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';


@Injectable()
export class Helper {
  //
  // constructor
  constructor(
    public platform: Platform
  ) {
  }


  //
  // get api
  getAPI(uri): string {
    if (this.platform.is('cordova')) {
      return 'http://demo.hey-community.com/api/' + uri;
    } else {
      let api = this.getParameterByName('api')

      if (api) {
        return 'http://' + api + '/api/' + uri;
      } else {
        // return 'http://dev.hey-community.local/api/' + uri;
        return '/api/' + uri;
      }
    }
  }


  //
  // get img
  getVideo = this.getImg;
  getImg(uri): string {
    if (uri && uri.substring(0, 4) == 'http') {
      return uri;
    } else {
      return 'http://public.hey-community.cn/' + uri;
    }
  }


  //
  // get parameter by name
  getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? undefined : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
}
