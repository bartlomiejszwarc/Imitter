import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-signup-page',
    templateUrl: './signup-page.component.html',
    styleUrls: ['./signup-page.component.css'],
})
export class SignupPageComponent implements OnInit {
    username: string = '';
    password: string = '';
    displayName: string = '';
    profilePicture!: string | ArrayBuffer | null;
    errorMessage!: string;
    constructor(public authService: AuthService, private title: Title) {
        this.title.setTitle('Sign up / Imitter');
    }

    ngOnInit(): void {}

    async register(username: string, password: string, displayName: string, profilePicture?: any) {
        if (profilePicture === undefined) {
            const fileReader = new FileReader();
            // const blob = new Blob(['../assets/images/unknown-user.png'], {
            //   type: 'image/jpg' || 'image/jpeg' || 'image/png',
            // });
            const blob = (await fetch('../assets/images/unknown-user.png')).blob();

            fileReader.onload = () => {
                profilePicture = fileReader.result;
                this.authService.register(username, password, displayName, profilePicture);
            };
            fileReader.readAsDataURL(await blob);
        } else {
            this.authService.register(username, password, displayName, profilePicture);
        }
    }
    onImageUpload(event: Event) {
        const uploadedFile = (event.target as HTMLInputElement).files![0];
        const fileReader = new FileReader();
        if (
            uploadedFile.type === 'image/jpeg' ||
            uploadedFile.type === 'image/png' ||
            uploadedFile.type === 'image/jpg'
        ) {
            fileReader.onload = () => {
                this.profilePicture = fileReader.result;
            };
            fileReader.readAsDataURL(uploadedFile);
        }
    }
}
