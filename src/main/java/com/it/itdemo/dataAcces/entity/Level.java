package com.it.itdemo.dataAcces.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Level {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String collisions;

    private String backgroundImage;

    private int doorPositionX;
    private int doorPositionY;

    private int playerStartPositionX;
    private int playerStartPositionY;
}
