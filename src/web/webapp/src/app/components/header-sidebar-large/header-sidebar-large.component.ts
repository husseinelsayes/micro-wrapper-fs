import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ModulesService } from 'src/app/services/modules.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { Utils } from 'src/app/services/utils';

@Component({
  selector: 'app-header-sidebar-large',
  templateUrl: './header-sidebar-large.component.html',
  styleUrls: ['./header-sidebar-large.component.scss']
})
export class HeaderSidebarLargeComponent implements OnInit {
    @Output() headerToggleEv = new EventEmitter<any>();
    notifications: any[];
    modules : any[];
    currentState;

    constructor(private navService: NavigationService,private auth: AuthenticationService,private moduleService:ModulesService) {
      this.currentState = this.navService.sidebarState;
      this.notifications = [
        {
          icon: 'i-Speach-Bubble-6',
          title: 'New message',
          badge: '3',
          text: 'James: Hey! are you busy?',
          time: new Date(),
          status: 'primary',
          link: '/chat'
        },
        {
          icon: 'i-Receipt-3',
          title: 'New order received',
          badge: '$4036',
          text: '1 Headphone, 3 iPhone x',
          time: new Date('11/11/2018'),
          status: 'success',
          link: '/tables/full'
        },
        {
          icon: 'i-Empty-Box',
          title: 'Product out of stock',
          text: 'Headphone E67, R98, XL90, Q77',
          time: new Date('11/10/2018'),
          status: 'danger',
          link: '/tables/list'
        },
        {
          icon: 'i-Data-Power',
          title: 'Server up!',
          text: 'Server rebooted successfully',
          time: new Date('11/08/2018'),
          status: 'success',
          link: '/dashboard/v2'
        },
        {
          icon: 'i-Data-Block',
          title: 'Server down!',
          badge: 'Resolved',
          text: 'Region 1: Server crashed!',
          time: new Date('11/06/2018'),
          status: 'danger',
          link: '/dashboard/v3'
        }
      ];
    }
  
    ngOnInit() {
      this.updateSidebar();
      this.moduleService.getSystems().subscribe((response:any)=>{
        this.modules = response;
      },error=>{
        //console.log(error);
      })
    }
  
    toggleEmitHeaderState(){
      
      this.toggelSidebar();
      
    }

    toggelSidebar() {
      //console.log('toggle header hamburger')
      var state = this.navService.sidebarState;
      if (state.childnavOpen && state.sidenavOpen) {
        state.childnavOpen = false;
        this.headerToggleEv.emit(state);
      //console.log(state);
        return; 
      }
      if (!state.childnavOpen && state.sidenavOpen) {
         state.sidenavOpen = false;
         this.headerToggleEv.emit(state);
      //console.log(state);
         return
      }
      if (!state.sidenavOpen && !state.childnavOpen) {
          state.sidenavOpen = true;
          state.childnavOpen = true;
      }
      this.headerToggleEv.emit(state);
      //console.log(state);
    }
  
    signout() {
      this.auth.logout();
    }

    updateSidebar() {
      if (Utils.isMobile()) {
        this.navService.sidebarState.sidenavOpen = false;
        this.navService.sidebarState.childnavOpen = false;
      } else {
        this.navService.sidebarState.sidenavOpen = true;
      }
      this.headerToggleEv.emit(this.navService.sidebarState);
    }

}
