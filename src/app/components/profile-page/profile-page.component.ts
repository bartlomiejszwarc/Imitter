import { EditProfileComponent } from './../edit-profile/edit-profile.component';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfilePageComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private postService: PostService,
    public dialog: MatDialog
  ) {}
  user!: any;
  usersPosts!: any;
  usersLikedPosts!: any;
  postLoaded: boolean = false;

  async ngOnInit(): Promise<void> {
    this.user = await this.authService.getUserData();
    this.postService.getUsersPosts(this.user.userdata._id).subscribe(res => {
      this.usersPosts = res;
      this.postLoaded = true;
    });
    this.postService
      .getUserLikedPosts(this.user.userdata._id)
      .subscribe(res => {
        this.usersLikedPosts = res;
        console.log(res);
        this.postLoaded = true;
      });
  }

  getUsersPosts(): any {
    this.postService.getUsersPosts(this.user.userdata.id);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      panelClass: 'edit-dialog',
    });
  }
  closeDialog(): void {
    this.dialog.closeAll();
  }
}
