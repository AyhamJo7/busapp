package de.haw.busapp.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Harbor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String location;
}