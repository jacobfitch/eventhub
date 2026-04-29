package edu.famu.eventhub.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "weather_records")
public class WeatherRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String city;

    private Double temperature;

    private Double windspeed;

    private LocalDateTime savedAt;

    public WeatherRecord() {
    }

    public WeatherRecord(String city, Double temperature, Double windspeed) {
        this.city = city;
        this.temperature = temperature;
        this.windspeed = windspeed;
        this.savedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public String getCity() {
        return city;
    }

    public Double getTemperature() {
        return temperature;
    }

    public Double getWindspeed() {
        return windspeed;
    }

    public LocalDateTime getSavedAt() {
        return savedAt;
    }
}