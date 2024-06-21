package com.foodappbackend.foodapp.controller;

import com.foodappbackend.foodapp.entity.Producto;
import com.foodappbackend.foodapp.service.IProductoService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@AllArgsConstructor
@CrossOrigin(origins = {"http://localhost:4200"})
public class ProductoController {

    @Autowired
    private IProductoService productoService;

    @PostMapping
    public ResponseEntity<Producto> createProducto(@RequestBody Producto producto) {
        Producto savedProducto = productoService.save(producto);
        return new ResponseEntity<>(savedProducto, HttpStatus.CREATED);
    }

    @GetMapping("/empresa/{id}")
    public ResponseEntity<List<Producto>> getProductosByEmpresa(@PathVariable Long id) {
        List<Producto> productos = productoService.findByEmpresaId(id);
        return ResponseEntity.ok(productos);
    }

    @GetMapping("{id}")
    public ResponseEntity<Producto> findProductoById(@PathVariable Long id) {
        Producto producto = productoService.findById(id);
        return new ResponseEntity<>(producto, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<Producto> updateProducto(@PathVariable Long id, @RequestBody Producto producto) {
        producto.setId(id);
        Producto updatedProducto = productoService.updateProducto(producto);
        return new ResponseEntity<>(updatedProducto, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        productoService.deleteById(id);
        return new ResponseEntity<>("Producto was deleted successfully", HttpStatus.OK);
    }

}
