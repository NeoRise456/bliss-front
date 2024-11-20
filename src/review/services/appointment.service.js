import http from "../../shared/services/http-common.js";

export class AppointmentApiService {
    getAppointmentById(appointmentId) {
        return http.get(`/appointments/${appointmentId}`);
    }

    deleteAppointmentById(appointmentId) {
        return http.delete(`/appointments/${appointmentId}`);
    }

    updateAppointment(appointmentId, appointmentData) {
        return http.put(`/appointments/${appointmentId}`, appointmentData);
    }

    getAppointmentsByUserId(userId) {
        return http.get(`/appointments/user/${userId}`);
    }

    createAppointment(appointmentData) {
        return http.post('/appointments', appointmentData);
    }
}