const initialCards = [
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

const editProfileButton = document.querySelector(".profile__button-secondary");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseButton = editProfileModal.querySelector(
  ".modal__close-button"
);
const editProfileNameText = document.querySelector(".profile__name");
const editProfileDescriptionText = document.querySelector(
  ".profile__description"
);
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);
const editProfileForm = editProfileModal.querySelector(".modal__form");

const newPostButton = document.querySelector(".profile__button-large");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseButton = newPostModal.querySelector(".modal__close-button");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostLinkInput = newPostModal.querySelector("#image-link-input");
const newPostCaptionInput = newPostModal.querySelector("#caption-input");

editProfileButton.addEventListener("click", function () {
  editProfileNameInput.value = editProfileNameText.textContent;
  editProfileDescriptionInput.value = editProfileDescriptionText.textContent;
  editProfileModal.classList.add("modal_is-opened");
});

editProfileCloseButton.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

newPostButton.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});

newPostCloseButton.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-opened");
});

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  editProfileNameText.textContent = editProfileNameInput.value;
  editProfileDescriptionText.textContent = editProfileDescriptionInput.value;
  editProfileModal.classList.remove("modal_is-opened");
}

editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);

function handleNewPostFormSubmit(evt) {
  evt.preventDefault();
  console.log(newPostLinkInput.value);
  console.log(newPostCaptionInput.value);
  newPostModal.classList.remove("modal_is-opened");
}

newPostForm.addEventListener("submit", handleNewPostFormSubmit);

initialCards.forEach(function (item) {
  console.log(item.name);
});
