package com.project.raahione.service;
import java.util.List;
import com.project.raahione.dto.RideRequest;
import com.project.raahione.entity.Ride;
import com.project.raahione.entity.User;
import com.project.raahione.repository.RideRepository;
import org.springframework.stereotype.Service;

@Service
public class RideService {

    private final RideRepository rideRepository;
    private final UserService userService;

    public RideService(RideRepository rideRepository,
                       UserService userService) {

        this.rideRepository = rideRepository;
        this.userService = userService;
    }

    public Ride createRide(RideRequest request) {


        User driver =
                userService.getUserById(request.getDriverId());

        if (!"DRIVER".equals(driver.getRole())) {
            throw new RuntimeException(
                    "Only drivers can create rides"
            );
        }

        Ride ride = new Ride();

        ride.setSource(request.getSource());
        ride.setDestination(request.getDestination());
        ride.setDepartureTime(request.getDepartureTime());
        ride.setTravelDate(request.getTravelDate());
        ride.setTravelTime(request.getTravelTime());
        ride.setAvailableSeats(request.getAvailableSeats());
        ride.setDriver(driver);
        ride.setStatus("ACTIVE");


        return rideRepository.save(ride);
    }
    public List<Ride> searchRides(
            String source,
            String destination,
            String travelDate) {

        return rideRepository
                .findBySourceIgnoreCaseAndDestinationIgnoreCaseAndTravelDate(
                        source,
                        destination,
                        travelDate
                );
    }
    public List<Ride> getDriverTrips(Long driverId) {

        return rideRepository.findByDriverId(driverId);
    }
    public List<Ride> getAllRides() {
        return rideRepository.findAll();
    }
    public void deleteRide(Long rideId) {

        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() ->
                        new RuntimeException("Ride not found"));

        rideRepository.delete(ride);
    }
    public Ride completeRide(Long rideId) {

        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() ->
                        new RuntimeException("Ride not found"));

        ride.setStatus("COMPLETED");

        return rideRepository.save(ride);
    }
}