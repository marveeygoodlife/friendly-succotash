'use strict'
// API communication between front end and backend

class ApiClient {
    constructor() {
        this.baseURL = window.location.origin;// use current domain
        console.log("API BASE URL:", this.baseURL)
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