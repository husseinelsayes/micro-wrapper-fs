import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // this service will include a list of notifications to display
  // getNotifications() will get an Observable that changes over time
  // dismiss(notificationId) will dismiss a notification from the notification list
  // add(message) appends a new notification object in the notifications list

  //a ui-component will subscribe to the notification list to display reactively
  constructor() { }
}
