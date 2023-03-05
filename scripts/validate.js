const config = {
    formSelector: '.form',
    inputSelector: '.form__text',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_inactive',
    inputErrorClass: 'form__text_type_error',
    errorClass: 'form__text-error_active'
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
};
const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
};
const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
        hideInputError(formElement, inputElement, config);
    }
};
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};
const toggleButtonState = (inputList, buttonElement, config) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(config.inactiveButtonClass);
        buttonElement.setAttribute("disabled", "disabled");
    } else {
        buttonElement.classList.remove(config.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
};
const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, config);
    formElement.addEventListener('reset', () => {
        setTimeout(() => {
            toggleButtonState(inputList, buttonElement, config);
        }, 0);
    });
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement);
            toggleButtonState(inputList, buttonElement, config);
        });
    });
};
const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, config);
    });
};
enableValidation(config);