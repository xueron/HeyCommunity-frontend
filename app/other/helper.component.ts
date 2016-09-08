import {Injectable} from '@angular/core';
import {Platform} from 'ionic-angular';
import {Http} from '@angular/http';


@Injectable()
export class Helper {
  constructor(
    private platform: Platform
  ) {
  }


  //
  //
  getAPI(uri): string {
    if (this.platform.is('cordova')) {
      return 'http://cloud.hey-community.com/api/' + uri;
    } else {
      let api = this.getParameterByName('api')

      if (api) {
        return 'http://' + api + '/api/' + uri;
      } else {
        return '/api/' + uri;
      }
    }
  }


  //
  //
  getImg(uri): string {
    if (uri.substring(0, 4) == 'http') {
      return uri;
    } else {
      return 'http://public.hey-community.cn/' + uri;
    }
  }


  //
  //
  getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? undefined : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
}
