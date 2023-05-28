import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedService } from 'src/app/services/shared.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

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
        private sharedService: SharedService,
        private _snackBar: MatSnackBar
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
    updateUserData() {
        this.userService.updateUserData(this.user.userdata._id, this.displayName, this.bio, this.location).subscribe({
            next: () => {
                this.sharedService.sendClickEvent();
            },
            complete: () => {
                this.closeDialog().then(() => {
                    this.openEditSuccessSnackBar();
                });
            },
        });
    }
    openEditSuccessSnackBar() {
        const config = new MatSnackBarConfig();
        config.panelClass = ['snackbar-custom'];
        config.duration = 4000;
        this._snackBar.open('Profile updated successfully', '', config);
    }

    async closeDialog() {
        this.dialogRef.close();
    }
}
