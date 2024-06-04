package com.foodappbackend.foodapp.repository;

import com.foodappbackend.foodapp.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
}
