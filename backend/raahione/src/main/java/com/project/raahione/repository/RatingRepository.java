package com.project.raahione.repository;

import com.project.raahione.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RatingRepository
        extends JpaRepository<Rating, Long> {
}