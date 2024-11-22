// // Upload Image at Sign up

document
  .getElementById('thumbnail')
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

// // End Upload Image at Sign up
