package org.hack337.gptchat.service;

import org.hack337.gptchat.dto.GptApiResponse;
import org.hack337.gptchat.dto.GptRequest;
import org.hack337.gptchat.dto.GptResponse;
import org.hack337.gptchat.entity.Message;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono; // Import Mono

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class GptService {

    private final WebClient webClient;
    private final String gptApiUrl;
    private final String gptModel;

    // Inject properties using constructor injection
    public GptService(WebClient.Builder webClientBuilder,
                      @Value("${gpt.api.url}") String gptApiUrl,
                      @Value("${gpt.model}") String gptModel) {
        this.webClient = webClientBuilder.baseUrl(gptApiUrl).build();
        this.gptApiUrl = gptApiUrl; // Store if needed elsewhere, though baseUrl is set
        this.gptModel = gptModel;
    }

    public Mono<String> getGptResponse(List<Message> chatHistory) {
        if (chatHistory.isEmpty()) {
            return Mono.error(new IllegalArgumentException("Chat history cannot be empty for GPT request"));
        }

        // Convert entity Messages to DTO MessagePayloads
        List<GptRequest.MessagePayload> messagePayloads = chatHistory.stream()
                .map(msg -> new GptRequest.MessagePayload(
                        msg.getRole().name().toLowerCase(), // Convert enum to lowercase string
                        msg.getContent()))
                .collect(Collectors.toList());

        GptRequest gptRequest = new GptRequest(gptModel, messagePayloads);

        log.debug("Sending request to GPT API: {}", gptRequest);

        return webClient.post()
                // .uri(gptApiUrl) // Assuming baseUrl includes the full path like http://api.onlysq.ru/ai/v2
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(gptRequest)
                .retrieve()
                // Expect the new response structure
                .bodyToMono(GptApiResponse.class)
                // Extract content using the helper method or direct navigation
                .map(apiResponse -> {
                    String content = apiResponse.getFirstChoiceContent();
                    if (content == null) {
                        // Throw an exception or return an error indicator if content is missing
                        throw new GptApiException("Failed to extract content from GPT response.");
                    }
                    return content;
                })
                .doOnSuccess(responseContent -> log.debug("Received and extracted GPT response content."))
                .doOnError(error -> {
                    if (error instanceof WebClientResponseException webEx) {
                        log.error("Error calling GPT API: Status {}, Body {}", webEx.getStatusCode(), webEx.getResponseBodyAsString(), webEx);
                    } else {
                        log.error("Error calling GPT API: {}", error.getMessage(), error);
                    }
                    // Consider mapping to a specific application exception
                })
                // Add more robust error handling as needed
                .onErrorResume(WebClientResponseException.class, ex ->
                        Mono.error(new GptApiException("GPT API request failed with status " + ex.getStatusCode(), ex))
                )
                .onErrorResume(Exception.class, ex ->
                        Mono.error(new GptApiException("Failed to process GPT response.", ex))
                );
    }
    public static class GptApiException extends RuntimeException {
        public GptApiException(String message) {
            super(message);
        }
        public GptApiException(String message, Throwable cause) {
            super(message, cause);
        }
    }

}