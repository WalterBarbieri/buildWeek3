import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/auth/auth.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { PostService } from 'src/app/service/post.service';
import { Post } from 'src/app/interface/post.interface';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  sub!: Subscription;

  user!: Auth | null;

  post!: Post | null;

  postId!: number;

  constructor(private authSrv: AuthService, private postSrv: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((_user) => {
      this.user = _user;
    });
    this.route.params.subscribe(params => {
      this.postId = +params['id'];
    })

    this.sub = this.postSrv.recuperaSinglePost(this.postId).subscribe((post: Post) => {
      this.post = post;
      console.log(this.post);

    })

  }

}
