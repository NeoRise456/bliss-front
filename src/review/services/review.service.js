import http from "../../shared/services/http-common.js";
import { ServiceApiService } from "../../service-management/services/service-api.service.js";
import {Appointment} from "../../appointment-management/model/appointment.entity.js";
export class ReviewApiService extends ServiceApiService {
    constructor() {
        super();
    }


    getReviewByReservationId(appointmentId) {
        return http.get(`/reviews/appointment/${appointmentId}`);
    }

    getReviewByCompanyId(companyId) {
        return http.get(`/reviews/company/${companyId}`);
    }

    getReviewByUserId(userId) {
        return http.get(`/reviews/user/${userId}`);
    }
    getReviewById(reviewId) {
        return http.get(`/reviews/${reviewId}`);
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
  
    getReviewByAppointmentId(appointmentId) {
        return http.get(`/reviews?appointmentId=${appointmentId}`);
    }
}