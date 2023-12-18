import { NgFor, NgIf } from '@angular/common';
import { Component, signal, inject } from '@angular/core';
import { Notification } from 'src/app/infrastructure/types/notification';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-header',
  template: `
    <header>
      <h2>HRMS</h2>
      <button (click)="notificationsOpen.set(true)" title="View Notifications">
        You have {{ unreadNotifications.length }} unread notifications
      </button>
    </header>
    <dialog [open]="notificationsOpen()">
      <h3>Notifications</h3>
      <ul>
        @for (notification of notifications(); track notification.id) {
          <li>
            <h4>{{ notification.title }} {{$index + 1}}/{{$count}}</h4>
            <span>{{ notification.message }}</span>
            @if (!notification.read) {
              <button (click)="markNotificationAsRead(notification)">
                Mark as Read
              </button>
            } @else {
              <span title="Notification is read">✔</span>
            }
          </li>
        } @empty {
          <li>No notifications to display</li>
        }
      </ul>
      <button (click)="notificationsOpen.set(false)">Close</button>
    </dialog>
  `,
  standalone: true,
  imports: [NgFor],
})
export class HeaderComponent {
  private readonly notificationService = inject(NotificationService);
  notifications = this.notificationService.notifications;
  unreadNotifications = this.notificationService.unreadNotifications;
  notificationsOpen = signal(false);

  markNotificationAsRead(notification: Notification) {
    this.notificationService.markAsRead(notification);
  }

  constructor() {
    this.notificationService.connect();
  }
}
