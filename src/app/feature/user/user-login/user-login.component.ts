import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserLogin } from '../../../model/user-login';
import { Subscription } from 'rxjs';
import { UserService } from '../../../service/user.service';
import { User } from '../../../model/user';
import { Router } from '@angular/router';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-user-login',
  standalone: false,
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
})
export class UserLoginComponent implements OnInit, OnDestroy {
  title: string = 'User-Login';
  userLogin: UserLogin = new UserLogin();
  subscription!: Subscription;
  user!: User;
  message: string = '';

  constructor(
    private userSvc: UserService,
    private router: Router,
    private sysSvc: SystemService
  ) {}

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  login() {
    // call the user userService.login(tis.userLogin)
    this.subscription = this.userSvc.login(this.userLogin).subscribe({
      next: (resp) => {
        // what is happening here? how do we end up here, inside of "next"?
        // this is a successful log in and now we're setting the response from such success
        this.sysSvc.loggedInUser = resp;
        console.log('Successful login', this.user);
        this.router.navigateByUrl('movie-list');
        //nav to movie-list
      },
      error: (err) => {
        // unsuccessful log in
        this.message = 'WRONG!!';
      },
    });
    // expected results?
    // - invalud stuff: invalid login - message displayed
    // -valid stuff: go to home page.
  }
}
