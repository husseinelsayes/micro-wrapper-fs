import { Component, EventEmitter, Output, ElementRef, Renderer2 } from '@angular/core';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { authConfig } from './services/sso.config';
import { OAuthService } from 'angular-oauth2-oidc';
import { Subscription } from 'rxjs';
import { LoaderService } from './services/loader.service';
import { LoaderState } from './model/LoaderState';
import { NavigationService } from './services/navigation.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  show = false;
  private subscription: Subscription;
  showSpinner = false;
  navState;
  @Output() childMessage = new EventEmitter();

  constructor(private renderer: Renderer2,private hostElement: ElementRef,private _oauthService : OAuthService,private loaderService: LoaderService, private navService : NavigationService){
    //this.configureSSo();
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
    this.navState = this.navService.sidebarState;
    this.subscription = this.loaderService.loaderState
    .subscribe((state: LoaderState) => {
      this.show = state.show;
    });
      // this.load('business-trip-app');
      // this.load('dailyleave-app');
      // this.load('leave-app');
      // this.load('mysfd-app');
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
    let ff = nativeElement.querySelector("contacts-app");
    this.renderer.setAttribute(ff,'state',JSON.stringify(state));
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
