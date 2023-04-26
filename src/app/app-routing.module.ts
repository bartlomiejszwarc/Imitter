import { PostLikesListComponent } from './components/post-likes-list/post-likes-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { AuthGuard } from './services/auth.guard';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { FollowListComponent } from './components/follow-list/follow-list.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginPageComponent,
    },
    {
        path: '',
        component: DashboardPageComponent,
    },
    { path: 'signup', component: SignupPageComponent },
    {
        path: 'dashboard',
        component: DashboardPageComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'profile/:username',
        component: ProfilePageComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'profile/:username/status/:id',
        component: PostDetailsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'profile/:username/followers',
        component: FollowListComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'profile/:username/following',
        component: FollowListComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'profile',
        component: ProfilePageComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'edit',
        component: EditProfileComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'likes',
        component: PostLikesListComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard],
})
export class AppRoutingModule {}
