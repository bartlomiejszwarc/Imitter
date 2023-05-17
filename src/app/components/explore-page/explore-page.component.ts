import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-explore-page',
    templateUrl: './explore-page.component.html',
    styleUrls: ['./explore-page.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class ExplorePageComponent implements OnInit {
    constructor(private userService: UserService, private postService: PostService, private authService: AuthService) {}
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

    isLoading!: boolean;
    user!: any;

    async ngOnInit(): Promise<void> {
        this.user = await this.authService.getUserData();
    }

    searchForPeople(): void {
        this.peopleFound = [];

        if (this.peopleSearchInputString) {
            this.isLoading = true;
            console.log('Searching for: ', this.peopleSearchInputString);
            this.userService.searchPeople(this.peopleSearchInputString).subscribe({
                next: (res: any) => {
                    this.peopleFound = res.users;
                    console.log('people were found: ', this.peopleFound);
                    this.peopleSearchingProcessed = true;
                    if (res.users.length > 0) {
                        this.peopleSearchFound = true;
                    } else {
                        this.peopleSearchInputSubmitted = this.peopleSearchInputString;
                        this.peopleSearchFound = false;
                    }
                },
                error: (err) => {
                    console.log(err);
                },
                complete: () => {
                    console.log('complete');
                    this.isLoading = false;
                },
            });
        }
    }

    searchForPosts(): void {
        this.postsFound = [];
        if (this.postSearchInputString) {
            this.isLoading = true;
            console.log('searching for: ', this.postSearchInputString);
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
                    console.log(err);
                },
                complete: () => {
                    console.log('complete');
                    this.isLoading = false;
                },
            });
        }
    }
}
