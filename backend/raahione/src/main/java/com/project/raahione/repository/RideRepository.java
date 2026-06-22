package com.project.raahione.repository;

import com.project.raahione.entity.Ride;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RideRepository extends JpaRepository<Ride, Long> {

    List<Ride>
    findBySourceIgnoreCaseAndDestinationIgnoreCaseAndTravelDate(
            String source,
            String destination,
            String travelDate
    );

    List<Ride> findByDriverId(Long driverId);

    List<Ride>
    findBySourceIgnoreCaseAndDestinationIgnoreCaseAndAvailableSeatsGreaterThan(
            String source,
            String destination,
            Integer seats
    );
}