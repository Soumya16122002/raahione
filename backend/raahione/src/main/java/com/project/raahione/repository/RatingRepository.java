package com.project.raahione.repository;

import com.project.raahione.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RatingRepository
        extends JpaRepository<Rating, Long> {
    boolean existsByUserIdAndRideId(
            Long userId,
            Long rideId
    );
    List<Rating> findByRideId(Long rideId);
}