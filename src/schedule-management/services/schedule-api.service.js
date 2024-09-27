import http from "../../shared/services/http-common.js";

export class ScheduleApiService {
    getSchedules() {
        return http.get('/schedules');
    }

    getSchedulesById(id) {
        return http.get(`schedules/${id}`);
    }

}