const profile = document.querySelector('.profile');
const profileEdit = profile.querySelector('.profile__edit-button');
const profileAdd = profile.querySelector('.profile__add-button');
const profileName = profile.querySelector('.profile__name');
const profileStatus = profile.querySelector('.profile__status');

const profileEditorPopup = document.querySelector('#profile_editor_popup');
const addCardPopup = document.querySelector('#add_card_popup');
const imagePopup = document.querySelector('#image_popup');
const popupImage = imagePopup.querySelector('.popup__image');
const popupSubtitle = imagePopup.querySelector('.popup__subtitle');
const popupTitle = document.querySelector('#title');
const popupLink = document.querySelector('#link');

const profileEditorForm = document.forms.profile_editor_form;
const addCardForm = document.forms.add_card_form;
const formProfileName = document.querySelector('#name');
const formProfileStatus = document.querySelector('#status');

const place = document.querySelector('.place');
const placeCardTemplate = document.querySelector('#place__card-template').content;


function openPopup(popup) {
    popup.classList.add('popup_opened');
}
function closePopup(popup) {
    const popupForm = popup.querySelector('.form');
    if (popupForm !== null) {
        const inputList = Array.from(popupForm.querySelectorAll('.form__text'));
        inputList.forEach((inputElement) => {
            const errorElement = popupForm.querySelector(`.${inputElement.id}-error`);
            inputElement.classList.remove('form__text_type_error');
            errorElement.classList.remove('form__text-error_active');
            errorElement.textContent = '';
        });
        popupForm.reset();
    }
    popup.classList.remove('popup_opened')
}
function fillProfileFields() {
    formProfileName.value = profileName.textContent;
    formProfileStatus.value = profileStatus.textContent;
};
fillProfileFields()
function openProfilePopup() {
    fillProfileFields()
    openPopup(profileEditorPopup);
};
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = formProfileName.value;
    profileStatus.textContent = formProfileStatus.value;
    closePopup(profileEditorPopup);
};
function createCard(name, link) {
    const placeCardElement = placeCardTemplate.querySelector('.place__card').cloneNode(true);
    const placeCardImage = placeCardElement.querySelector('.place__image');
    const placeCardName = placeCardElement.querySelector('.place__name');
    placeCardImage.src = link;
    placeCardImage.alt = name;
    placeCardName.textContent = name;
    placeCardElement.querySelector('.place__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('place__like-button_active');
    });
    placeCardElement.querySelector('.place__delete-button').addEventListener('click', function () {
        placeCardElement.remove();
    });
    placeCardImage.addEventListener('click', function () {
        openPopup(imagePopup);
        popupImage.src = placeCardImage.src;
        popupImage.alt = placeCardName.textContent;
        popupSubtitle.textContent = placeCardName.textContent;
    });
    return placeCardElement;
}
function addCard(item) {
    place.prepend(item);
}
function submitCardForm(evt) {
    evt.preventDefault();
    addCard(createCard(popupTitle.value, popupLink.value));
    closePopup(addCardPopup);
    evt.target.reset()
};
const enableClose = () => {
    popups = document.querySelectorAll('.popup');
    popups.forEach(function (item) {
        item.addEventListener('click', function (evt) {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
                closePopup(item);
            }
        });
        document.addEventListener('keydown', function (evt) {
            if (evt.key === "Escape") {
                closePopup(item);
            }
        });
    });
};
enableClose();

profileEdit.addEventListener('click', openProfilePopup);
profileAdd.addEventListener('click', () => openPopup(addCardPopup));
profileEditorForm.addEventListener('submit', handleProfileFormSubmit);
addCardForm.addEventListener('submit', submitCardForm);

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
    addCard(createCard(item.name, item.link));
});
