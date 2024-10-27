import http from "../../shared/services/http-common.js";

export class BusinessAppointmentApiService {
    async getUserDetails(userId) {
        try {
            const response = await http.get(`/users/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching user details:", error);
            return null;
        }
    }

    async getService(serviceId) {
        try {
            const response = await http.get(`/services/${serviceId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching service:", error);
            return null;
        }
    }

    async getUsersByCompanyId(companyId) {
        try {
            const response = await http.get("/appointments");
            const appointments = response.data.filter(
                (appointment) => appointment.company === companyId
            );

            const userDetailsPromises = appointments.map(async (appointment) => {
                const serviceResponse = await this.getService(appointment.serviceId);
                const userResponse = await this.getUserDetails(appointment.userId);

                if (userResponse) {
                    return {
                        id: userResponse.id,
                        name: userResponse.name,
                        email: userResponse.email,
                        phone: userResponse.phone,
                        address: userResponse.address,
                        serviceName: serviceResponse ? serviceResponse.service_name : "Unknown Service",
                    };
                }
                return null;
            });

            return (await Promise.all(userDetailsPromises)).filter(
                (user) => user !== null
            );
        } catch (error) {
            console.error("Error fetching users for company:", error);
            return [];
        }
    }

}