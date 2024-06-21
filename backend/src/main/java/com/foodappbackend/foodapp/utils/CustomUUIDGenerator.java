package com.foodappbackend.foodapp.utils;

import java.util.UUID;

public class CustomUUIDGenerator {
    public static String generateCustomUUID() {
        String part1 = String.format("%05d", (int) (Math.random() * 100000));
        String part2 = String.format("%05d", (int) (Math.random() * 100000));
        String part3 = UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        return part1 + "-" + part2 + "-" + part3;
    }
}
