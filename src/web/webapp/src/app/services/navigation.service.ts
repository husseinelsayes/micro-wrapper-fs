import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface IMenuItem {
    id?: string;
    title?: string;
    description?: string;
    type: string;       // Possible values: link/dropDown/extLink
    name?: string;      // Used as display text for item and title for separator type
    state?: string;     // Router state
    icon?: string;      // Material icon name
    tooltip?: string;   // Tooltip text
    disabled?: boolean; // If true, item will not be appeared in sidenav.
    sub?: IChildItem[]; // Dropdown items
    badges?: IBadge[];
    active?: boolean;
}

export interface IChildItem {
    id?: string;
    parentId?: string;
    type?: string;
    name: string;       // Display text
    state?: string;     // Router state
    icon?: string;
    sub?: IChildItem[];
    active?: boolean;
}

interface IBadge {
    color: string;      // primary/accent/warn/hex color codes(#fff000)
    value: string;      // Display text
}

interface ISidebarState {
    sidenavOpen?: boolean;
    childnavOpen?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    public sidebarState: ISidebarState = {
        sidenavOpen: true,
        childnavOpen: false
    };
    defaultMenu: IMenuItem[] = [
        {
            name: 'لوحتي',
            description: 'لوحتي هي نافذه تعرض ملخص بياني لبعض البيانات والإحصائات التي تخصك أو تخص القسم أو الإدارة التي تدير ( في حالة كنت مسؤول عن قسم أو إدارة)',
            type: 'link',
            icon: 'i-Bar-Chart',
            state: '/mysfd/dashboard'
        },
        {
            name: 'الحضور',
            description: 'خدمة الحضور والإنصراف',
            type: 'link',
            icon: 'i-Landscape',
            state: '/mysfd/attendance',
        },
        {
            name: 'الإنتدابات',
            description: 'خدمة طلب طلب إنتداب',
            type: 'link',
            icon: 'i-Plane',
            state: '/mysfd/missions'
        },
        {
            name: 'تقويم الأداء',
            description: 'بيانات تقويم الآداء الوظيفي',
            type: 'link',
            icon: 'i-Monitor-2',
            state: '/mysfd/assessment'
        },
        {
            name: 'التدريب',
            description: 'بيانات الدورات التدريبية',
            type: 'link',
            icon: 'i-Student-Hat-2',
            state: '/mysfd/training'
        },
        {
            name: 'الموافقات',
            description: 'خدمة الموافقات',
            type: 'link',
            icon: 'i-Student-Hat-2',
            state: '/mysfd/inbox'
        }
    ];
    // sets iconMenu as default;
    menuItems = new BehaviorSubject<IMenuItem[]>(this.defaultMenu);
    // navigation component has subscribed to this Observable
    menuItems$ = this.menuItems.asObservable();

    constructor() {
    }

    // You can customize this method to supply different menu for
    // different user type.
    // publishNavigationChange(menuType: string) {
    //   switch (userType) {
    //     case 'admin':
    //       this.menuItems.next(this.adminMenu);
    //       break;
    //     case 'user':
    //       this.menuItems.next(this.userMenu);
    //       break;
    //     default:
    //       this.menuItems.next(this.defaultMenu);
    //   }
    // }
}
