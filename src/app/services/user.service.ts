import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {firstValueFrom, lastValueFrom} from 'rxjs';
import {User} from '../objects/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  userUpdateApi = 'http://localhost:3000/api/users';
  getUserData(id: string) {
    return this.http.get<{userdata: User}>('http://localhost:3000/userdata/' + id);
  }
  async updateUserData(id: string, displayName: string, bio: string, location: string) {
    const updatedUserData = {
      id: id,
      displayName: displayName,
      bio: bio,
      location: location,
    };
    return this.http.put(this.userUpdateApi.concat('/').concat(id), updatedUserData);
  }

  getDataByUsername(username: string) {
    return firstValueFrom(this.http.get('http://localhost:3000/profile/' + username));
  }
}
