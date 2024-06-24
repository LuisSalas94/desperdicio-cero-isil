import { Component, OnInit } from '@angular/core';
import { CompraService } from '../../services/compra.service';
import { Compra } from '../../models/compra';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-shopping',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './shopping.component.html',
  styleUrl: './shopping.component.css',
})
export class ShoppingComponent implements OnInit {
  constructor(private compraService: CompraService, private router: Router) {}

  compras: Compra[] = [];
  totalPrice: number = 0;

  ngOnInit(): void {
    this.compras = this.compraService.compras;
    this.compras.map((compra) => (this.totalPrice += compra.precio));
  }

  removeCompraFromCart(id: string) {
    const removedCompra = this.compras.find((item) => item.id === id);
    if (removedCompra) {
      this.compras = this.compras.filter((item) => item.id !== id);
      this.totalPrice -= this.calculateTotalPrice(removedCompra);
    }

    if (this.compras.length == 0) {
      this.clearCart();
      this.router.navigate(['/empresa']);
    }
  }

  addQuantity(compraId: string) {
    const index = this.compras.findIndex((compra) => compra.id === compraId);
    if (index !== -1) {
      this.compras[index].cantidad++;
      this.totalPrice += this.compras[index].precio; //
    }
  }

  reduceQuantity(compraId: string) {
    const index = this.compras.findIndex((compra) => compra.id === compraId);
    const quantity = this.compras[index].cantidad;
    if (index !== -1 && this.compras[index].cantidad > 0) {
      this.compras[index].cantidad--;
      this.totalPrice -= this.compras[index].precio;
    }
    if (quantity == 1) {
      this.removeCompraFromCart(compraId);
    }
    if (this.compras.length == 0) {
      this.clearCart();
    }
  }

  calculateTotalPrice(compra: Compra): number {
    return compra.cantidad * compra.precio;
  }

  clearCart() {
    this.compraService.clearCart();
    this.compras = [];
    this.totalPrice = 0;
    this.router.navigate(['/empresa']);
  }
}
