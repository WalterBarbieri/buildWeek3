import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms'
import { catchError, of } from 'rxjs'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  accedi(form: NgForm) {
    console.log(form.value);

    this.authSrv.login(form.value).pipe(
      catchError(error => {
        console.error(error);
        alert('Login Fallito');
        form.reset();
        return of(null);
      })
    ).subscribe(response => {
      if (response) {
        this.router.navigate(['/']);
        alert('Login Effettuato');
      }
    });
  }

  redirectToRegister() {
    this.router.navigate(['/register']);
  }

}
