import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EmpresaService } from '../../services/empresa.service';
import { Empresa, Producto } from '../../models/empresa';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto.service';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { v4 as uuidv4 } from 'uuid';
import { Compra } from '../../models/compra';
import { CompraService } from '../../services/compra.service';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css',
})
export class ProductoComponent implements OnInit {
  id: number = 0;

  empresa: Empresa = {
    nombre: '',
    direccion: '',
    horario: '',
    email: '',
    telefono: '',
    tipo: '',
    logo: '',
    productos: [],
  };

  producto: Producto = {
    id: 0,
    nombre: '',
    descripcion: '',
    codProducto: '',
    precioOriginal: 0,
    precioOferta: 0,
    stock: 0,
    tipoProducto: '',
    empresa: {
      id: 0,
    },
  };

  productos: Producto[] = [];

  tipoProductos = [
    { value: 'CAFE', label: 'Café' },
    { value: 'SANGUCHES', label: 'Sanguches' },
    { value: 'ENSALADAS', label: 'Ensaladas' },
    { value: 'PASTAS', label: 'Pastas' },
    { value: 'POSTRES', label: 'Postres' },
    { value: 'BEBIDAS', label: 'Bebidas' },
    { value: 'ENTRADAS', label: 'Entradas' },
    { value: 'PIZZAS', label: 'Pizzas' },
    { value: 'SUSHI', label: 'Sushi' },
  ];

  nombreProducto: string = '';
  descripcionProducto: string = '';
  precioProducto: number = 0;
  precioProductoOferta: number = 0;
  stockProducto: number = 0;
  selectedTipoProducto: string = 'CAFE';

  adminPermission: boolean = false;
  userPermission: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private service: EmpresaService,
    private productoService: ProductoService,
    private userService: UserService,
    private compraService: CompraService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id: number = +(params.get('id') || '0');
      if (id > 0) {
        this.service.findById(id).subscribe((res) => {
          this.empresa = res;
          this.id = res.id!;
          this.refreshProducts();
        });
      }
    });
    const userName = this.userService.getUsername();
    if (userName && userName.length > 0) {
      const firstLetter = userName.charAt(0).toLowerCase();
      if (firstLetter === 'u') {
        this.userPermission = true;
      } else if (firstLetter === 'a') {
        this.adminPermission = true;
      }
    }
  }

  onCreate() {
    const newProduct: Producto = {
      nombre: this.nombreProducto,
      descripcion: this.descripcionProducto,
      precioOriginal: this.precioProducto,
      precioOferta: this.precioProductoOferta,
      stock: this.stockProducto,
      tipoProducto: this.selectedTipoProducto,
      empresa: {
        id: this.id,
      },
    };
    this.productoService.createProduct(newProduct).subscribe(
      (res) => {
        Swal.fire({
          title: 'Producto Creado',
          text: 'Producto ' + newProduct.nombre + ' creado con éxito',
          icon: 'success',
        });
        this.refreshProducts();
      },
      (error) => {
        console.log('Error creating product: ', error);
      }
    );
    this.refreshForm();
  }

  onDelete(id: number) {
    this.productoService.deleteProduct(id).subscribe(
      (res) => {
        console.log('Success, ', res);
      },
      (error) => {
        console.log('Error: ', error);
        Swal.fire({
          title: 'Producto Eliminado',
          text: 'Producto eliminado con éxito',
          icon: 'success',
        });
        this.refreshProducts();
      }
    );
  }

  onBuy(producto: Producto) {
    const newProducto: Compra = {
      id: uuidv4(),
      nombre: producto.nombre,
      tipoProducto: producto.tipoProducto,
      codigoProducto: producto.codProducto!,
      cantidad: 1,
      precio: producto.precioOferta,
    };
    Swal.fire({
      title: 'Producto Agregado',
      text:
        'El producto ' +
        newProducto.nombre +
        ' ha sido agregado al carrito con éxito',
      icon: 'success',
    });
    this.compraService.compras.push(newProducto);
  }

  refreshProducts() {
    this.productoService.findAll(this.id).subscribe((allProducts) => {
      this.productos = allProducts;
    });
  }

  refreshForm() {
    this.nombreProducto = '';
    this.descripcionProducto = '';
    this.precioProducto = 0;
    this.precioProductoOferta = 0;
    this.stockProducto = 0;
    this.selectedTipoProducto = 'CAFE';
  }

  //* Pendientes: 1.Usuario no pueda comprar dos veces el mismo producto, utilizar un "flag" para cambiar el valor. 2. Habilitar metodo de pago, 3. Hacer el componente shopping reactivo para que reacione a cada interaccion del array productos[] 4. Mostrar las imagenes de cada producto de manera dinamica de acuerdo a las options que tenga en el input 5. Crear un ENUM para seleccionar tipo de empresa durante la creacion.*/
}
