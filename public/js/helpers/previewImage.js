// Start handle display new avatar of pet product when user choose from computer
export const previewNewAvatarImage = () => {
  const inputPetAvatar = document.querySelector('#avt');

  if (inputPetAvatar) {
    inputPetAvatar.addEventListener('change', (event) => {
      const fileAvatar = event.target.files[0];

      if (fileAvatar && fileAvatar.type.startsWith('image/')) {
        const petAvatar = document.querySelector('.avatarPet');

        const rootPath = petAvatar.src;

        const readerAvt = new FileReader();

        readerAvt.onload = function (e) {
          const avtDiv = document.querySelector('.avtDiv');
          petAvatar.src = e.target.result;

          const deleteButton = document.createElement('button');
          deleteButton.classList.add(
            'absolute',
            'top-0',
            'right-0',
            'bg-red-400',
            'text-white',
            'rounded-full',
            'p-1',
            'text-xs'
          );
          deleteButton.textContent = 'Delete';
          avtDiv.appendChild(deleteButton);

          deleteButton.addEventListener('click', (e) => {
            e.preventDefault();
            deleteButton.remove();
            petAvatar.src = rootPath;
          });
        };

        readerAvt.readAsDataURL(fileAvatar);
      }
    });
  }
};
// End handle display new avatar of pet product when user choose from computer

// Start handle display new images of pet product when user choose from computer
export const previewNewImage = () => {
  const inputImages = document.querySelector('#images');

  if (inputImages) {
    inputImages.addEventListener('change', (event) => {
      const newImagesContainer = document.getElementById('newImages');

      const files = event.target.files;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file && file.type.startsWith('image/')) {
          const reader = new FileReader();

          reader.onload = function (e) {
            const imgElement = document.createElement('img');
            imgElement.src = e.target.result;
            imgElement.classList.add(
              'w-full',
              'h-24',
              'object-cover',
              'rounded'
            );

            const deleteButton = document.createElement('button');
            deleteButton.classList.add(
              'absolute',
              'top-0',
              'right-0',
              'bg-red-400',
              'text-white',
              'rounded-full',
              'p-1',
              'text-xs'
            );
            deleteButton.textContent = 'Delete';

            deleteButton.onclick = () => {
              imgElement.remove();
              deleteButton.remove();
            };

            const container = document.createElement('div');
            container.classList.add('relative');
            container.appendChild(imgElement);
            container.appendChild(deleteButton);

            newImagesContainer.appendChild(container);
          };

          reader.readAsDataURL(file);
        }
      }
    });
  }
};
// End handle display new images of pet product when user choose from computer
