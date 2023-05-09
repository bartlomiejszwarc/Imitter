import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { User } from '../objects/User';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient) {}

    userApi = 'http://localhost:3000/api/users/';
    userdataApi = 'http://localhost:3000/userdata/';
    profileApi = 'http://localhost:3000/profile/';
    getUserData(id: string) {
        return this.http.get<{ userdata: User }>(this.userdataApi + id);
    }
    updateUserData(id: string, displayName: string, bio: string, location: string) {
        const updatedUserData = {
            id: id,
            displayName: displayName,
            bio: bio,
            location: location,
        };
        return this.http.put(this.userApi.concat(id), updatedUserData);
    }

    getDataByUsername(username: string) {
        return this.http.get<User>(this.profileApi + username);
    }

    followUser(id: string, followedByUserId: string) {
        const body = {
            followedByUserId: followedByUserId,
        };

        return this.http.put<User>(this.userApi + id + '/follow', body);
    }

    getFollowers(id: string) {
        return this.http.get('/userdata/' + id);
    }
}
