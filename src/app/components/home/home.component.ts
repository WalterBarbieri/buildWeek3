import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/auth/auth.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { PostService } from 'src/app/service/post.service';
import { Post } from 'src/app/interface/post.interface';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  sub!: Subscription;

  user!: Auth | null;

  posts: Post[] | undefined;

  constructor(private authSrv: AuthService, private postSrv: PostService) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((_user) => {
      this.user = _user;
    });

    this.sub = this.postSrv.recuperaPost(this.user?.user?.id!).subscribe((posts: Post[])=> {
      this.posts = posts;
      console.log(this.posts);

    })
  }

  rimuovi(id: number) {
    this.sub = this.postSrv.rimuoviPost(id).subscribe(() => {
      this.posts = this.posts?.filter(post => post.id !== id)
    })

  }

}
