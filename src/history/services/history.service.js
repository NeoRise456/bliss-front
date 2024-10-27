import http from "../../shared/services/http-common.js";

import {ServiceApiService} from "../../service-management/services/service-api.service.js";

export class HistoryApiService {
    constructor() {
        this.serviceApiService = new ServiceApiService();

    }


    async getCompletedAppointmentsByUserId(userId) {
        try {
            const response = await http.get('/appointments');
            const appointments = response.data.filter(appointment => appointment.userId === userId && appointment.status === "COMPLETED");

            const appointmentDetailsPromises = appointments.map(async appointment => {
                const serviceResponse = await this.serviceApiService.getService(appointment.serviceId);
                const companyResponse = await this.serviceApiService.getCompany(appointment.companyId);
              const reviewResponse = await http.get(`/reviews?appointmentId=${appointment.id}`);

                return {
                    ...appointment,
                    serviceName: serviceResponse.data.service_name,
                    companyName: companyResponse.data.name,
                    appointmentDate: appointment.date,
                    review: reviewResponse.data.length > 0 ? reviewResponse.data[0] : null

                };
            });

            return await Promise.all(appointmentDetailsPromises);
        } catch (error) {
            console.error('Error fetching completed appointments:', error);
            throw error;
        }
    }
}