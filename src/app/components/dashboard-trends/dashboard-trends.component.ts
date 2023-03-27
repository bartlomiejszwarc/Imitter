import {Component, OnInit} from '@angular/core';
import {Trend} from 'src/app/objects/Trend';

@Component({
  selector: 'app-dashboard-trends',
  templateUrl: './dashboard-trends.component.html',
  styleUrls: ['./dashboard-trends.component.css'],
})
export class DashboardTrendsComponent implements OnInit {
  constructor() {}

  trends: Trend[] = [
    {
      category: 'University',
      text: 'Payass',
      counter: 143347,
    },
    {
      category: 'University',
      text: 'Beetroot',
      counter: 2136,
    },
    {
      category: 'Sport',
      text: 'Snorting',
      counter: 432,
    },
    {
      category: 'Music',
      text: 'ToraToraTora',
      counter: 37,
    },
  ];

  ngOnInit(): void {}
}
