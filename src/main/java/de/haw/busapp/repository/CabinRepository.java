package de.haw.busapp.repository;

import de.haw.busapp.model.Cabin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CabinRepository extends JpaRepository<Cabin, Long> {
}