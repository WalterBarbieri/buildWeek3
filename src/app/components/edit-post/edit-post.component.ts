import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/auth/auth.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { PostService } from 'src/app/service/post.service';
import { Post } from 'src/app/interface/post.interface';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit {
  sub!: Subscription;

  post: Post = {
    userId: 0,
    title: '',
    body: '',
  };

  user!: Auth | null;

  postId!: number;

  form!: NgForm;

  constructor(
    private authSrv: AuthService,
    private postSrv: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authSrv.user$.subscribe((_user) => {
      this.user = _user;
    });

    this.route.params.subscribe((params) => {
      this.postId = +params['id'];
    });

    this.sub = this.postSrv
      .recuperaSinglePost(this.postId)
      .subscribe((post: Post) => {
        this.post = post;
        console.log(this.post);
      });
  }

  setFormValues(post: Post): void {
    this.form.setValue({
      title: post.title,
      body: post.body,
    });
  }

  modifica(form:NgForm) {
    this.post = {
      userId: this.user?.user?.id!,
      title: form.value.title,
      body: form.value.body
    }

    this.sub = this.postSrv.modificaPost(this.post, this.postId).subscribe(() => {

      this.router.navigate(['/'])
    })
  }
}
