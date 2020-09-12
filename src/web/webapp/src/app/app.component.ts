import { Component, EventEmitter, Output, ElementRef, Renderer2 } from '@angular/core';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { authConfig } from './services/sso.config';
import { OAuthService } from 'angular-oauth2-oidc';
import { Subscription } from 'rxjs';
import { LoaderService } from './services/loader.service';
import { LoaderState } from './model/LoaderState';
import { NavigationService } from './services/navigation.service';
import { environment } from 'src/environments/environment';
import { Router, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs/operators';
import { lastIndexOf, indexOf } from 'core-js/fn/array';
import { stringify } from 'querystring';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  show = false;
  private subscription: Subscription;
  showSpinner;
  navState;
  @Output() childMessage = new EventEmitter();

  constructor(private router: Router,private renderer: Renderer2,private hostElement: ElementRef,private _oauthService : OAuthService,private loaderService: LoaderService, private navService : NavigationService){
    this.configureSSo();
  }

  configureSSo(){
    this._oauthService.configure(authConfig);
    this._oauthService.tokenValidationHandler = new JwksValidationHandler();
    this._oauthService.tryLogin();
    if(!this._oauthService.hasValidAccessToken()){
      this._oauthService.initImplicitFlow();
    }
  }
  

  //add auth service code !
  config = {
    "dailyleave-app": {
      loaded: false,
      path: 'assets/dailyleave-app/main.js',
      element: 'dailyleave-app'
    },"leave-app": {
      loaded: false,
      path: 'assets/leave-app/main.js',
      element: 'leave-app'
    },
    "mysfd-app": {
      loaded: false,
      path: 'assets/mysfd-app/main.js',
      element: 'mysfd-app'
    }
    ,"business-trip-app": {
      loaded: false,
      path: 'assets/business-trip-app/main.js',
      element: 'business-trip-app'
    }
    ,
    "contacts-app": {
      loaded: false,
      path: 'assets/contacts-app/main.js',
      element: 'contacts-app'
    }
  };

  ngOnInit() {
    //window.addEventListener('hashchange', function() {
    //alert("Hash Changed");
    //});
    /*this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)  
    ).subscribe((event: NavigationEnd) => {
      console.log(event);
      let hashString = "/#/";
      let truncatedString = event.url.substring(event.url.indexOf(hashString)+hashString.length,event.url.length);
      if(event.url == '/'){
        this.showSpinner = true;
      }else{
        this.showSpinner = false;
      }
    });*/
    this.navState = this.navService.sidebarState;
    this.subscription = this.loaderService.loaderState
    .subscribe((state: LoaderState) => {
      this.show = state.show;
    });
      this.load('business-trip-app');
      this.load('dailyleave-app');
      this.load('leave-app');
      this.load('mysfd-app');
      this.load('contacts-app');
  }

  load(name: string): void {
    const configItem = this.config[name];
    if (configItem.loaded) return;
    const content = document.getElementById('content');
    const script = document.createElement('script');
    script.src = configItem.path;
    content.appendChild(script);
    const element: HTMLElement = document.createElement(configItem.element);
    element.setAttribute('state', JSON.stringify(this.navState));
    content.appendChild(element);
  }

  propagateNavState(state){
    let nativeElement =  <Element>this.hostElement.nativeElement;
    let contactsElement = nativeElement.querySelector("contacts-app");
    this.renderer.setAttribute(contactsElement,'state',JSON.stringify(state));

    let mysfdElement = nativeElement.querySelector("mysfd-app");
    this.renderer.setAttribute(mysfdElement,'state',JSON.stringify(state));
    let leaveElement = nativeElement.querySelector("leave-app");
    this.renderer.setAttribute(leaveElement,'state',JSON.stringify(state));
    let dailyleaveElement = nativeElement.querySelector("dailyleave-app");
    this.renderer.setAttribute(dailyleaveElement,'state',JSON.stringify(state));
    let businessTripElement = nativeElement.querySelector("business-trip-app");
    this.renderer.setAttribute(businessTripElement,'state',JSON.stringify(state));

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getHeaderState(state){
    this.propagateNavState(state);
  }
  
  toggelSidebar() {
    if (this.navState.childnavOpen && this.navState.sidenavOpen) {
      return this.navState.childnavOpen = false;
    }
    if (!this.navState.childnavOpen && this.navState.sidenavOpen) {
      return this.navState.sidenavOpen = false;
    }
    if (!this.navState.sidenavOpen && !this.navState.childnavOpen) {
      this.navState.sidenavOpen = true;
        setTimeout(() => {
          this.navState.childnavOpen = true;
        }, 50);
    }
  }
}
