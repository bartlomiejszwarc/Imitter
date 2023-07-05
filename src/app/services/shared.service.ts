import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SharedService {
    constructor() {}
    private username = new ReplaySubject<any>();

    private subject = new Subject<void>();
    private userData = new BehaviorSubject<any>(null);
    sendClickEvent() {
        this.subject.next();
    }
    getClickEvent(): Observable<void> {
        return this.subject.asObservable();
    }
    sendUserData(user: any) {
        this.userData.next(user);
    }
    getUserData(): Observable<any> {
        return this.userData.asObservable();
    }

    sendUsername(username: string): void {
        this.username.next(username);
    }
    getUsername(): Observable<string> {
        return this.username.asObservable();
    }
}
