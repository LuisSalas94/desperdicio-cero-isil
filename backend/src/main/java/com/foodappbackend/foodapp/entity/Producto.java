package com.foodappbackend.foodapp.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.foodappbackend.foodapp.enums.TipoProducto;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "productos")
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String descripcion;

    @Column(nullable = false)
    private String codProducto;

    @Column(nullable = false)
    private Double precioOriginal;

    @Column(nullable = false)
    private Double precioOferta;

    @Column(nullable = false)
    private Integer stock;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoProducto tipoProducto;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "empresa_id", referencedColumnName = "id")
    @JsonBackReference
    private Empresa empresa;

}
