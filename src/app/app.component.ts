import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MatSidenav } from '@angular/material/sidenav';
import { SharedService } from './services/shared.service';
import { Observable, delay } from 'rxjs';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    title = 'imitter';
    constructor(private authService: AuthService, public router: Router, private sharedService: SharedService) {}
    @ViewChild('sidenav') sidenav!: MatSidenav;
    opened!: boolean;
    profileUsernameObserver!: Observable<string>;
    profileUsername!: string;

    ngOnInit(): void {
        this.authService.getUserById();
        this.checkUsername();
    }
    checkUsername() {
        this.profileUsernameObserver = this.sharedService.getUsername();
        this.profileUsernameObserver.subscribe((username) => {
            this.profileUsername = username;
        });
    }
}
