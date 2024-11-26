import { deleteItem } from '/js/helpers/deleteItem.js';

// Start delete detail foodpet

document.addEventListener('DOMContentLoaded', () => {
  deleteItem(
    'delete-order-foodpet',
    'popup-delete-orderFoodPet',
    'cancelDelete',
    'confirmDelete'
  );
});

// End delete detail foodpet
