import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/objects/User';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-dashboard-create',
  templateUrl: './dashboard-create.component.html',
  styleUrls: ['./dashboard-create.component.css'],
})
export class DashboardCreateComponent implements OnInit {
  constructor(private auth: AuthService, private postService: PostService) {}
  postText!: string;
  userDisplayName!: string | null;
  username!: string | null;
  postImage!: string | ArrayBuffer | null;
  user!: any;
  charCounter: number = 0;

  async ngOnInit() {
    this.user = await this.auth.getUserData();
  }
  onAddPost(text: string, image?: any) {
    this.postService.addPost(text, this.user.userdata, image);
    this.postText = '';
    this.postImage = null;
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
        this.postImage = fileReader.result;
      };
      fileReader.readAsDataURL(uploadedFile);
    }
  }

  ngOnDestroy(): void {
    this.userDisplayName = null;
  }
}
