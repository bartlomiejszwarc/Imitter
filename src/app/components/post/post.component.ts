import { PostLikesListComponent } from '../post-likes-list/post-likes-list.component';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/objects/Post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { User } from 'src/app/objects/User';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class PostComponent implements OnInit {
    constructor(public postService: PostService, public authService: AuthService, public dialog: MatDialog) {}

    @Input() post!: any;
    @Input() postLoaded!: boolean;
    @Input() liked!: boolean;
    @Input() userLiked!: string;
    @Input() currentProfile!: string;
    @Input() postsEmpty: boolean = false;
    user: any;
    postsSubscription!: Subscription;
    hasUserLiked!: boolean;

    async ngOnInit(): Promise<void> {
        this.user = await this.authService.getUserData();
    }

    onDeletePost(id: string, currentProfile: string) {
        this.postService.deletePost(id, this.user.userdata._id, currentProfile);
    }

    onUpdateLikesCounter(id: string, post: Post, currentProfile: string) {
        this.postService
            .updateLikesCount(this.post?._id, this.post, this.user?.userdata?._id, currentProfile)
            .subscribe({
                next: (res: any) => {
                    this.postService.getPostDetails(this.post?._id).subscribe((res: any) => {
                        this.post = res.post;
                    });
                },
                error: (error) => {},
                complete: () => {},
            });
    }

    checkUserLike(post: Post['likedByIdArray']): boolean {
        return post?.includes(this.currentProfile);
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
