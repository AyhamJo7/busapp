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

    // Explicit getter methods
    public Long getId() {
        return id;
    }

    public Harbor getOriginHarbor() {
        return originHarbor;
    }

    public Harbor getDestinationHarbor() {
        return destinationHarbor;
    }

    // Setter methods
    public void setId(Long id) {
        this.id = id;
    }

    public void setOriginHarbor(Harbor originHarbor) {
        this.originHarbor = originHarbor;
    }

    public void setDestinationHarbor(Harbor destinationHarbor) {
        this.destinationHarbor = destinationHarbor;
    }

    @Override
    public String toString() {
        return originHarbor.getName() + " → " + destinationHarbor.getName();
    }

}
