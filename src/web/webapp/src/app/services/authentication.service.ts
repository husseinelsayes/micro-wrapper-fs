import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private _http: HttpClient,private _oauthService : OAuthService) {}

  //GET
  getResource(resourceUrl): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this._oauthService.getAccessToken()
    });
    return this._http.get(resourceUrl, {headers});
  }

  //POST
  postResource(resourceUrl, obj: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this._oauthService.getAccessToken()
    });
    return this._http.post(resourceUrl, obj,{headers});
  }

  //PUT
  putResource(resourceUrl, obj: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this._oauthService.getAccessToken()
    });
    return this._http.put(resourceUrl, obj,{headers});
  }

  //LOGOUT
  logout() {
    this._oauthService.revokeTokenAndLogout().then(res => {
      this._oauthService.logOut();
      window.location.href = this._oauthService.logoutUrl;
    },err => {
      console.log(err);
    })
  }

}
