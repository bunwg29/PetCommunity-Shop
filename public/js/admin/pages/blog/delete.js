import { deleteItem } from "/js/helpers/deleteItem.js";

// Start delete detail blog

document.addEventListener('DOMContentLoaded', () => {
    deleteItem("delete-blog", "popup-delete-blog", "cancelDelete", "confirmDelete");
});

// End delete detail blog
