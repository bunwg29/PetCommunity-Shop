import {
  previewNewAvatarImage,
  previewNewImage,
} from '/js/helpers/previewImage.js';

// Start preview new image and delete them

document.addEventListener('DOMContentLoaded', () => {
  previewNewAvatarImage();
  previewNewImage();
});

// End preview new image and delete them

// Start delete image of pet product in database

const deleteButtons = document.querySelectorAll('.delete-image');
const popup = document.querySelector('.popup-delete-image');
const cancelDeleteButton = document.getElementById('cancelDelete');
const submitDeleteFormButton = document.getElementById('submitDeleteForm');
const deleteImageForm = document.getElementById('deleteImageForm');
const petIdInput = document.getElementById('petId');
const imageUrlInput = document.getElementById('imageUrl');

deleteButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();

    const petId = button.getAttribute('data-pet-id');
    const imageUrl = button.getAttribute('data-image-url');

    petIdInput.value = petId;
    imageUrlInput.value = imageUrl;

    popup.hidden = false;
  });
});

submitDeleteFormButton.addEventListener('click', () => {
  const petId = petIdInput.value;

  if (petId) {
    deleteImageForm.action = `/mypet/delete/image/${petId}?_method=DELETE`;
  }

  deleteImageForm.submit();
});

// End delete image of pet product in database

// Start delete pet product in database

const popupDeletePet = document.querySelector('.popup-delete-pet');
const deletePetButton = document.querySelector('.delete-pet');
const deletePetForm = document.getElementById('deletePetForm');
const petDeleteIdInput = document.getElementById('petDeleteId');
const submitDeletePetForm = document.getElementById('submitDeletePetForm');
const cancelDeletePet = document.getElementById('cancelDeletePet');

deletePetButton.addEventListener('click', (e) => {
  e.preventDefault();

  petDeleteIdInput.value = deletePetButton.getAttribute('petId');

  popupDeletePet.hidden = false;
});

cancelDeletePet.addEventListener('click', () => {
  popupDeletePet.hidden = true;
});

submitDeletePetForm.addEventListener('click', () => {
  const petId = petDeleteIdInput.value;

  if (petId) {
    deletePetForm.action = `/mypet/delete/pet/${petId}?_method=DELETE`;
  }

  deletePetForm.submit();
});

// End delete pet product in database
