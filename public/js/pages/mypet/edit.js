
// Start handle display new images of pet product when user choose from computer
const inputImages = document.querySelector("#images");

if (inputImages) {
    inputImages.addEventListener("change", (event) => {

        const newImagesContainer = document.getElementById('newImages');
    
        const files = event.target.files;
    
        for (let i = 0; i < files.length; i++) {
    
            const file = files[i];
    
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
    
                reader.onload = function(e) {
    
                    const imgElement = document.createElement('img');
                    imgElement.src = e.target.result; 
                    imgElement.classList.add('w-full', 'h-24', 'object-cover', 'rounded');
                    
                    const deleteButton = document.createElement('button');
                    deleteButton.classList.add('absolute', 'top-0', 'right-0', 'bg-red-400', 'text-white', 'rounded-full', 'p-1', 'text-xs');
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
    
        };
    
    });
};

// End handle display new images of pet product when user choose from computer


// Start handle display new avatar of pet product when user choose from computer

const inputPetAvatar = document.querySelector("#avt"); 

if (inputPetAvatar) {

    inputPetAvatar.addEventListener("change", (event) => {

        const fileAvatar = event.target.files[0];

        if (fileAvatar && fileAvatar.type.startsWith('image/')) {

            const petAvatar = document.querySelector(".avatarPet");

            const rootPath = petAvatar.src;

            const readerAvt = new FileReader();
      
            readerAvt.onload = function(e) {    
                const avtDiv = document.querySelector(".avtDiv");
                petAvatar.src = e.target.result; 

                const deleteButton = document.createElement('button');
                deleteButton.classList.add('absolute', 'top-0', 'right-0', 'bg-red-400', 'text-white', 'rounded-full', 'p-1', 'text-xs');
                deleteButton.textContent = 'Delete'; 
                avtDiv.appendChild(deleteButton);

                deleteButton.addEventListener("click", (e) => {
                    e.preventDefault();
                    deleteButton.remove();
                    petAvatar.src = rootPath;
                });
 
            };
      
            readerAvt.readAsDataURL(fileAvatar); 
        };

    });
    
};

// End handle display new avatar of pet product when user choose from computer


// Start delete image of pet product in database

const deleteButtons = document.querySelectorAll(".delete-image");
const popup = document.querySelector(".popup-delete-image");
const cancelDeleteButton = document.getElementById("cancelDelete");
const submitDeleteFormButton = document.getElementById("submitDeleteForm");
const deleteImageForm = document.getElementById("deleteImageForm");
const petIdInput = document.getElementById("petId");
const imageUrlInput = document.getElementById("imageUrl");

deleteButtons.forEach((button) => {

    button.addEventListener("click", (e) => {
        e.preventDefault();

        const petId = button.getAttribute("data-pet-id");
        const imageUrl = button.getAttribute("data-image-url");
    
        petIdInput.value = petId;
        imageUrlInput.value = imageUrl;
    
        popup.hidden = false;
    });
        
});



submitDeleteFormButton.addEventListener("click", () => {
    const petId = petIdInput.value;

    if (petId) {

        deleteImageForm.action = `/mypet/delete/image/${petId}?_method=DELETE`;

    }

    deleteImageForm.submit();
});

// End delete image of pet product in database


// Start delete pet product in database

const popupDeletePet = document.querySelector(".popup-delete-pet");
const deletePetButton = document.querySelector(".delete-pet");
const deletePetForm = document.getElementById("deletePetForm");
const petDeleteIdInput = document.getElementById("petDeleteId");
const submitDeletePetForm = document.getElementById("submitDeletePetForm");
const cancelDeletePet = document.getElementById("cancelDeletePet");

deletePetButton.addEventListener("click", (e) => {
    e.preventDefault();

    petDeleteIdInput.value = deletePetButton.getAttribute("petId");

    popupDeletePet.hidden = false;

}); 

cancelDeletePet.addEventListener("click", () => {
    popupDeletePet.hidden = true;
});

submitDeletePetForm.addEventListener("click", () => {
    
    const petId = petDeleteIdInput.value;

    if (petId) {
        deletePetForm.action = `/mypet/delete/pet/${petId}?_method=DELETE`;
    };

    deletePetForm.submit();

});

// End delete pet product in database
