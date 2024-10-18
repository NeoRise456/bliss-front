import http from "../../shared/services/http-common.js";
import { Appointment } from "../model/appointment.entity.js";

export class HistoryApiService {
    async getCompanyId(id) {
        return http.get(`/companies/${id}`);
    }

    async getService(id) {
        return http.get(`/services/${id}`);
    }


}