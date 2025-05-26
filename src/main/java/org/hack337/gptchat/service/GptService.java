package org.hack337.gptchat.service;

import org.hack337.gptchat.dto.GptApiResponse;
import org.hack337.gptchat.dto.GptRequest;
import org.hack337.gptchat.entity.Message;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class GptService {

    private final WebClient webClient;
    private final String gptModel;
    private final String apiKey;

    public GptService(WebClient.Builder webClientBuilder,
                      @Value("${gpt.api.url}") String gptApiUrl,
                      @Value("${gpt.model}") String gptModel,
                      @Value("${gpt.api.key}") String apiKey) {
        this.webClient = webClientBuilder
                .baseUrl(gptApiUrl)
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                .build();
        this.gptModel = gptModel;
        this.apiKey = apiKey;
    }

    public Mono<String> getGptResponse(List<Message> chatHistory) {
        if (chatHistory.isEmpty()) {
            return Mono.error(new IllegalArgumentException("Chat history cannot be empty for GPT request"));
        }

        List<GptRequest.MessagePayload> messagePayloads = chatHistory.stream()
                .map(msg -> new GptRequest.MessagePayload(
                        msg.getRole().name().toLowerCase(), // Convert enum to lowercase string
                        msg.getContent()))
                .collect(Collectors.toList());

        GptRequest gptRequest = new GptRequest(gptModel, messagePayloads);

        log.debug("Sending request to GPT API (model: {})", gptModel);

        return webClient.post()
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(gptRequest)
                .retrieve()
                .bodyToMono(GptApiResponse.class)
                .map(apiResponse -> {
                    String content = apiResponse.getFirstChoiceContent();
                    if (content == null) {
                        log.warn("Received GPT response, but content was missing. Response: {}", apiResponse);
                        throw new GptApiException("Failed to extract content from GPT response.");
                    }
                    log.debug("Received and extracted GPT response content.");
                    return content;
                })
                .doOnError(error -> {
                    if (error instanceof WebClientResponseException webEx) {
                        log.error("Error calling GPT API: Status {}, Body: '{}'", webEx.getStatusCode(), webEx.getResponseBodyAsString(), webEx);
                    } else if (error instanceof GptApiException) {
                        log.error("GPT API processing error: {}", error.getMessage()); // Avoid logging stack trace twice
                    }
                    else {
                        log.error("Unexpected error during GPT API call: {}", error.getMessage(), error);
                    }
                })
                .onErrorMap(WebClientResponseException.class, ex ->
                        new GptApiException("GPT API request failed with status " + ex.getStatusCode() + ". Check API key and request format.", ex)
                )
                .onErrorMap(Exception.class, ex -> {
                    if (ex instanceof GptApiException) {
                        return ex;
                    }
                    return new GptApiException("Failed to process GPT response.", ex);
                });
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