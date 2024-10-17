import http from "../../shared/services/http-common.js";
import {ServiceApiService} from "../../shared/services/http-common.js";
export class HistoryApiService{
    getCompanyId(id){
        return http.get(`/company/${id}`);
    }
    getService(id) {
        return http.get(`/services/${id}`);
    }
    getCompletedAppointmentsByUserId(userId) {
        return http.get('/appointments')
            .then(response => {
                // Filtrar las citas según el userId y el status "completed"
                const completedAppointments = response.data.filter(appointment =>
                    appointment.userId === userId && appointment.status === "completed"
                );

                // Obtener información adicional para cada cita completada
                const appointmentDetailsPromises = completedAppointments.map(async appointment => {
                    const serviceResponse = await this.getService(appointment.serviceId);
                    const companyResponse = await this.getCompanyId(appointment.company);

                    return {
                        serviceName: serviceResponse.data.service_name,
                        companyName: companyResponse.data.name,
                        appointmentDate: appointment.schedule.date
                    };
                });

                return Promise.all(appointmentDetailsPromises);
            })
            .catch(error => {
                console.error("Error fetching completed appointments by userId:", error);
                throw error;
            });
    }

}
