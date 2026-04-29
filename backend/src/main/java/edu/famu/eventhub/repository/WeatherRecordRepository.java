package edu.famu.eventhub.repository;

import edu.famu.eventhub.model.WeatherRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WeatherRecordRepository extends JpaRepository<WeatherRecord, Long> {
}