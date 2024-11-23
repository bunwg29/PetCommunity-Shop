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

// Start delete images existed in database

document.addEventListener('DOMContentLoaded', () => {
  const buttonDeleteImages = document.querySelectorAll('.delete-images');

  if (buttonDeleteImages) {
    buttonDeleteImages.forEach((button) => {
      button.addEventListener('click', () => {
        const link = button.getAttribute('link');

        fetch(link, {
          method: 'DELETE',
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.code == 200) {
              window.location.reload();
            }
          });
      });
    });
  }
});

// End delete images existed in database
