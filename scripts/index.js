let profile = document.querySelector('.profile');
let profileEdit = profile.querySelector('.profile__edit-button');
let profileName = profile.querySelector('.profile__name');
let profileStatus = profile.querySelector('.profile__status');

let popup = document.querySelector('.popup');
let popupClose = popup.querySelector('.popup__close-button');

let form = document.querySelector('.form');
let formName = form.querySelector('.form__text_type_name');
let formStatus = form.querySelector('.form__text_type_status');

function popupOpenFun() {
    popup.classList.add('popup_opened')
    formName.value = profileName.textContent;
    formStatus.value = profileStatus.textContent;
};

function popupCloseFun() {
    popup.classList.remove('popup_opened')
};

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = formName.value;
    profileStatus.textContent = formStatus.value;
    popupCloseFun();
};

profileEdit.addEventListener('click', popupOpenFun);

popupClose.addEventListener('click', popupCloseFun);

form.addEventListener('submit', handleFormSubmit);