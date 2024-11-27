import { deleteItem } from '/js/helpers/deleteItem.js';

// Start delete detail pet

document.addEventListener('DOMContentLoaded', () => {
  deleteItem('delete-pet', 'popup-delete-pet', 'cancelDelete', 'confirmDelete');
});

// End delete detail pet
