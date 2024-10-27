import http from "../../shared/services/http-common.js";

export class BusinessAppointmentApiService {

    /**
     * Fetch company details by company ID
     * @param {number} companyId
     * @returns {Promise<Object|null>} Company data or null if error occurs
     */
    getCompanyById(companyId) {
        return http.get(`/companies/${companyId}`)
            .then(response => response.data)
            .catch(error => {
                console.error(`Error fetching company with id ${companyId}:`, error);
                return null;
            });
    }

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
     * Fetch all appointments
     * @returns {Promise<Array>} Array of appointment objects
     */
    getAppointments() {
        return http.get("/appointments")
            .then(response => response.data)
            .catch(error => {
                console.error("Error fetching appointments:", error);
                return [];
            });
    }

}