import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notifications$ : Observable<Map<number,NotificationMessage>>;
  private _notificationsSubject : Subject<Map<number,NotificationMessage>>;
  private _notificationMap = new Map<number,NotificationMessage>();

  constructor() {
    this._notificationsSubject = new Subject<Map<number,NotificationMessage>>();
    this.notifications$ = this._notificationsSubject.asObservable();
  }

  getNotifications(){
    return this.notifications$;
  }

  addNotification(type,message){
    this._notificationMap.set(this._notificationMap.size+1,new NotificationMessage(type,message));
    console.log(this._notificationMap);
    this._notificationsSubject.next(this._notificationMap);
  }

  dismiss(id:number){
    this._notificationMap.delete(id) ? this._notificationsSubject.next(this._notificationMap) : null
  }
}

export class NotificationMessage{
  constructor(public type : string, public message: string){}
}
