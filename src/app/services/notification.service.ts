import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Notification } from '../infrastructure/types/notification';
import { SocketService } from './socket.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({providedIn: 'root'})
export class NotificationService {
    private readonly socketService = inject(SocketService);
    #notifications = signal<Notification[]>(
        localStorage.getItem('notifications') ? JSON.parse(localStorage.getItem('notifications') ?? '') : [],
    );
    notifications = this.#notifications.asReadonly();
    readNotifications = computed(() => this.#notifications().filter(n => n.read));
    unreadNotifications = computed(() => this.#notifications().filter(n => !n.read));

    constructor() {
        effect(() => {
            localStorage.setItem('notifications', JSON.stringify(this.#notifications()));
        })
    }

    connect() {
        return this.socketService.notifications$.pipe(
            takeUntilDestroyed(),
        ).subscribe(notifications => {
            this.#notifications.set(notifications);
        });
    }

    addNotification(notification: Notification) {
        this.#notifications.update(value => [...value, notification]);
    }

    markAsRead(notification: Notification) {
        this.#notifications.update(value => value.map(n => n.id === notification.id ? {...n, read: true} : n));
    }

    markAllAsRead() {
        this.#notifications.update(value => value.map(n => ({...n, read: true})));
    }
}