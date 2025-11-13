'use strict';

class FormValidator {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitBtn = document.getElementById('formBtn');
        this.successMessage = document.getElementById('successMessage');
        this.loading = document.getElementById('loading');
        this.apiClient = new ApiClient();

        if (!this.form) {
            // Nothing to do if the form is not present
            console.warn('contactForm not found in DOM — FormValidator disabled.');
            return;
        }

        this.initializeEvents();
    }

    // attach event listeners
    initializeEvents() {
        this.form.addEventListener('input', (e) => {
            this.validateField(e.target);
        });
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    // validate a single field; returns true when valid
    validateField(field) {
        if (!field || !field.name) return true;

        const value = (field.value || '').trim();
        const fieldName = field.name;
        const errorElement = document.getElementById(`${fieldName}Error`);

        let isValid = true;
        let errorMessage = '';

        switch (fieldName) {
            case 'name':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Name must be at least 2 characters long';
                }
                break;
            case 'email': {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            }
            case 'subject':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Please select a subject';
                }
                break;
            case 'message':
                if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Message must be at least 10 characters';
                }
                break;
        }

        this.updateFieldStatus(field, errorElement, isValid, errorMessage);
        return isValid;
    }

    updateFieldStatus(field, errorElement, isValid, errorMessage) {
        if (isValid) {
            field.classList.remove('error-border');
            field.classList.add('valid');
            if (errorElement) errorElement.textContent = '';
            field.removeAttribute('aria-invalid');
            field.removeAttribute('data-error-message');
        } else {
            field.classList.remove('valid');
            field.classList.add('error-border');
            if (errorElement) {
                errorElement.textContent = errorMessage;
            } else {
                // Fallback accessible attributes when no error container exists
                field.setAttribute('aria-invalid', 'true');
                field.setAttribute('data-error-message', errorMessage);
            }
        }
    }

    validateForm() {
        const fields = this.form.elements;
        let isFormValid = true;
        for (let field of fields) {
            // skip buttons, disabled fields and unnamed elements
            if (field.type === 'submit' || field.disabled || !field.name) continue;
            const isValid = this.validateField(field);
            if (!isValid) isFormValid = false;
        }
        return isFormValid;
    }

    async handleSubmit() {
        if (!this.validateForm()) {
            alert('Please fix the errors above before submitting');
            return;
        }

        this.setLoading(true);

        try {
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData.entries());
            const result = await this.apiClient.submitForm(data);
            if (result.success) {
                this.showSuccess();
                // reset the native form
                this.form.reset();
                this.clearValidationStates();
            } else {
                throw new Error(result.data?.message || 'Failed to send message');
            }
        } catch (error) {
            alert(error.message);
        } finally {
            this.setLoading(false);
        }
    }

    // set loading state for submit
    setLoading(isLoading) {
        if (this.submitBtn) this.submitBtn.disabled = isLoading;
        if (!this.loading) return;
        this.loading.style.display = isLoading ? 'block' : 'none';
    }

    showSuccess() {
        if (!this.successMessage) return;
        this.successMessage.style.display = 'block';
        setTimeout(() => {
            this.successMessage.style.display = 'none';
        }, 5000);
    }

    clearValidationStates() {
        const fields = this.form.elements;
        for (let field of fields) {
            field.classList.remove('valid', 'error-border');
            field.removeAttribute('aria-invalid');
            field.removeAttribute('data-error-message');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new FormValidator();
});