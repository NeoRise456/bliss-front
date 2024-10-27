import http from "../../shared/services/http-common.js";

export class BusinessAppointmentApiService {
    getUsers() {
        return http.get('/users');
    }

    getUserById(id) {
        return http.get(`users/${id}`);
    }

}