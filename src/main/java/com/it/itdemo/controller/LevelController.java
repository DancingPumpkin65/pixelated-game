package com.it.itdemo.controller;

import com.it.itdemo.dataAcces.entity.Level;
import com.it.itdemo.service.LevelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class LevelController {

    private LevelService levelService;

    @Autowired
    public LevelController(LevelService levelService) {
        this.levelService = levelService;
    }

    //add level
    @PostMapping("/level/add")
    public Level addLevel(@RequestBody Level level){
        return levelService.addLevel(level);
    }
    //get level by id
    @GetMapping("/level/{id}")
    public Level addLevel(@PathVariable("id") Long id){
        return levelService.foundById(id);
    }

}
