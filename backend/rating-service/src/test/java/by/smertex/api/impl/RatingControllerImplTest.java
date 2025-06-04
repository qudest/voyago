package by.smertex.api.impl;

import by.smertex.core.dto.AverageRatingDto;
import by.smertex.core.dto.RatingDto;
import by.smertex.core.dto.RatingUserDto;
import by.smertex.core.service.RatingService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(RatingControllerImpl.class)
class RatingControllerImplTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private RatingService ratingService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void getRating_whenRouteIdIsValid_shouldReturnAverageRatingDto() throws Exception {
        Long routeId = 1L;
        AverageRatingDto expectedDto = new AverageRatingDto(routeId, 4.5f);
        when(ratingService.getAverageRating(routeId)).thenReturn(expectedDto);

        mockMvc.perform(get("/api/ratings/{routeId}", routeId))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.routeId").value(routeId))
                .andExpect(jsonPath("$.averageRating").value(4.5f));

        verify(ratingService).getAverageRating(routeId);
    }

    @Test
    void getRatings_whenRouteIdsListIsEmpty_shouldReturnEmptyMap() throws Exception {
        List<Long> routeIds = Collections.emptyList();
        Map<Long, Float> expectedMap = Collections.emptyMap();
        when(ratingService.getAverageRatings(routeIds)).thenReturn(expectedMap);

        mockMvc.perform(put("/api/ratings")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(routeIds)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json("{}"));

        verify(ratingService).getAverageRatings(routeIds);
    }


    @Test
    void getRatingByUserId_whenRatingUserDtoIsValid_shouldReturnRatingDto() throws Exception {
        RatingUserDto ratingUserDto = new RatingUserDto(1L, 100L);
        RatingDto expectedDto = new RatingDto(1L, 5);
        when(ratingService.getRatingByUserId(ratingUserDto)).thenReturn(expectedDto);

        mockMvc.perform(put("/api/ratings/get")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(ratingUserDto)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.routeId").value(1L))
                .andExpect(jsonPath("$.rating").value(5));

        verify(ratingService).getRatingByUserId(ratingUserDto);
    }

    @Test
    void create_whenRatingDtoIsValid_shouldReturnCreatedRatingDto() throws Exception {
        Long userId = 100L;
        RatingDto ratingDto = new RatingDto(1L, 4);
        RatingDto expectedDto = new RatingDto(1L, 4);
        when(ratingService.create(eq(userId), any(RatingDto.class))).thenReturn(expectedDto);

        mockMvc.perform(post("/api/ratings")
                        .param("userId", String.valueOf(userId))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(ratingDto)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.routeId").value(1L))
                .andExpect(jsonPath("$.rating").value(4));

        verify(ratingService).create(eq(userId), any(RatingDto.class));
    }

    @Test
    void create_whenRatingIsLessThanMin_shouldReturnBadRequest() throws Exception {
        Long userId = 100L;
        RatingDto ratingDto = new RatingDto(1L, 0); // Rating less than @Min(1)

        mockMvc.perform(post("/api/ratings")
                        .param("userId", String.valueOf(userId))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(ratingDto)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void create_whenRatingIsGreaterThanMax_shouldReturnBadRequest() throws Exception {
        Long userId = 100L;
        RatingDto ratingDto = new RatingDto(1L, 6); // Rating greater than @Max(5)

        mockMvc.perform(post("/api/ratings")
                        .param("userId", String.valueOf(userId))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(ratingDto)))
                .andExpect(status().isBadRequest());
    }


    @Test
    void update_shouldCallServiceAndUpdateAverageRating() throws Exception {
        mockMvc.perform(patch("/api/ratings"))
                .andExpect(status().isOk());

        verify(ratingService).updateAverageRating();
    }
}