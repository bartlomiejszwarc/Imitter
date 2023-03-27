import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'imitter';
  constructor(private authService: AuthService, public router: Router) {}

  ngOnInit(): void {
    this.authService.getUserById();
  }
}
