package com.project.raahione.repository;

import com.project.raahione.entity.Ride;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RideRepository extends JpaRepository<Ride, Long> {

    List<Ride> findBySourceIgnoreCaseAndDestinationIgnoreCase(
            String source,
            String destination
    );

    List<Ride> findByDriverId(Long driverId);

    List<Ride> findByDestinationIgnoreCase(String destination);

    List<Ride> findBySourceIgnoreCase(String source);

    List<Ride> findBySourceIgnoreCaseAndDestinationIgnoreCaseAndAvailableSeatsGreaterThan(
            String source,
            String destination,
            Integer seats
    );
}