import { Component,ElementRef,Renderer2 } from '@angular/core';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { authConfig } from './services/sso.config';
import { OAuthService } from 'angular-oauth2-oidc';
import { LoaderService } from './services/loader.service';
import { NavigationService } from './services/navigation.service';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { ClientService } from './services/client.service';
import { NotificationService, NotificationMessage} from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showSpinner;
  navState;
  notifications = new Map<number,NotificationMessage>();
  dynamicConfigs:DynamicConfig[] = [];
  app='';
  state = JSON.stringify(new NotificationMessage('state','init'));

  constructor(private _notificationService : NotificationService, private clientService: ClientService,private router: Router,
    private renderer: Renderer2,private hostElement: ElementRef,private _oauthService : OAuthService,
    public navService: NavigationService){
      this._notificationService.getNotifications().subscribe(
        results =>{
          //console.log(results);
          this.notifications = results
        });
      this.configureSSo();
      // this.notifications.set(1,new NotificationMessage('warning','error payload'));
      // this.notifications.set(2,new NotificationMessage('success','success payload'));
  }

  closeAlert(id){
    this._notificationService.dismiss(id);
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
    "dailyleave": {
      loaded: false,
      path: '/dailyleave/dailyleave-app/main.js',
      element: 'dailyleave-app'
    },
    "leave": {
      loaded: false,
      path: '/leave/leave-app/main.js',
      element: 'leave-app'
    },
    "mysfd": {
      loaded: false,
      path: '/mysfd/mysfd-app/main.js',
      element: 'mysfd-app'
    }
    ,"businessTrip": {
      loaded: false,
      path: '/businessTrip/business-trip-app/main.js',
      element: 'business-trip-app'
    }
    ,
    "contacts": {
      loaded: false,
      path: '/directory/main.js',
      element: 'contacts-app'
    },
    "payScale": {
      loaded: false,
      path: '/payScale/pay-scale-app/main.js',
      element: 'pay-scale-app'
    }
  };

  ngOnInit() {
    this.router.events.forEach((event) => {
      if(event instanceof NavigationStart) { // NavigationEnd// NavigationCancel// NavigationError// RoutesRecognized
        this.showSpinner = true;
        //console.log('navigation started!');
      }
      if(event instanceof NavigationEnd) { // NavigationEnd// NavigationCancel// NavigationError// RoutesRecognized
        //console.log(event.url);
        this.loadClientByRoute(event.url);
        this.showSpinner = false;
        //console.log('navigation ended!');
      }
    })
  }

  loadClientByRoute(route : string){
    //clear content
    // let contentElement = <HTMLElement>this.hostElement.nativeElement.querySelector("#content");
    // while(contentElement.firstChild){
    //   this.renderer.removeChild(contentElement,contentElement.lastChild);
    // }
    let client = this.routeHasClient(route,Object.keys(this.config));
    
    if(client != null){
      //this.noRoute = false;
      this.app = client;
      //console.log(this.app);
      //this.dynamicConfigs = [{url:`${client}-app`,state : JSON.stringify(new NotificationMessage('state','init'))}];
      //this.loadClient(client);
    }else{
      //this.noRoute = true;
      this.app = `mysfd`;
      //this.dynamicConfigs = [{url:`mysfd-app`,state : JSON.stringify(new NotificationMessage('state','init'))}];
      //console.log('client not found ');
    }
  }

  
  routeHasClient(route:string, clientNames : string[]){
    let clientName= null;
    clientNames.forEach(c=>{
      if(route.startsWith(`/#/${c}/`)){
        clientName = c;
      }
    })
    return clientName;
  }

  createClientElement(name: string): HTMLElement {
    const configItem = this.config[name];
    if (configItem.loaded) return;
    const content = document.getElementById('content');
    
    // const script = document.createElement('script');
    // script.id = `${name}-script`;
    // script.src = configItem.path;
    // script.type = 'text/javascript';
    // script.async = true;
    // script.onerror = () => console.error(`error loading ${configItem.path}`);
    // content.appendChild(script);
    
    const element: HTMLElement = document.createElement(configItem.element);
    element.setAttribute('*axLazyElement', '');
    element.addEventListener('message', msg => this.handleMessage(msg));
    element.setAttribute('state', JSON.stringify(new NotificationMessage('state','init')));
    content.appendChild(element);
    
    return element;
  }

  loadClient(name){
    this.clientService.registerClient(this.createClientElement(name));
  }

  unloadClient(name){
    let clientElement : HTMLElement = this.getClientElement(name);
    let clientScript : HTMLElement = this.getClientScript(name);
    this.clientService.unregisterClient(clientElement);
    this.renderer.removeChild(clientElement.parentElement,clientElement);
    this.renderer.removeChild(clientScript.parentElement,clientScript);
  }

  getClientElement(name:string){
    let nativeElement =  <Element>this.hostElement.nativeElement;
    return <HTMLElement>nativeElement.querySelector(name);
  }

  getClientScript(name:string){
    return <HTMLElement>document.getElementById(`${name}-script`);
  }

  handleMessage(msg:any): void {
    //console.log('shell received message: ', msg);
    if(msg.detail.type =='state'){
      if(msg.detail.payload =='initializing'){
        this.showSpinner = true;
      }else if(msg.detail.payload =='ready'){
        this.showSpinner = false;
      }
    }else if(msg.detail.type =='success'){
      this.showSpinner = false;
      this._notificationService.addNotification('success',msg.detail.payload);
    }else if(msg.detail.type =='error'){
      this.showSpinner = false;
      this._notificationService.addNotification('warning',msg.detail.payload);
    }
  }

  // displayMessage(type,message){
  //   let contentElement:HTMLElement = <HTMLElement>document.getElementById('content');
  //   //clear current placeholder then create a new one
  //   let messagePlaceholderElement:HTMLElement = <HTMLElement>document.getElementById('message-placeholder');
  //   if(!messagePlaceholderElement){
  //     messagePlaceholderElement = <HTMLElement>document.createElement('div');
  //     messagePlaceholderElement.id = "message-placeholder";
  //     this.renderer.insertBefore(contentElement.parentElement,messagePlaceholderElement,contentElement);
  //   }
  //   //append the message banner to message placeholder
  //   this.renderer.appendChild(messagePlaceholderElement,this.divAlertElement(type,message));
  // }

  // divAlertElement(type,message){
  //   let messageAletElement = <HTMLElement>document.createElement('div');
  //   this.renderer.addClass(messageAletElement,"alert");
  //   this.renderer.addClass(messageAletElement,`alert-${type}`);
  //   this.renderer.addClass(messageAletElement,"alert-dismissible");
  //   let spanElement : HTMLSpanElement = <HTMLDivElement>document.createElement('span');
  //   spanElement.innerHTML = `${message}`;
  //   let closeButtonEl = <HTMLButtonElement>document.createElement('button');
  //   this.renderer.addClass(closeButtonEl,"close");
  //   this.renderer.setAttribute(closeButtonEl,"type","button");
  //   this.renderer.setAttribute(closeButtonEl,"data-dismiss","alert");
  //   closeButtonEl.innerHTML = "&times;";
  //   this.renderer.appendChild(messageAletElement,closeButtonEl);
  //   this.renderer.appendChild(messageAletElement,spanElement);
  //   return messageAletElement;
  // }

  // addNofitication(){
  //   this._notificationService.addNotification('danger','my message for success');
  // }
  
  propagateNavState(state){
    let nativeElement =  <Element>this.hostElement.nativeElement;
    let contactsElement = nativeElement.querySelector("contacts-app");
    this.state = JSON.stringify(state);
    //this.renderer.setAttribute(contactsElement,'state',JSON.stringify(state));
    // let mysfdElement = nativeElement.querySelector("mysfd-app");
    // this.renderer.setAttribute(mysfdElement,'state',JSON.stringify(state));
    // let leaveElement = nativeElement.querySelector("leave-app");
    // this.renderer.setAttribute(leaveElement,'state',JSON.stringify(state));
    // let dailyleaveElement = nativeElement.querySelector("dailyleave-app");
    // this.renderer.setAttribute(dailyleaveElement,'state',JSON.stringify(state));
    // let businessTripElement = nativeElement.querySelector("business-trip-app");
    // this.renderer.setAttribute(businessTripElement,'state',JSON.stringify(state));
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

class DynamicConfig{
  constructor(public url:string,public state:string){}
}
