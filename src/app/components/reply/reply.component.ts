import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-reply',
    templateUrl: './reply.component.html',
    styleUrls: ['./reply.component.css'],
})
export class ReplyComponent implements OnInit {
    constructor() {}
    @Input() reply!: any;
    @Input() replyAuthor!: any;
    ngOnInit(): void {}
}
