package com.it.itdemo.service;

import com.it.itdemo.dataAcces.entity.Level;
import com.it.itdemo.dataAcces.repo.LevelRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class LevelService {

    private LevelRepo levelRepo;

    @Autowired
    public LevelService(LevelRepo levelRepo) {
        this.levelRepo = levelRepo;
    }


    //add a level
    public Level addLevel(Level level){

        return levelRepo.save(level);

    }

    //found level buy id
    public Level foundById(Long id){

        Optional<Level> level = levelRepo.findById(id);

        return level.orElse(null);

    }
}
