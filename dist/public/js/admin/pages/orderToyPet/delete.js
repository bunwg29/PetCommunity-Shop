import { deleteItem } from '/js/helpers/deleteItem.js';

// Start delete detail foodpet

document.addEventListener('DOMContentLoaded', () => {
  deleteItem(
    'delete-order-toypet',
    'popup-delete-orderToyPet',
    'cancelDelete',
    'confirmDelete'
  );
});

// End delete detail foodpet
