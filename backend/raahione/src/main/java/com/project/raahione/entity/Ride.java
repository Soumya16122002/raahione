package com.project.raahione.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Ride {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String source;

    private String destination;

    private String departureTime;

    private Integer availableSeats;

    @ManyToOne
    @JoinColumn(name = "driver_id")
    private User driver;
}