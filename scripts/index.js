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
    popup.classList.remove('popup_opened')
}

document.querySelectorAll('.popup').forEach(function (item) {
    item.querySelector('.popup__close-button').addEventListener('click', () => closePopup(item));
});

function openProfilePopup() {
    console.log(profileName.textContent);
    formProfileName.value = profileName.textContent;
    formProfileStatus.value = profileStatus.textContent;
};

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = formProfileName.value;
    profileStatus.textContent = formProfileStatus.value;
    closePopup(profileEditorPopup);
};

function createCard(item) {
    const cardElements = [];
    item.forEach((item) => {
        const placeCardElement = placeCardTemplate.querySelector('.place__card').cloneNode(true);
        const placeCardImage = placeCardElement.querySelector('.place__image');
        const placeCardName = placeCardElement.querySelector('.place__name');
        placeCardImage.src = item.link;
        placeCardImage.alt = item.name;
        placeCardName.textContent = item.name;
        placeCardElement.querySelector('.place__like-button').addEventListener('click', function (evt) {
            evt.target.classList.toggle('place__like-button_active');
        });
        placeCardElement.querySelector('.place__delete-button').addEventListener('click', function () {
            placeCardElement.remove();
        });
        placeCardImage.addEventListener('click', function () {
            imagePopup.classList.add('popup_opened');
            popupImage.src = placeCardImage.src;
            popupSubtitle.textContent = placeCardName.textContent;
        });
        cardElements.push(placeCardElement);
    });
    return cardElements;
}

function addCard(item) {
    item.forEach(function (item) {
        place.prepend(item);
    });
}

function SubmitCardForm(evt) {
    evt.preventDefault();
    const placeCardArguments = [
        {
            name: document.querySelector('#title').value,
            link: document.querySelector('#link').value
        }
    ];
    addCard(createCard(placeCardArguments));
    closePopup(addCardPopup);
    evt.target.reset()
};

profileEdit.addEventListener('click', openProfilePopup);
profileEdit.addEventListener('click', () => openPopup(profileEditorPopup));
profileAdd.addEventListener('click', () => openPopup(addCardPopup));
profileEditorForm.addEventListener('submit', handleProfileFormSubmit);
addCardForm.addEventListener('submit', SubmitCardForm);


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

addCard(createCard(initialCards));
