export interface User {
  _id: string;
  displayName: string;
  joinDate: Date;
  password: string;
  profilePicture: string;
  username: string;
  bio: string;
  location: string;
  followers: Array<String>;
  following: Array<String>;
}
