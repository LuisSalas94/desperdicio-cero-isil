import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  /* New Implementation */
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  /* New Implementation */
  /*   ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
  } */

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.authService.authChanged.subscribe((state: boolean) => {
      this.isLoggedIn = state;
    });
  }

  logout(): void {
    this.authService.logout();
    /* New Implementation */
    this.isLoggedIn = false;
  }
}
