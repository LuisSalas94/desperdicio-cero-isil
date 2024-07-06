package com.foodappbackend.foodapp.repository;

import com.foodappbackend.foodapp.entity.Empresa;
import com.foodappbackend.foodapp.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmpresaRepository extends JpaRepository<Empresa, Long> {
}
