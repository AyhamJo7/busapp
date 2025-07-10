package de.haw.busapp.repository;

import de.haw.busapp.model.Harbor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HarborRepository extends JpaRepository<Harbor, Long> {
}