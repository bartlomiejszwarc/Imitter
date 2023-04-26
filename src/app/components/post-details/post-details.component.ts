import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-post-details',
    templateUrl: './post-details.component.html',
    styleUrls: ['./post-details.component.css'],
})
export class PostDetailsComponent implements OnInit {
    constructor(private postService: PostService, private userService: UserService, public route: ActivatedRoute) {
        const id: Observable<string> = route.params.pipe(map((p) => (this.postId = p['id'])));
    }
    post!: any;
    postId!: string;
    postAuthor!: any;
    isPostFound!: boolean;

    async ngOnInit(): Promise<void> {
        await this.getPostIdFromUrl().then(() => this.getPostDetails(this.postId));
    }

    //getting post's details
    getPostDetails(postId: string): void {
        this.postService.getPostDetails(postId).subscribe({
            next: (data) => {
                this.post = data;
            },
            error: (err) => {
                if (err.status === 404) {
                    this.isPostFound = false;
                }
            },
            complete: () => {
                this.getPostAuthorDetails(this.post.post.author?._id);
            },
        });
    }

    //getting post's author details
    async getPostAuthorDetails(authorId: string) {
        this.userService.getUserData(authorId).subscribe((res: any) => {
            this.postAuthor = res.userdata;
        });
    }

    //geting post id from url parameter
    async getPostIdFromUrl() {
        if (this.route.snapshot.paramMap.get('id')) {
            this.route.params.subscribe((params) => {
                this.postId = params['id'];
            });
        }
    }
}
