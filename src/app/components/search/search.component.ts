import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
    constructor() {}
    @Input() searchedKeyword!: string;
    @Input() searchingForPlaceholder!: string;

    ngOnInit(): void {}
}
