import http from "../../shared/services/http-common.js";

export class ScheduleApiService {
    getSchedules() {
        return http.get('/schedules');
    }

    getSchedulesById(id) {
        return http.get(`schedules/${id}`);
    }

    getSchedulesByUserId(userId) {
        return http.get('/schedules')
            .then(response => {
                // Filtrar las citas según el userId
                const userSchedules = response.data.filter(schedule => schedule.userId === userId);
                return userSchedules.length ? userSchedules : [];
            })
            .catch(error => {
                console.error("Error fetching schedules by userId:", error);
                throw error;
            });
    }

}