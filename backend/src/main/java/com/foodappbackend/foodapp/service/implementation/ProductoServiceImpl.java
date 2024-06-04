package com.foodappbackend.foodapp.service.implementation;

import com.foodappbackend.foodapp.entity.Empresa;
import com.foodappbackend.foodapp.entity.Producto;
import com.foodappbackend.foodapp.repository.EmpresaRepository;
import com.foodappbackend.foodapp.repository.ProductoRepository;
import com.foodappbackend.foodapp.service.IProductoService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProductoServiceImpl implements IProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private EmpresaRepository empresaRepository;

//    @Override
//    public Producto save(Long empresaId, Producto producto) {
//        Empresa empresa = empresaRepository.findById(empresaId).get();
//        producto.setEmpresa(empresa);
//        return productoRepository.save(producto);
//    }

    @Override
    public Producto save(Long empresaId, Producto producto) {
        Empresa empresa = empresaRepository.findById(empresaId).get();
        empresa.getProductos().add(producto);
        productoRepository.save(producto);
        return producto;
    }

}
