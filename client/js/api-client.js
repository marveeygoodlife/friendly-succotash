'use strict'
// API communication between front end and backend

class ApiClient {
    constructor() {
        // Allow an explicit API base URL to be injected (useful when
        // frontend and backend are deployed to different origins).
        // If not provided, use a relative path so requests go to the
        // same origin that served the page (covers single-service deploys).
        this.baseURL = (window.__API_BASE_URL__ && window.__API_BASE_URL__.replace(/\/$/, '')) || '';
        console.log("API BASE URL:", this.baseURL || '(relative)')
    };

    async submitForm(formData) {
        try {
            //send form data to server
            const response = await fetch(`${this.baseURL}/api/submit-form`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json', },
                body: JSON.stringify(formData)
            });
            // handle network error issues
            const result = await response.json();
            return {
                success: response.ok,
                data: result,
                status: response.status
            };
        } catch (error) {
            //send standard error response
            console.error('API Request Failed:', error)
            return {
                success: false,
                error: 'Network error: Unable to connect to server',
                status: 0
            };
        };
    };
};