import {SharedService} from './../../services/shared.service';
import {Component, Input, OnInit, OnChanges} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {delay, Subscription} from 'rxjs';
import {AuthService} from 'src/app/services/auth.service';
import {EditProfileComponent} from '../edit-profile/edit-profile.component';
import {UserService} from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-user-details',
  templateUrl: './profile-user-details.component.html',
  styleUrls: ['./profile-user-details.component.css'],
})
export class ProfileUserDetailsComponent implements OnInit {
  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private sharedService: SharedService,
    private userService: UserService
  ) {}
  @Input() username!: any;
  user!: any;
  currentUser!: any;
  userDataSubscription!: Subscription;
  canEdit: boolean = false;

  ngAfterContentInit() {
    this.getCurrentUserData().then(() => this.checkIfCanEdit());
  }
  async ngOnInit(): Promise<void> {
    this.getUserData();
    this.subscribeUserData();
  }
  async ngDoCheck() {}
  async ngOnChanges(): Promise<void> {}

  async getUserData() {
    this.user = await this.userService.getDataByUsername(this.username);
  }
  async getCurrentUserData() {
    this.currentUser = await this.authService.getUserData();
  }

  subscribeUserData() {
    this.userDataSubscription = this.sharedService.getClickEvent().subscribe(() => {
      this.getUserData();
    });
  }
  checkIfCanEdit(): void {
    if (this.user?.userdata?.username === this.currentUser?.userdata?.username) {
      this.canEdit = true;
    }
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
