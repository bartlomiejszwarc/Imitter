import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}

  private subject = new Subject<void>();
  sendClickEvent() {
    this.subject.next();
  }
  getClickEvent(): Observable<void> {
    return this.subject.asObservable();
  }
}
