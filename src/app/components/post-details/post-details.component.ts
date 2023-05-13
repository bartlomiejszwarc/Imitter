import { SharedService } from './../../services/shared.service';
import { AuthService } from './../../services/auth.service';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { AutosizeModule } from 'ngx-autosize';
import { Post } from 'src/app/objects/Post';
import { PostLikesListComponent } from '../post-likes-list/post-likes-list.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-post-details',
    templateUrl: './post-details.component.html',
    styleUrls: ['./post-details.component.css'],
})
export class PostDetailsComponent implements OnInit {
    constructor(
        private postService: PostService,
        private userService: UserService,
        public route: ActivatedRoute,
        private _ngZone: NgZone,
        public dialog: MatDialog,
        private authService: AuthService,
        private sharedService: SharedService
    ) {
        const id: Observable<string> = route.params.pipe(map((p) => (this.postId = p['id'])));
    }
    @ViewChild('autosize') autosize!: CdkTextareaAutosize;
    post!: any;
    postId!: string;
    postAuthor!: any;
    isPostFound!: boolean;
    commentText!: string;
    currentUser!: any;
    repliesList!: any; // TODO
    originalPostId!: string;

    triggerResize() {
        // Wait for changes to be applied, then trigger textarea resize.
        this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
    }

    async ngOnInit(): Promise<void> {
        this.getPostIdFromUrl().then(() => this.getPostDetails(this.postId));
        await this.getCurrentUserData();
    }
    async getCurrentUserData() {
        this.currentUser = await this.authService.getUserData();
    }

    //getting post's details
    getPostDetails(postId: string): void {
        this.postService.getPostDetails(postId).subscribe({
            next: (data) => {
                this.post = data;
                console.log(this.post);
            },
            error: (err) => {
                if (err.status === 404) {
                    this.isPostFound = false;
                }
            },
            complete: () => {
                this.getPostAuthorDetails(this.post.post.author?._id);
                this.getReplies(this.post.post.replies);
            },
        });
    }

    //getting post's author details
    getPostAuthorDetails(authorId: string) {
        this.userService.getUserData(authorId).subscribe((res: any) => {
            this.postAuthor = res.userdata;
        });
    }

    //geting post id from url parameter
    async getPostIdFromUrl() {
        if (this.route.snapshot.paramMap.get('id')) {
            this.route.params.subscribe((params) => {
                this.postId = params['id'];
                this.getPostDetails(this.postId);
            });
        }
    }
    onAddReply(post: any, currentUser: any, reply: any) {
        this.postService.addReply(post, reply, this.currentUser.userdata).subscribe((res: any) => {
            this.commentText = '';
            this.getPostDetails(this.postId);
        });
    }

    async getReplies(replies: Array<string>) {
        this.repliesList = [];
        replies.forEach((replyId) => {
            this.postService.getPostDetails(replyId).subscribe((res: any) => {
                this.repliesList?.push(res);
            });
        });
        this.sharedService.getClickEvent();
    }

    openDialog(post: Post): void {
        const dialogRef = this.dialog.open(PostLikesListComponent, {
            panelClass: 'userlikes-dialog',
        });
        dialogRef.componentInstance.post = post._id;
    }

    closeDialog(): void {
        this.dialog.closeAll();
    }
}
