package com.it.itdemo.dataAcces.repo;

import com.it.itdemo.dataAcces.entity.Level;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LevelRepo extends JpaRepository<Level,Long> {

    public Optional<Level> findById(Long id);

}
