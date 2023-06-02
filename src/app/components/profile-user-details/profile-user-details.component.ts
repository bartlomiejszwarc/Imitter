import { SharedService } from './../../services/shared.service';
import { Component, Input, OnInit, OnChanges, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
    BehaviorSubject,
    delay,
    firstValueFrom,
    lastValueFrom,
    Observable,
    of,
    shareReplay,
    Subscription,
    tap,
} from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/objects/User';

@Component({
    selector: 'app-profile-user-details',
    templateUrl: './profile-user-details.component.html',
    styleUrls: ['./profile-user-details.component.css'],
})
export class ProfileUserDetailsComponent implements OnInit, OnDestroy {
    constructor(
        private authService: AuthService,
        public dialog: MatDialog,
        private sharedService: SharedService,
        private userService: UserService,
        private cdr: ChangeDetectorRef
    ) {}
    @Input() username!: any;
    @Input() postsCount!: number;
    user!: any;
    currentUser!: any;
    userDataSubscription!: Subscription;
    canEdit: boolean = false;
    isOwner: boolean = false;
    isFollowed!: boolean;
    canShowButton: boolean = false;
    userFollowersIdList: string[] = [];
    isLoaded: boolean = false;
    isFollowersEmpty: boolean = false;
    userFollowersDetailsList: User[] = [];
    followersCount!: number;
    user$ = new BehaviorSubject<any>(null);

    async ngOnInit(): Promise<void> {
        await this.getUserData();

        this.subscribeUserData();
    }

    async getUserData() {
        this.userService.getDataByUsername(this.username).subscribe({
            next: (user) => {
                this.user = user;
            },
            complete: async () => {
                await this.getCurrentUserData();
            },
        });
    }
    async getCurrentUserData() {
        this.authService.getUserById().subscribe((user): any => {
            this.currentUser = user;
            this.canShowButton = true;
            this.getFollowersId();
            this.getFollowersDetails(this.userFollowersIdList);
            this.checkIfCanEdit();
            this.checkIfUserIsOwner();
            this.checkIsFollowed(this?.user?.userdata);
        });
    }

    subscribeUserData() {
        this.userDataSubscription = this.sharedService.getClickEvent().subscribe(() => {
            this.getUserData();
        });
        this.sharedService.getUserData().subscribe((user) => {
            this.user = user;
        });
    }
    checkIfCanEdit(): void {
        if (this.user?.userdata?.username === this.currentUser?.userdata?.username) {
            this.canEdit = true;
        }
    }
    checkIfUserIsOwner() {
        if (this.user?.userdata?.username === this.currentUser?.userdata?.username) {
            this.isOwner = true;
        }
    }
    onFollowUser(userToFollowId: string) {
        this.userService.followUser(userToFollowId, this.currentUser.userdata._id).subscribe((res: any) => {
            if (res.followed) {
                this.isFollowed = true;
            } else {
                this.isFollowed = false;
            }
            this.getUserData();
        });
    }
    checkIsFollowed(user: User) {
        this.isFollowed = user?.followers?.includes(this.currentUser?.userdata?._id);
    }

    getFollowersId() {
        const followersList = this.user?.userdata?.followers;
        followersList?.forEach((followerId: string) => {
            this.userFollowersIdList.push(followerId);
        });
        if (this.userFollowersIdList.length === 0) {
            this.isFollowersEmpty = true;
        }
        this.isLoaded = true;
        return this.userFollowersIdList;
    }

    getFollowersDetails(followersList: Array<string>) {
        followersList.forEach((followerId: string) => {
            this.userService.getUserData(followerId).subscribe((user) => {
                this.userFollowersDetailsList.push(user.userdata);
            });
        });
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(EditProfileComponent, {
            panelClass: 'edit-dialog',
        });
    }
    closeDialog(): void {
        this.dialog.closeAll();
    }
    ngOnDestroy(): void {
        this.user = null;
        this.username = null;
        this.userDataSubscription.unsubscribe();
    }
}
