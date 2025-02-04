package com.it.itdemo.service;

import com.it.itdemo.dataAcces.entity.Level;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class LevelServiceTest {

    @Autowired
    LevelService levelService ;


    @Test
    void addLevel() {
        //give
        Level level = new Level();

        level.setCollisions("level1");
        level.setPlayerStartPositionX(766);
        level.setPlayerStartPositionY(272);
        level.setDoorPositionX(200);
        level.setDoorPositionY(200);
        level.setBackgroundImage("backgroundLevel1.png");

        //save it
        System.out.println(levelService.addLevel(level));

    }
}