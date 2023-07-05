import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { User } from 'src/app/objects/User';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-you-might-like-tile',
    templateUrl: './you-might-like-tile.component.html',
    styleUrls: ['./you-might-like-tile.component.css'],
})
export class YouMightLikeTileComponent implements OnInit, OnChanges {
    constructor(
        private authService: AuthService,
        private sharedService: SharedService,
        private userService: UserService
    ) {}
    ngOnChanges(changes: SimpleChanges) {
        this.getTopFollowing(this.username);
    }
    async ngOnInit(): Promise<void> {}
    @Input() username!: string;

    youMightLikeDetailsList: User[] = [];

    getTopFollowing(username: string): void {
        this.userService.getProfileTopFollowing(username).subscribe((res: any) => {
            this.youMightLikeDetailsList = res.user;
        });
    }
}
