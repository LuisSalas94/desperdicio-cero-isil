import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { CompraService } from '../../services/compra.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private compraService: CompraService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.authService.authChanged.subscribe((state: boolean) => {
      this.isLoggedIn = state;
    });

    console.log(
      'Compra Service, length of compras: ',
      this.compraService.getComprasLength()
    );
  }

  logout(): void {
    Swal.fire({
      title: '¡Adiós!',
      text: 'Gracias por visitarnos',
      icon: 'info',
    });
    this.authService.logout();
    this.isLoggedIn = false;
  }
}
