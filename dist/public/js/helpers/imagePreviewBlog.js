// Start display thumbnail photo preview

document
  .getElementById('thumbnail_photo')
  .addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const uploadContainer = document.querySelector('.thumbnail_label');
        uploadContainer.innerHTML = '';

        const imgPreview = document.createElement('img');
        imgPreview.classList.add(
          'w-full',
          'h-full',
          'object-cover',
          'rounded-lg'
        );
        imgPreview.src = e.target.result;

        uploadContainer.appendChild(imgPreview);
      };

      reader.readAsDataURL(file);
    }
  });

// End display thumbnail photo preview

// Start remove thumbnail from choosen

document
  .querySelector('button[type="button"]')
  .addEventListener('click', function () {
    const uploadContainer = document.querySelector('.thumbnail_label');
    uploadContainer.innerHTML = '';
  });

// End remove thumbnail from choosen
