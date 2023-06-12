import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Post } from '../interface/post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseURL = environment.baseURL;

  constructor(private http: HttpClient) { }

  recuperaPost(userId: number) {
    return this.http.get<Post[]>(`${this.baseURL}post?userId=${userId}`)


  }
  rimuoviPost(id: number) {
    return this.http.delete<Post>(`${this.baseURL}post/${id}`)
  }

  recuperaSinglePost(id: number) {
    return this.http.get<Post>(`${this.baseURL}post/${id}`)
  }

  creaPost(post: Post) {
    return this.http.post<Post>(`${this.baseURL}post`, post)
  }

  modificaPost(post: Post, id: number) {
    return this.http.put<Post>(`${this.baseURL}post/${id}`, post)
  }
}
