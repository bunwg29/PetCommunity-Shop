
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
            };
      
            readerAvt.readAsDataURL(fileAvatar); 

        };

    });
    
};

// End handle display new avatar of pet product when user choose from computer


// Start delete image of pet product in database

const deleteButtons = document.querySelectorAll(".delete-image");

deleteButtons.forEach((button) => {
    button.addEventListener("click", async (e) => {
        e.preventDefault();

        const imageUrl = button.getAttribute("data-image-url");
        const petId = button.getAttribute("data-pet-id");

        if (confirm("Are you sure you want to delete this image?")) {
            try {
            const response = await fetch(`/mypet/image/${petId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ imageUrl }),
            }); 

            const result = await response.json();

            if (result.success) {
                button.parentElement.remove();
                alert("Image deleted successfully.");
            } else {
                alert("Failed to delete the image.");
            }
            } catch (error) {
                console.error("Error deleting image:", error);
                alert("An error occurred while deleting the image.");
            }
        };
    });
});

// End delete image of pet product in database
 
