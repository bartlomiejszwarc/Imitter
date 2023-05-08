import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LoginWindowComponent } from './components/login-window/login-window.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { ListComponent } from './components/list/list.component';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';
import { DashboardSidebarComponent } from './components/dashboard-sidebar/dashboard-sidebar.component';
import { DashboardCreateComponent } from './components/dashboard-create/dashboard-create.component';
import { PostComponent } from './components/post/post.component';
import { DashboardSearchComponent } from './components/dashboard-search/dashboard-search.component';
import { DashboardTrendsComponent } from './components/dashboard-trends/dashboard-trends.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth-interceptor';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProfileUserDetailsComponent } from './components/profile-user-details/profile-user-details.component';
import { MatMenuModule } from '@angular/material/menu';
import { PostLikesListComponent } from './components/post-likes-list/post-likes-list.component';
import { UserLikesComponent } from './components/user-likes/user-likes.component';
import { UserNotFoundComponent } from './components/user-not-found/user-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardRightPanelComponent } from './components/dashboard-right-panel/dashboard-right-panel.component';
import { FollowListComponent } from './components/follow-list/follow-list.component';
import { ProfileDetailsCardComponent } from './components/profile-details-card/profile-details-card.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { TextFieldModule } from '@angular/cdk/text-field';
import { AutosizeModule } from 'ngx-autosize';

@NgModule({
    declarations: [
        AppComponent,
        LoginPageComponent,
        LoginWindowComponent,
        SignupPageComponent,
        ListComponent,
        DashboardPageComponent,
        DashboardSidebarComponent,
        DashboardCreateComponent,
        PostComponent,
        DashboardSearchComponent,
        DashboardTrendsComponent,
        ProfilePageComponent,
        EditProfileComponent,
        ProfileUserDetailsComponent,
        PostLikesListComponent,
        UserLikesComponent,
        UserNotFoundComponent,
        DashboardRightPanelComponent,
        FollowListComponent,
        ProfileDetailsCardComponent,
        PostDetailsComponent,
    ],
    imports: [
        AppRoutingModule,
        MatFormFieldModule,
        FormsModule,
        MatIconModule,
        HttpClientModule,
        MatDialogModule,
        MatTabsModule,
        MatProgressSpinnerModule,
        MatMenuModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        TextFieldModule,
        AutosizeModule,
        ReactiveFormsModule,
    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
    bootstrap: [AppComponent],
})
export class AppModule {}
