import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-explore-page',
    templateUrl: './explore-page.component.html',
    styleUrls: ['./explore-page.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class ExplorePageComponent implements OnInit {
    constructor(
        private userService: UserService,
        private postService: PostService,
        private authService: AuthService,
        private title: Title
    ) {
        this.title.setTitle('Explore / Imitter');
    }
    peopleSearchInputString!: string;
    postSearchInputString!: string;

    peopleSearchFound: boolean = false;
    postsSearchFound: boolean = false;

    peopleSearchingProcessed: boolean = false;
    postSearchingProcessed: boolean = false;

    peopleFound: Array<any> = [];
    postsFound: Array<any> = [];

    peopleSearchInputSubmitted: string = '';
    postsSearchInputSubmitted: string = '';

    isLoadingPosts!: boolean;
    isLoadingUsers!: boolean;
    user!: any;

    async ngOnInit(): Promise<void> {
        this.user = await this.authService.getUserData();
    }

    searchForPeople(): void {
        this.peopleFound = [];

        if (this.peopleSearchInputString) {
            this.isLoadingUsers = true;
            this.userService.searchPeople(this.peopleSearchInputString).subscribe({
                next: (res: any) => {
                    this.peopleFound = res.users;
                    this.peopleSearchingProcessed = true;
                    if (res.users.length > 0) {
                        this.peopleSearchFound = true;
                    } else {
                        this.peopleSearchInputSubmitted = this.peopleSearchInputString;
                        this.peopleSearchFound = false;
                    }
                },
                error: (err) => {
                    //console.log(err);
                },
                complete: () => {
                    this.isLoadingUsers = false;
                },
            });
        }
    }

    searchForPosts(): void {
        this.postsFound = [];
        if (this.postSearchInputString) {
            this.isLoadingPosts = true;
            this.postService.searchPostsByKeyword(this.postSearchInputString).subscribe({
                next: (res: any) => {
                    this.postsFound = res.posts;
                    this.postSearchingProcessed = true;
                    if (res.posts.length > 0) {
                        this.postsSearchFound = true;
                    } else {
                        this.postsSearchInputSubmitted = this.postSearchInputString;
                        this.postsSearchFound = false;
                    }
                },
                error: (err) => {
                    //console.log(err);
                },
                complete: () => {
                    this.isLoadingPosts = false;
                },
            });
        }
    }
}
