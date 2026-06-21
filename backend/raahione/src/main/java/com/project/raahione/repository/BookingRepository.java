package com.project.raahione.repository;

import java.util.List;
import com.project.raahione.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository
        extends JpaRepository<Booking, Long> {

    List<Booking> findByUserId(Long userId);

    List<Booking> findByRideDriverId(Long driverId);

    List<Booking> findTop10ByUserIdOrderByIdDesc(Long userId);
}