package com.project.raahione.controller;

import com.project.raahione.dto.RideRequest;
import com.project.raahione.entity.Ride;
import com.project.raahione.service.RideService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/rides")
public class RideController {

    private final RideService rideService;

    public RideController(RideService rideService) {
        this.rideService = rideService;
    }

    @PostMapping
    public Ride createRide(@RequestBody RideRequest request) {
        return rideService.createRide(request);
    }
    @GetMapping("/search")
    public List<Ride> searchRides(
            @RequestParam String source,
            @RequestParam String destination,
            @RequestParam String travelDate) {

        return rideService.searchRides(
                source,
                destination,
                travelDate
        );
    }
    @GetMapping("/driver/{driverId}")
    public List<Ride> getDriverTrips(
            @PathVariable Long driverId) {

        return rideService.getDriverTrips(driverId);
    }
    @DeleteMapping("/{rideId}")
    public void deleteRide(
            @PathVariable Long rideId) {

        rideService.deleteRide(rideId);
    }
    @PutMapping("/complete/{rideId}")
    public Ride completeRide(
            @PathVariable Long rideId
    ) {
        return rideService.completeRide(rideId);
    }
    @GetMapping
    public List<Ride> getAllRides() {
        return rideService.getAllRides();
    }

}