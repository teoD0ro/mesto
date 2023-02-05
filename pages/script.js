let profile = document.querySelector('.profile');
let profileEdit = profile.querySelector('.profile__edit-button');
let profileName = profile.querySelector('.profile__name');
let profileStatus = profile.querySelector('.profile__status');

let popup = document.querySelector('.popup');
let popupContainer = popup.querySelector('.popup__container');
let popupClose = popup.querySelector('.popup__close-button');
let popupName = popup.querySelector('.popup__text_type_name');
let popupStatus = popup.querySelector('.popup__text_type_status');


function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileStatus.textContent = popupStatus.value;
    popup.classList.remove('popup_opened')
}

profileEdit.addEventListener('click', function () {
    popup.classList.add('popup_opened')
    popupName.value = profileName.textContent;
    popupStatus.value = profileStatus.textContent;
})
popupClose.addEventListener('click', function () {
    popup.classList.remove('popup_opened')
})

popupContainer.addEventListener('submit', handleFormSubmit);

console.log(popupContainer.className);
