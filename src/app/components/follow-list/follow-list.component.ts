import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/objects/User';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-follow-list',
    templateUrl: './follow-list.component.html',
    styleUrls: ['./follow-list.component.css'],
})
export class FollowListComponent implements OnInit {
    constructor(
        private activatedRoute: ActivatedRoute,
        private userService: UserService,
        private sharedService: SharedService,
        private router: Router
    ) {}
    user!: any;
    usersPosts!: any;
    usersPostsSubscription!: Subscription;
    usersLikedPosts!: any;
    postLoaded: boolean = false;
    usernameFromUrl!: string;
    userFound: boolean = true;
    isProcessing: boolean = true;
    followingDetailsList: User[] = [];
    followersDetailsList: User[] = [];
    followersEmpty: boolean = false;
    followingEmpty: boolean = false;
    async ngOnInit(): Promise<void> {
        this.getParam();
    }

    getParam() {
        if (this.activatedRoute.snapshot.paramMap.get('username')) {
            this.activatedRoute.params.subscribe((params) => {
                this.usernameFromUrl = params['username'];
                if (this.isProcessing && this.userFound) {
                    this.isProcessing = true;
                    this.userService.getDataByUsername(this.usernameFromUrl).subscribe({
                        next: (user) => {
                            this.user = user;
                            if (this.user.userdata.followers.length === 0) {
                                this.followersEmpty = true;
                            }
                            if (this.user.userdata.following.length === 0) {
                                this.followingEmpty = true;
                            }
                            this.sharedService.sendUserData(user);
                        },
                        error: (err) => {
                            if (err.status === 404) {
                                this.userFound = false;
                                this.router.navigate(['/profile/' + this.usernameFromUrl]);
                            }
                        },
                        complete: () => {
                            this.getFollowers(this.user?.userdata?.followers);
                            this.getFollowing(this.user?.userdata?.following);
                            this.isProcessing = false;
                        },
                    });
                }
            });
        }
    }

    getFollowers(usersList: Array<string>) {
        this.followersDetailsList = [];
        usersList.forEach((userId: string) => {
            this.userService.getUserData(userId).subscribe((res) => {
                this.followersDetailsList?.push(res.userdata);
            });
        });
    }
    getFollowing(usersList: Array<string>) {
        this.followingDetailsList = [];
        usersList.forEach((userId: string) => {
            this.userService.getUserData(userId).subscribe((res) => {
                this.followingDetailsList?.push(res.userdata);
            });
        });
    }
    public updateFollowsData() {
        this.getFollowing(this.user?.userdata?.following);
        this.getFollowers(this.user?.userdata?.followers);
    }
}
