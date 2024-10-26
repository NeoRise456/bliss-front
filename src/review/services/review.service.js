// src/review/services/review.service.js
import http from "../../shared/services/http-common.js";
import { ServiceApiService } from "../../service-management/services/service-api.service.js";

export class ReviewApiService extends ServiceApiService {
    constructor() {
        super();
    }

    getReviewByReservationId(appointmentId) {
        return http.get(`/reviews?appointmentId=${appointmentId}`);
    }

    deleteReview(reviewId) {
        return http.delete(`/reviews/${reviewId}`);
    }

    createReview(reviewData) {
        return http.post('/reviews', reviewData);
    }
    updateReview(reviewId, reviewData) {
        return http.put(`/reviews/${reviewId}`, reviewData);
    }
}