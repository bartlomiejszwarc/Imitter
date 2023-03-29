import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-not-found',
  templateUrl: './user-not-found.component.html',
  styleUrls: ['./user-not-found.component.css'],
})
export class UserNotFoundComponent implements OnInit {
  constructor() {}

  @Input() username!: Promise<any>;
  ngOnInit(): void {}
}
