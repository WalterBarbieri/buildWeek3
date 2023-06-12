import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/auth/auth.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { PostService } from 'src/app/service/post.service';
import { Post } from 'src/app/interface/post.interface';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  sub!: Subscription;

  post!: Post | null;

  user!: Auth | null;

  constructor(private authSrv: AuthService, private postSrv: PostService, private router: Router) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((_user) => {
      this.user = _user;
    });
  }
  creaPost(form: NgForm) {
    this.post = {
      userId: this.user?.user?.id!,
      title: form.value.title,
      body: form.value.body
    }
    this.sub = this.postSrv.creaPost(this.post).subscribe(() =>{
      this.router.navigate(['/']);
    })

  }

}
