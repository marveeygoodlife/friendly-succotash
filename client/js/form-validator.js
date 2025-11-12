'use strict'
class FormValidator {
    constructor() {
        this.form = document.getElementById("contactForm");
        this.submitBtn = document.getElementById("formBtn");
        this.successMessage = document.getElementById("successMessage");
        this.loading = document.getElementById("loading");
        this.apiClient = new ApiClient(); 
        this.initializeEvents();
    };
    //vaidate inputs and submit logic
    initializeEvents() {
        this.form.addEventListener("input", (e) => {
            this.validateField(e.target); //validate fields as user types
        });
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.handleSubmit(); // event to handle submit
        });
    };

    //validate form fields 
    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        const errorElement = document.getElementById(`${fieldName}Error`);

        let isValid = true;
        let errorMessage = "";

        switch (fieldName) {
            case 'name':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Name must be at least 2 characters long';
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                };
                break;
            case 'subject':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Please select a subject';
                };
                break;
            case 'message':
                if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Message must be at least 10 characters';
                };
                break;
        };
        this.updateFieldStatus(field, errorElement, isValid, errorMessage);
        return isValid;
    };

    updateFieldStatus(field, errorElement, isValid, errorMessage) {
        if (isValid) {
            field.classList.remove('error-border');
            field.classList.add('valid');
            errorElement.textContent = '';
        } else {
            field.classList.remove('valid');
            field.classList.add("error-border");
            errorElement.textContent = errorMessage;
        }
    }// update field
    validateForm() {
        const fields = this.form.elements;
        let isFormValid = true;
        for (let field of fields) {
            if (field.type !== 'submit') {
                const isValid = this.validateField(field);
                if (!isValid) isFormValid = false;
            }
        }
        return isFormValid;
    };

    async handleSubmit() {
        if (!this.validateForm()) {
            alert("Please fix the errors above before submiting");
            return;
        };

        this.setLoading(true); // may cause  error !!
        
        //get form data, show success message, reset form and clear validation state
        try {
            const formData = new formData(this.form);
            const data = Object.fromEntries(formData.entries());
            const result = await this.apiClient.submitForm(data);
            if (result.success) {
                this.showSuccess();
                this.formReset();
                this.clearValidationStates();
            } else {
                throw new Error(result.data?.message || 'Failed to send message');
            };
        } catch (error) {
            alert(error.message)
        } finally {
            this.setLoading(false)
        };
    };
//set loading state
    setLoading(isLoading) {
        this.submitBtn.disabled = isLoading;
        if (isLoading) {
            this.loading.style.display = 'block';
        } else {
            this.loading.style.display = 'none';
        }
    }
    // show success message
    showSuccess() {
        this.successMessage.style.display = 'block';
        setTimeout(() => {
            this.successMessage.style.display = 'none'
        }, 5000);
    };
//clear states
    clearValidationStates() {
        const fields = this.form.elements;
        for (let field of fields) {
            field.classList.remove('valid', 'error-border')
        };
    };

}//close validator

document.addEventListener("DOMContentLoaded", () => {
    new FormValidator();
});