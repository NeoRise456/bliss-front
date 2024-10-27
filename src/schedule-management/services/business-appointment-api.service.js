import http from "../../shared/services/http-common.js";

export class BusinessAppointmentApiService {


    /**
     * Fetch user details by user ID
     * @param {number} userId
     * @returns {Promise<Object|null>} User data or null if error occurs
     */
    getUserById(userId) {
        return http.get(`/users/${userId}`)
            .then(response => response.data)
            .catch(error => {
                console.error("Error fetching user details:", error);
                return null;
            });
    }

    /**
     * Fetch service details by service ID
     * @param {number} serviceId
     * @returns {Promise<Object|null>} Service data or null if error occurs
     */
    getServiceById(serviceId) {
        return http.get(`/services/${serviceId}`)
            .then(response => response.data)
            .catch(error => {
                console.error("Error fetching service:", error);
                return null;
            });
    }

    /**
     * Fetch users by company ID, filtering based on appointments
     * @param {number} companyId
     * @returns {Promise<Array>} Array of user details including service names
     */
    async getUsersByCompanyId(companyId) {
        try {
            const response = await http.get("/appointments");
            const appointments = response.data.filter(
                appointment => appointment.company === companyId
            );

            const userDetailsPromises = appointments.map(async appointment => {
                const serviceResponse = await this.getServiceById(appointment.serviceId);
                const userResponse = await this.getUserById(appointment.userId);

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

            return (await Promise.all(userDetailsPromises)).filter(user => user !== null);
        } catch (error) {
            console.error("Error fetching users for company:", error);
            return [];
        }
    }

}