package com.project.raahione.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class GroqService {

    private final RestTemplate restTemplate;

    @Value("${groq.api.key}")
    private String apiKey;

    @Value("${groq.api.url}")
    private String apiUrl;

    public GroqService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String getRecommendations(String prompt) {

        HttpHeaders headers = new HttpHeaders();

        headers.setBearerAuth(apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = Map.of(
                "model", "llama-3.3-70b-versatile",
                "messages", List.of(
                        Map.of(
                                "role", "user",
                                "content", prompt
                        )
                )
        );

        HttpEntity<Map<String, Object>> entity =
                new HttpEntity<>(body, headers);

        ResponseEntity<Map> response =
                restTemplate.postForEntity(
                        apiUrl,
                        entity,
                        Map.class
                );

        List choices =
                (List) response.getBody().get("choices");

        Map choice =
                (Map) choices.get(0);

        Map message =
                (Map) choice.get("message");

        return message.get("content").toString();
    }
}