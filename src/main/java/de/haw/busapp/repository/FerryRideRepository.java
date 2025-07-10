package de.haw.busapp.repository;

import de.haw.busapp.model.FerryRide;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FerryRideRepository extends JpaRepository<FerryRide, Long> {
}