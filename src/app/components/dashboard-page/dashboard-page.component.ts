import { User } from 'src/app/objects/User';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/objects/Post';
import { DashboardCreateComponent } from '../dashboard-create/dashboard-create.component';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    styleUrls: ['./dashboard-page.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class DashboardPageComponent implements OnInit {
    constructor(
        private auth: AuthService,
        private postService: PostService,
        public dialog: MatDialog,
        private title: Title
    ) {
        this.title.setTitle('Home / Imitter');
    }

    posts: Post[] = [];
    followingPosts: Post[] = [];
    postsSubscription!: Subscription;
    user!: any;
    postLoaded: boolean = false;
    isLatestPostsEmpty!: boolean;
    isFollowingPostsEmpty!: boolean;
    async ngOnInit(): Promise<void> {
        this.postLoaded = false;

        this.postsSubscription = this.postService.getPostsUpdatedListener().subscribe((res: Post[]) => {
            this.posts = res;
            this.postLoaded = true;
            if (this.posts.length > 0) {
                this.isLatestPostsEmpty = false;
            } else {
                this.isLatestPostsEmpty = true;
            }
        });
        this.user = await this.auth.getUserData();
        this.postService.getUsersFollowingPosts(this.user.userdata._id).subscribe((res: any) => {
            this.followingPosts = res;
            if (this.followingPosts.length > 0) {
                this.isFollowingPostsEmpty = false;
            } else {
                this.isFollowingPostsEmpty = true;
            }
        });
        (await this.postService.getPosts(this.user.userdata._id)).subscribe((res: any) => {
            this.posts = res;
            this.postLoaded = true;
            if (this.posts.length > 0) {
                this.isLatestPostsEmpty = false;
            } else {
                this.isLatestPostsEmpty = true;
            }
        });
    }
    openDialog(): void {
        const dialogRef = this.dialog.open(DashboardCreateComponent, {
            panelClass: 'userlikes-dialog',
        });
    }

    closeDialog(): void {
        this.dialog.closeAll();
    }
}
