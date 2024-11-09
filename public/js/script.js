// Handle hidden signin button and replace by image

const avatarUser = document.querySelector(".avatar-user");
const buttonHeader = document.querySelector(".button-header");

if(avatarUser) {
    buttonHeader.classList.add("hidden");
}

// End handle hidden...