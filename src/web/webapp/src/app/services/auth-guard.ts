import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _oauthService : OAuthService) {}

  canActivate(route,state): boolean  {
    return this._oauthService.hasValidAccessToken();
  }
}