import { PostComponent } from './../components/post/post.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, delay, map, Observable, Subject, tap } from 'rxjs';
import { Post } from '../objects/Post';
import { CreatePost } from '../objects/CreatePost';
import { DatePipe } from '@angular/common';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  postsApi = 'http://localhost:3000/api/posts';

  getPostsUpdatedListener() {
    return this.postsUpdated.asObservable();
  }

  getPosts() {
    return this.http.get<{ message: string; posts: any[] }>(this.postsApi).pipe(
      map(postData => {
        return postData.posts.map(post => {
          return {
            _id: post._id,
            text: post.text,
            date: post.date,
            imageUrl: post.imageUrl,
            likesCounter: post.likesCounter,
            author: post.author,
            likedByIdArray: post.likedByIdArray,
          };
        });
      })
    );
  }

  getUsersPosts(id: string) {
    return this.http.get(
      'http://localhost:3000/users'.concat('/').concat(id).concat('/posts')
    );
  }

  addPost(content: string, postAuthor: any, image?: HTMLInputElement) {
    const author = {
      username: postAuthor.username,
      displayName: postAuthor.displayName,
      profilePicture: postAuthor.profilePicture,
      _id: postAuthor._id,
    };
    const post = {
      text: content,
      date: new Date(),
      image: image,
      likesCounter: 0,
      author: author,
    };

    const postsUpdated = this.http.post<{ posts: Post[]; message: string }>(
      this.postsApi,
      post
    );
    postsUpdated.subscribe(res => {
      this.getPosts().subscribe(res => {
        this.posts = res;
        this.postsUpdated.next([...this.posts]);
      });
    });
  }

  getPostDetails(id: string) {
    return this.http.get('http://localhost:3000/api/posts/' + id);
  }

  getUserLikedPosts(id: string) {
    return this.http.get(
      'http://localhost:3000/users/'.concat(id).concat('/likes')
    );
  }

  deletePost(id: string, userId: string) {
    const postsUpdated = this.http.delete(
      this.postsApi.concat('/').concat(id),
      { body: { userId } }
    );
    postsUpdated.subscribe(res => {
      this.getPosts().subscribe(res => {
        this.posts = res;
        this.postsUpdated.next([...this.posts]);
      });
    });
  }

  updateLikesCount(id: string, post: Post, userId: string) {
    const updatedPost = {
      text: post.text,
      date: post.date,
      imageUrl: post.imageUrl || undefined,
      likesCounter: post.likesCounter + 1,
      author: post.author,
      userId: userId,
    };
    this.http
      .put(this.postsApi.concat('/').concat(id), updatedPost)
      .pipe(
        tap(() =>
          this.getPosts().subscribe(res => {
            this.posts = res;
            this.postsUpdated.next([...this.posts]);
          })
        )
      )
      .subscribe();
  }
}
