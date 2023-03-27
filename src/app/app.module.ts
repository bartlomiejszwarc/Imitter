import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LoginWindowComponent } from './components/login-window/login-window.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { FormsModule } from '@angular/forms';
import { ListComponent } from './components/list/list.component';
import { AngularFireModule } from '@angular/fire/compat/';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatMenuModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
