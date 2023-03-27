import {UserService} from './../../services/user.service';
import {AuthService} from './../../services/auth.service';
import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {SharedService} from 'src/app/services/shared.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<EditProfileComponent>,
    private authService: AuthService,
    private userService: UserService,
    private sharedService: SharedService
  ) {}

  user!: any;
  bio!: string;
  location!: string;
  displayName!: string;
  async ngOnInit(): Promise<void> {
    this.user = await this.authService.getUserData();
    this.bio = this.user.userdata.bio;
    this.displayName = this.user.userdata.displayName;
    this.location = this.user.userdata.location;
  }
  async updateUserData() {
    (
      await this.userService.updateUserData(
        this.user.userdata._id,
        this.displayName,
        this.bio,
        this.location
      )
    ).subscribe(() => {
      this.sharedService.sendClickEvent();
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
