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
    public ResponseEntity<Producto> createProduct(@RequestParam Long empresaId, @RequestBody Producto producto) {
        Producto savedProducto = productoService.save(empresaId, producto);
        return new ResponseEntity<>(savedProducto, HttpStatus.CREATED);
    }

}
