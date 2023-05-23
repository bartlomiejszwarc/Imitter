import { PostService } from 'src/app/services/post.service';
import { UserService } from '../../services/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/objects/User';
import { MatDialogRef } from '@angular/material/dialog';
import { Post } from 'src/app/objects/Post';

@Component({
    selector: 'app-post-likes-list',
    templateUrl: './post-likes-list.component.html',
    styleUrls: ['./post-likes-list.component.css'],
})
export class PostLikesListComponent implements OnInit {
    constructor(
        private userService: UserService,
        private postService: PostService,
        private dialogRef: MatDialogRef<PostLikesListComponent>
    ) {}

    ngOnInit() {
        this.postService.getPostDetails(this.post).subscribe((res) => {
            this.postDetails = res;
            this.getUsersIdList();
            this.getUsersDetails(this.postUsersIdList);
            this.isLoaded = true;
        });
    }
    @Input() post!: string;
    postDetails: any;
    postUsersIdList: string[] = [];
    postUsersDetailsList?: User[] = [];
    isLoaded: boolean = false;
    isEmpty: boolean = false;

    //Getting IDs of users that liked post
    getUsersIdList() {
        const usersList = this.postDetails.post.likedByIdArray;
        usersList.forEach((user: string) => {
            this.postUsersIdList?.push(user);
        });
        if (this.postUsersIdList?.length === 0) {
            this.isEmpty = true;
        }
        this.isLoaded = true;

        return this.postUsersIdList;
    }
    getUsersDetails(usersList: Array<string>) {
        usersList.forEach((userId: string) => {
            this.userService.getUserData(userId).subscribe((res) => {
                this.postUsersDetailsList?.push(res.userdata);
            });
        });
    }

    closeDialog() {
        this.dialogRef.close();
    }
}
