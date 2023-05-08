import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/objects/User';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { FollowListComponent } from '../follow-list/follow-list.component';
import { SharedService } from 'src/app/services/shared.service';

@Component({
    selector: 'app-profile-details-card',
    templateUrl: './profile-details-card.component.html',
    styleUrls: ['./profile-details-card.component.css'],
})
export class ProfileDetailsCardComponent implements OnInit {
    constructor(
        private authService: AuthService,
        private userService: UserService,
        private sharedService: SharedService
    ) {}
    @Input() public followListComponent!: FollowListComponent;
    @Input() profilePicture!: string;
    @Input() username!: string;
    @Input() displayName!: string;
    @Input() bio!: string;
    @Input() usersDetailsList!: any;
    @Input() user!: User;
    currentUser!: any;
    isFollowed!: boolean;
    isOwner!: boolean;
    isDataLoading: boolean = true;

    async ngOnInit(): Promise<void> {
        await this.getCurrentUserData();
        this.checkIfUserIsOwner();
        this.checkIsFollowed(this.user).then(() => {
            this.isDataLoading = false;
        });
    }

    async getCurrentUserData() {
        this.currentUser = await this.authService.getUserData();
    }
    async checkIfUserIsOwner() {
        if (this.username === this.currentUser?.userdata?.username) {
            this.isOwner = true;
        }
    }
    async onFollowUser(userToFollowId: string) {
        this.userService.followUser(userToFollowId, this.currentUser.userdata._id).subscribe((res: any) => {
            if (res.followed) {
                this.isFollowed = true;
            } else {
                this.isFollowed = false;
            }
        });
    }
    async checkIsFollowed(user: User) {
        this.isFollowed = user?.followers?.includes(this.currentUser?.userdata?._id);
    }
}
