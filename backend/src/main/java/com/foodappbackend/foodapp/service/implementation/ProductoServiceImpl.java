package com.foodappbackend.foodapp.service.implementation;

import com.foodappbackend.foodapp.entity.Producto;
import com.foodappbackend.foodapp.repository.ProductoRepositorio;
import com.foodappbackend.foodapp.service.IProductoService;
import com.foodappbackend.foodapp.utils.CustomUUIDGenerator;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProductoServiceImpl implements IProductoService {

    @Autowired
    private ProductoRepositorio productoRepositorio;

    @Override
    public Producto save(Producto producto) {
        producto.setCodProducto(CustomUUIDGenerator.generateCustomUUID());
        return productoRepositorio.save(producto);
    }

    @Override
    public List<Producto> findByEmpresaId(Long id) {
        return productoRepositorio.findByEmpresaId(id);
    }

    @Override
    public Producto findById(Long id) {
        return productoRepositorio.findById(id).get();
    }

    @Override
    public Producto updateProducto(Producto producto) {
        Producto existingProduct = productoRepositorio.findById(producto.getId()).get();
        existingProduct.setNombre(producto.getNombre());
        existingProduct.setDescripcion(producto.getDescripcion());
        existingProduct.setPrecioOriginal(producto.getPrecioOriginal());
        existingProduct.setPrecioOferta(producto.getPrecioOferta());
        existingProduct.setStock(producto.getStock());
        existingProduct.setTipoProducto(producto.getTipoProducto());
        return productoRepositorio.save(existingProduct);

    }

    @Override
    public void deleteById(Long id) {
        productoRepositorio.deleteById(id);
    }


}
