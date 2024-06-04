package com.foodappbackend.foodapp.service;

import com.foodappbackend.foodapp.entity.Producto;

import java.util.List;

public interface IProductoService {

    Producto save(Long empresaId, Producto producto);

}
