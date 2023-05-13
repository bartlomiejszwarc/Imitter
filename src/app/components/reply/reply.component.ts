import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/objects/Post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
    selector: 'app-reply',
    templateUrl: './reply.component.html',
    styleUrls: ['./reply.component.css'],
})
export class ReplyComponent implements OnInit {
    constructor(
        private authService: AuthService,
        private postService: PostService,
        private sharedService: SharedService,
        public route: ActivatedRoute
    ) {}
    @Input() reply!: any;
    @Input() replyAuthor!: any;
    user!: any;
    isLiked!: boolean;
    async ngOnInit(): Promise<void> {
        this.user = await this.authService.getUserData();
        this.checkUserLike(this.reply?.likedByIdArray);
    }

    checkUserLike(post: Post['likedByIdArray']) {
        if (post?.includes(this.user?.userdata?._id)) {
            this.isLiked = true;
            return true;
        } else {
            this.isLiked = false;
            return false;
        }
    }
    onUpdateLikesCounter(id: string, post: Post, currentProfile: string) {
        this.postService.updateLikesCount(id, post, this.user.userdata._id, currentProfile).subscribe((res: any) => {
            this.postService.getPostDetails(id).subscribe((res: any) => {
                this.reply = res.post;
                if (this.checkUserLike(this.reply?.likedByIdArray)) {
                    this.isLiked = true;
                } else {
                    this.isLiked = false;
                }
            });
        });
    }
}
