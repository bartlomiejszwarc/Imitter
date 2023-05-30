import { catchError, delay, lastValueFrom, of, Subscription } from 'rxjs';
import { EditProfileComponent } from './../edit-profile/edit-profile.component';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/objects/Post';
import { SharedService } from 'src/app/services/shared.service';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile-page.component.html',
    styleUrls: ['./profile-page.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class ProfilePageComponent implements OnInit {
    constructor(
        private authService: AuthService,
        private postService: PostService,
        public dialog: MatDialog,
        private userService: UserService,
        private activatedRoute: ActivatedRoute,
        private sharedService: SharedService,
        private title: Title
    ) {}
    user!: any;
    usersPosts!: any;
    usersPostsSubscription!: Subscription;
    usersLikedPosts!: any;
    postLoaded: boolean = false;
    usernameFromUrl!: string;
    userFound: boolean = true;
    isProcessing: boolean = false;
    postsCount!: number;

    async ngOnInit(): Promise<void> {
        await this.getParam();
        this.getUsersPosts().then(() => {});

        this.getUsersLikedPosts();
    }

    async getParam() {
        if (this.activatedRoute.snapshot.paramMap.get('username')) {
            this.activatedRoute.params.subscribe((params) => {
                this.usernameFromUrl = params['username'];
                if (!this.isProcessing && this.userFound) {
                    this.isProcessing = true;
                    this.userService.getDataByUsername(this.usernameFromUrl).subscribe({
                        next: (user) => {
                            this.user = user;
                            this.sharedService.sendUserData(user);
                            this.getUsersPosts();
                            this.getUsersLikedPosts();
                        },
                        error: (err) => {
                            if (err.status === 404) {
                                this.userFound = false;
                            }
                        },
                        complete: () => {
                            this.title.setTitle(
                                this.user?.userdata?.displayName + ' (@' + this.user?.userdata?.username + ') / Imitter'
                            );
                            this.isProcessing = false;
                        },
                    });
                }
            });
        } else {
            this.user = await this.authService.getUserData();
        }
    }
    async getUsersPosts() {
        if (this.user) {
            this.postService.getUsersPosts(this.user.userdata._id).subscribe((res) => {
                this.usersPosts = res;
                this.postLoaded = true;
                this.postsCount = this.usersPosts.length;
            });
            this.postService.getUsersPostsUpdatedListener().subscribe((res: Post[]) => {
                this.usersPosts = res;
                this.postLoaded = true;
            });
        }
    }

    getUsersLikedPosts() {
        if (this.user) {
            this.postService.getUserLikedPosts(this.user.userdata._id).subscribe((res) => {
                this.usersLikedPosts = res;
                this.postLoaded = true;
            });
            this.postService.getUsersLikedPostsUpdatedListener().subscribe((res) => {
                this.usersLikedPosts = res;
                this.postLoaded = true;
            });
        }
    }
    openDialog(): void {
        const dialogRef = this.dialog.open(EditProfileComponent, {
            panelClass: 'edit-dialog',
        });
    }
    closeDialog(): void {
        this.dialog.closeAll();
    }
}
