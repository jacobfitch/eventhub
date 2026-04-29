package edu.famu.eventhub.controller;

import edu.famu.eventhub.model.WeatherRecord;
import edu.famu.eventhub.repository.WeatherRecordRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/weather")
@CrossOrigin(origins = "http://localhost:5173")
public class WeatherController {

    private final WeatherRecordRepository weatherRecordRepository;

    public WeatherController(WeatherRecordRepository weatherRecordRepository) {
        this.weatherRecordRepository = weatherRecordRepository;
    }

    @GetMapping
    public Map<String, Object> getWeather() {
        String city = "Tallahassee";

        String url = "https://api.open-meteo.com/v1/forecast"
                + "?latitude=30.4383"
                + "&longitude=-84.2807"
                + "&current_weather=true";

        RestTemplate restTemplate = new RestTemplate();

        try {
            Map response = restTemplate.getForObject(url, Map.class);
            Map currentWeather = (Map) response.get("current_weather");

            Double temperature = Double.valueOf(currentWeather.get("temperature").toString());
            Double windspeed = Double.valueOf(currentWeather.get("windspeed").toString());

            WeatherRecord record = new WeatherRecord(city, temperature, windspeed);
            weatherRecordRepository.save(record);

            Map<String, Object> result = new HashMap<>();
            result.put("city", city);
            result.put("temperature", temperature);
            result.put("windspeed", windspeed);
            result.put("message", "Weather data retrieved and saved successfully.");

            return result;

        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("city", city);
            error.put("message", "Weather data is currently unavailable. Please try again later.");
            return error;
        }
    }
}