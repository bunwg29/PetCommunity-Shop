// Start handle hidden signin button and replace by image

const avatarUser = document.querySelector('.avatar-user');
const buttonHeader = document.querySelector('.button-header');

if (avatarUser) {
  buttonHeader.classList.add('hidden');
}

// End handle hidden...

// Start dropdown info user

const dropdownAvatar = document.querySelector('.dropdown-avatar');

avatarUser.addEventListener('click', () => {
  dropdownAvatar.classList.toggle('hidden');
});

document.addEventListener('click', (event) => {
  if (
    !dropdownAvatar.classList.contains('hidden') &&
    !dropdownAvatar.contains(event.target) &&
    event.target !== avatarUser
  ) {
    dropdownAvatar.classList.add('hidden');
  }
});

// End dropdown info user

// Start dropdown card

function toggleCartDropdown() {
  const dropdown = document.getElementById('cartDropdown');
  dropdown.classList.toggle('hidden');
}

// End dropdown card

// Start category

const categoryDiv = document.querySelector('.category');
const dropdownCategory = document.getElementById('dropdown-category');

if (categoryDiv) {
  categoryDiv.addEventListener('click', () => {
    dropdownCategory.classList.toggle('hidden');
  });
}

// End category
