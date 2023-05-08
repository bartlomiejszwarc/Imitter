import { Component, OnInit } from '@angular/core';
import { Trend } from 'src/app/objects/Trend';

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
            text: 'ZUT',
            counter: 143347,
        },
        {
            category: 'University',
            text: 'US',
            counter: 3248,
        },
        {
            category: 'Sport',
            text: 'Champions',
            counter: 4323,
        },
        {
            category: 'Music',
            text: 'ROTDC',
            counter: 3733,
        },
    ];

    ngOnInit(): void {}
}
