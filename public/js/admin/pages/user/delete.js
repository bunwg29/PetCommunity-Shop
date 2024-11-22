import { deleteItem } from '/js/helpers/deleteItem.js';

// Start delete detail user

document.addEventListener('DOMContentLoaded', () => {
  deleteItem(
    'delete-user',
    'popup-delete-user',
    'cancelDelete',
    'confirmDelete'
  );
});

// End delete detail user
