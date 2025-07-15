package de.haw.busapp.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "origin_harbor_id")
    private Harbor originHarbor;

    @ManyToOne
    @JoinColumn(name = "destination_harbor_id")
    private Harbor destinationHarbor;

    @Override
    public String toString() {
        return originHarbor.getName() + " → " + destinationHarbor.getName();
    }

}