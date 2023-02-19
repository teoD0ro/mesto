const profile = document.querySelector('.profile');
const profileEdit = profile.querySelector('.profile__edit-button');
const profileAdd = profile.querySelector('.profile__add-button');
const profileName = profile.querySelector('.profile__name');
const profileStatus = profile.querySelector('.profile__status');

const popup = document.querySelector('.popup');
const profileEditorPopup = document.querySelector('#profile_editor_popup');
const addCardPopup = document.querySelector('#add_card_popup');
const imagePopup = document.querySelector('#image_popup');
const popupImage = imagePopup.querySelector('.popup__image');
const popupSubtitle = imagePopup.querySelector('.popup__subtitle');

const form = document.querySelector('.form');
const profileEditorForm = document.getElementsByName('profile_editor_form')[0];
const addCardForm = document.getElementsByName('add_card_form')[0];
const formProfileName = document.getElementsByName('name')[0];
const formProfileStatus = document.getElementsByName('status')[0];

const place = document.querySelector('.place');
const placeCardTemplate = document.querySelector('#place__card-template').content;


function profileEditorPopupOpenFun() {
    profileEditorPopup.classList.add('popup_opened')
    let popupOpened = document.querySelector('.popup_opened');
    let popupCloseButton = popupOpened.querySelector('.popup__close-button');
    formProfileName.value = profileName.textContent;
    formProfileStatus.value = profileStatus.textContent;
    popupCloseButton.addEventListener('click', popupCloseFun);
};

function addCardPopupOpenFun() {
    addCardPopup.classList.add('popup_opened');
    let popupOpened = document.querySelector('.popup_opened');
    let popupCloseButton = popupOpened.querySelector('.popup__close-button');
    popupCloseButton.addEventListener('click', popupCloseFun);
};

function popupCloseFun() {
    let popupOpened = document.querySelector('.popup_opened');
    popupOpened.classList.remove('popup_opened');
};

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = formProfileName.value;
    profileStatus.textContent = formProfileStatus.value;
    popupCloseFun();
};

function addCardFormSubmit(evt) {
    evt.preventDefault();
    const placeCardElement = placeCardTemplate.querySelector('.place__card').cloneNode(true);
    placeCardElement.querySelector('.place__image').src = document.getElementsByName('link')[0].value;
    placeCardElement.querySelector('.place__name').textContent = document.getElementsByName('title')[0].value;
    place.prepend(placeCardElement);
    place.querySelector('.place__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('place__like-button_active');
    });
    place.querySelector('.place__delete-button').addEventListener('click', function () {
        placeCardElement.remove();
    });
    place.querySelector('.place__image').addEventListener('click', function () {
        imagePopup.classList.add('popup_opened');
        let popupOpened = document.querySelector('.popup_opened');
        let popupCloseButton = popupOpened.querySelector('.popup__close-button');
        popupImage.src = placeCardElement.querySelector('.place__image').src;
        popupSubtitle.textContent = placeCardElement.querySelector('.place__name').textContent;
        popupCloseButton.addEventListener('click', popupCloseFun);
    });
    popupCloseFun();
};

profileEdit.addEventListener('click', profileEditorPopupOpenFun);
profileAdd.addEventListener('click', addCardPopupOpenFun);
profileEditorForm.addEventListener('submit', handleFormSubmit);
addCardForm.addEventListener('submit', addCardFormSubmit);


const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
initialCards.forEach((item) => {
    const placeCardElement = placeCardTemplate.querySelector('.place__card').cloneNode(true);
    let placeImage = placeCardElement.querySelector('.place__image').src;
    let placeName = placeCardElement.querySelector('.place__name').textContent;
    placeCardElement.querySelector('.place__image').src = item.link;
    placeCardElement.querySelector('.place__name').textContent = item.name;
    place.prepend(placeCardElement);
    place.querySelector('.place__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('place__like-button_active');
    });
    place.querySelector('.place__delete-button').addEventListener('click', function () {
        placeCardElement.remove();
    });
    place.querySelector('.place__image').addEventListener('click', function () {
        imagePopup.classList.add('popup_opened');
        let popupOpened = document.querySelector('.popup_opened');
        let popupCloseButton = popupOpened.querySelector('.popup__close-button');
        popupImage.src = placeCardElement.querySelector('.place__image').src;
        popupSubtitle.textContent = placeCardElement.querySelector('.place__name').textContent;
        popupCloseButton.addEventListener('click', popupCloseFun);
    });
});

// console.log(placeLikeButton.className);