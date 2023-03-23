import { SharedService } from './../../services/shared.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile-user-details',
  templateUrl: './profile-user-details.component.html',
  styleUrls: ['./profile-user-details.component.css'],
})
export class ProfileUserDetailsComponent implements OnInit {
  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private sharedService: SharedService
  ) {}
  user!: any;
  userDataSubscription!: Subscription;

  async ngOnInit(): Promise<void> {
    this.getUserData();
    this.subscribeUserData();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      panelClass: 'edit-dialog',
    });
  }
  closeDialog(): void {
    this.dialog.closeAll();
  }

  async getUserData() {
    this.user = await this.authService.getUserData();
  }

  subscribeUserData() {
    this.userDataSubscription = this.sharedService
      .getClickEvent()
      .subscribe(() => {
        this.getUserData();
      });
  }
}
