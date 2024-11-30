import { deleteItem } from '/js/helpers/deleteItem.js';

// Start delete detail foodpet

document.addEventListener('DOMContentLoaded', () => {
  deleteItem(
    'delete-food-pet',
    'popup-delete-foodpet',
    'cancelDelete',
    'confirmDelete'
  );
});

// End delete detail foodpet
