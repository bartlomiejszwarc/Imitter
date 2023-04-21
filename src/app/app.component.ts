import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'imitter';
  constructor(private authService: AuthService, public router: Router) {}
  @ViewChild('sidenav') sidenav!: MatSidenav;
  opened!: boolean;

  ngOnInit(): void {
    this.authService.getUserById();
  }
}
