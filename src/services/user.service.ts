import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { User } from '../models/user.model';
import { Helper } from '../other/helper';


@Injectable()
export class UserService {
  headers: Headers;
  requestOptions: RequestOptions;

  userUpdateAvatarAPI: string = this.helper.getAPI('user/update-avatar');


  //
  // constructor
  constructor(
    private http: Http,
    private helper: Helper
  ) {
    this.headers = new Headers({'X-Requested-With': 'XMLHttpRequest'});
    this.requestOptions = new RequestOptions({headers: this.headers});
  }


  //
  // get user
  getUser(): Promise<User> {
    let api: string = this.helper.getAPI('user/my-info');

    return this.http.get(api, this.requestOptions)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }


  //
  // update
  update(params): Promise<User> {
    let api: string = this.helper.getAPI('user/update');

    return this.http.post(api, params, this.requestOptions)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }


  //
  // sign up
  signUp(params): Promise<User> {
    let api: string = this.helper.getAPI('user/sign-up');
    let data: Object = params;

    return this.http.post(api, data, this.requestOptions)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }


  //
  // log in
  logIn(params): Promise<User> {
    let api: string = this.helper.getAPI('user/log-in');
    let data: Object = params;

    return this.http.post(api, data, this.requestOptions)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }


  //
  // log out
  logOut(): Promise<User> {
    let api: string = this.helper.getAPI('user/log-out');

    return this.http.post(api, null, this.requestOptions)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }


  //
  // handle error
  private handleError(error: any) {
    return Promise.reject(error.message || error);
  }
}
