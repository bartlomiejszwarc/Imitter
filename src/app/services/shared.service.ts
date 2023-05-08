import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SharedService {
    constructor() {}

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
}
