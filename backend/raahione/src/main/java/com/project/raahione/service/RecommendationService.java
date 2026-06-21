package com.project.raahione.service;

import com.project.raahione.dto.RecommendationRequest;
import com.project.raahione.entity.Booking;
import com.project.raahione.entity.Ride;
import com.project.raahione.repository.BookingRepository;
import com.project.raahione.repository.RideRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RecommendationService {

    private final BookingRepository bookingRepository;
    private final RideRepository rideRepository;
    private final GroqService groqService;

    public RecommendationService(
            BookingRepository bookingRepository,
            RideRepository rideRepository,
            GroqService groqService) {

        this.bookingRepository = bookingRepository;
        this.rideRepository = rideRepository;
        this.groqService = groqService;
    }

    public List<Ride> recommend(
            RecommendationRequest request) {

        List<Booking> bookings =
                bookingRepository.findTop10ByUserIdOrderByIdDesc(
                        request.getUserId()
                );


        StringBuilder history =
                new StringBuilder();

        for (Booking booking : bookings) {

            history.append(
                    booking.getRide().getSource()
            );

            history.append(" -> ");

            history.append(
                    booking.getRide().getDestination()
            );

            history.append("\n");
        }

        String prompt =
                """
                User ride history:
        
                %s
        
                Current source:
                %s
        
                Recommend destinations ONLY from the user's previous travel patterns.
        
                Return ONLY comma separated destination names.
        
                Do not invent new cities.
                """
                        .formatted(
                                history.toString(),
                                request.getCurrentSource()
                        );

        String aiResponse =
                groqService.getRecommendations(prompt);


        String[] destinations =
                aiResponse.split(",");

        List<Ride> recommendations =
                new ArrayList<>();

        for (String destination : destinations) {

            recommendations.addAll(
                    rideRepository
                            .findBySourceIgnoreCaseAndDestinationIgnoreCaseAndAvailableSeatsGreaterThan(
                                    request.getCurrentSource(),
                                    destination.trim(),
                                    0
                            )
            );
        }
        System.out.println("Recommendations Found: "
                + recommendations.size());
        return recommendations;
    }
}