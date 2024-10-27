import http from "../../shared/services/http-common.js";

export class ServiceApiService {

    /**
     * Get all services
     * @returns {Promise<axios.AxiosResponse<any>>}
     */

    getServices() {
        return http.get('/services');
    }

    /**
     * Get all services by category
     * @param categoryId
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    getServicesByCategory(categoryId) {
        return http.get(`/services/${categoryId}`);
    }


    /**
     * Get a single service by ID
     * @param id
     * @returns {Promise<axios.AxiosResponse<any>>}
     */

    getServiceById(id) {
        return http.get(`/services/${id}`);
    }

    /**
     * Create a new service
     * @param service
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    createService(service) {
        return http.post('/services', service);
    }
}