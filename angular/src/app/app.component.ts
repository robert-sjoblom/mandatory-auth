import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  user;
  error;

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    try {
      this.user = this.authService.user.name;
    } catch (error) {
      this.user = null;
    }
  }

  login(user, pass) {
    this.authService.login({user, pass})
      .subscribe(
        res => {
          this.user = res.name;
          this.error = false;
        },
        err => this.error = err.error);
  }

  logout() {
    this.authService.logout();
    this.user = null;
  }

  testApi() {
    this.authService.getResource('friends')
      .subscribe(res => console.log(res.friends), err => console.log(err.error));
    // test API access by invoking getResource on authService.
  }
}
