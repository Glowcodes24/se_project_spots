import "./index.css";

import {
  enableValidation,
  settings,
  resetValidation,
  disabledButton,
} from "../scripts/validation.js";

import { setButtonText } from "../utils/helpers.js";

import Api from "../utils/Api.js";

const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "69bbaa67-0642-4381-a3c9-5ec40c5955ef",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    cards.forEach(function (item) {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });
    userAvatarImage.src = userInfo.avatar;
    editProfileNameText.textContent = userInfo.name;
    editProfileDescriptionText.textContent = userInfo.about;
  })
  .catch(console.error);

const userAvatarImage = document.querySelector(".profile__avatar");
const editProfileButton = document.querySelector(".profile__button-secondary");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseButton = editProfileModal.querySelector(
  ".modal__close-button",
);
const editProfileNameText = document.querySelector(".profile__name");
const editProfileDescriptionText = document.querySelector(
  ".profile__description",
);
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input",
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input",
);
const editProfileForm = editProfileModal.querySelector(".modal__form");

const newPostButton = document.querySelector(".profile__button-large");
const newPostModal = document.querySelector("#new-post-modal");
const newPostSubmitButton = newPostModal.querySelector(".modal__save-button");
const newPostCloseButton = newPostModal.querySelector(".modal__close-button");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostLinkInput = newPostModal.querySelector("#image-link-input");
const newPostCaptionInput = newPostModal.querySelector("#caption-input");

let selectedCard, selectedCardId;

const avatarButton = document.querySelector(".profile__avatar-button");
const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarInput = avatarModal.querySelector("#avatar-link-input");
const avatarCloseButton = avatarModal.querySelector(
  ".modal__close-button.modal__close-button-type-avatar",
);

const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form");

const modalPreviewImage = document.querySelector("#preview-image-modal");
const modalPreviewCloseButton = modalPreviewImage.querySelector(
  ".modal__close-button",
);
const modalImage = modalPreviewImage.querySelector(".modal__image");
const modalCaption = modalPreviewImage.querySelector(".modal__caption");

document.querySelectorAll(".modal").forEach((modal) =>
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal")) closeModal(modal);
  }),
);

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  const cardLikeButtonEl = cardElement.querySelector(".card__like-button");
  if (data.isLiked) {
    cardLikeButtonEl.classList.add("card__like-button_active");
  }
  cardLikeButtonEl.addEventListener("click", (evt) =>
    handleLikeStatus(evt, data._id),
  );

  const deleteButton = cardElement.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", () =>
    handleDeleteCard(cardElement, data._id),
  );

  cardImageEl.addEventListener("click", () => {
    modalImage.src = data.link;
    modalImage.alt = data.name;
    modalCaption.textContent = data.name;
    openModal(modalPreviewImage);
  });

  return cardElement;
}

modalPreviewCloseButton.addEventListener("click", () => {
  closeModal(modalPreviewImage);
});

const deleteCloseButton = deleteModal.querySelector(
  ".modal__close-button_type_delete",
);

deleteCloseButton.addEventListener("click", () => closeModal(deleteModal));

const deleteCancelButton = deleteModal.querySelector(
  ".modal__save-button.modal__save-button_type_cancel",
);

deleteCancelButton.addEventListener("click", () => closeModal(deleteModal));

function handleEscape(evt) {
  if (evt.key === "Escape")
    closeModal(document.querySelector(".modal.modal_is-opened"));
}

function openModal(modal) {
  document.addEventListener("keydown", handleEscape);
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  document.removeEventListener("keydown", handleEscape);
  modal.classList.remove("modal_is-opened");
}
deleteForm.addEventListener("submit", handleDeleteSubmit);

editProfileButton.addEventListener("click", function () {
  editProfileNameInput.value = editProfileNameText.textContent;
  editProfileDescriptionInput.value = editProfileDescriptionText.textContent;
  resetValidation(editProfileForm, settings);
  openModal(editProfileModal);
});

editProfileCloseButton.addEventListener("click", function () {
  closeModal(editProfileModal);
});

modalPreviewCloseButton.addEventListener("click", function () {
  closeModal(modalPreviewImage);
});

newPostButton.addEventListener("click", function () {
  resetValidation(newPostForm, settings);
  openModal(newPostModal);
});

newPostCloseButton.addEventListener("click", function () {
  closeModal(newPostModal);
});

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = evt.submitter;
  setButtonText(submitButton, true);

  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((data) => {
      editProfileNameText.textContent = data.name;
      editProfileDescriptionText.textContent = data.about;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitButton, false);
    });
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = evt.submitter;
  setButtonText(submitButton, true);

  api
    .updateAvatar({
      avatar: avatarInput.value,
    })
    .then((data) => {
      userAvatarImage.src = data.avatar;
      closeModal(avatarModal);
      avatarForm.reset();
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitButton, false);
    });
}
avatarButton.addEventListener("click", () => {
  resetValidation(avatarForm, settings);
  openModal(avatarModal);
});

avatarCloseButton.addEventListener("click", () => {
  closeModal(avatarModal);
});

avatarForm.addEventListener("submit", handleAvatarFormSubmit);

editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);

function handleDeleteSubmit(evt) {
  evt.preventDefault();

  const submitButton = evt.submitter;
  setButtonText(submitButton, true, "Delete", "Deleting...");

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitButton, false, "Delete", "Deleting...");
    });
}

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
}

function handleLikeStatus(evt, id) {
  const likeButton = evt.target;
  const isLiked = likeButton.classList.contains("card__like-button_active");
  api
    .changeLikeStatus(id, isLiked)
    .then(() => {
      likeButton.classList.toggle("card__like-button_active");
    })
    .catch(console.error);
}

function handleNewPostFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = evt.submitter;
  setButtonText(submitButton, true);

  api
    .newPost({
      name: newPostCaptionInput.value,
      link: newPostLinkInput.value,
    })
    .then((data) => {
      const cardElement = getCardElement(data);
      cardsList.prepend(cardElement);
      closeModal(newPostModal);
      newPostForm.reset();
      disabledButton(newPostSubmitButton, settings);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitButton, false);
    });
}
newPostForm.addEventListener("submit", handleNewPostFormSubmit);

enableValidation(settings);
