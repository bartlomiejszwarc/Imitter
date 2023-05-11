import { User } from 'src/app/objects/User';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/objects/Post';
import { DashboardCreateComponent } from '../dashboard-create/dashboard-create.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent implements OnInit {
    constructor(private auth: AuthService, private postService: PostService, public dialog: MatDialog) {}

    posts: Post[] = [];
    postsSubscription!: Subscription;
    user!: Promise<Object | undefined>;
    postLoaded: boolean = false;
    ngOnInit(): void {
        this.postService.getPosts().subscribe((res: any) => {
            this.posts = res;
            this.postLoaded = true;
        });
        this.postsSubscription = this.postService.getPostsUpdatedListener().subscribe((res: Post[]) => {
            this.posts = res;
            this.postLoaded = true;
        });
        this.user = this.auth.getUserData();
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
