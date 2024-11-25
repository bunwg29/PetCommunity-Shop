const buttonChangeQuantity = document.querySelectorAll('.change-quantity');

if (buttonChangeQuantity) {
  buttonChangeQuantity.forEach((button) => {
    const reduceBtn = button.querySelector('.reduce-btn');
    const addBtn = button.querySelector('.add-btn');
    const quantity = button.querySelector('.quantity');
    const quantityItem = quantity.getAttribute('quantity');
    const productId = button.getAttribute('product_id');

    reduceBtn.addEventListener('click', () => {
      window.location.href = `/cart/update/reduce/${productId}/${quantityItem}`;
    });

    addBtn.addEventListener('click', () => {
      window.location.href = `/cart/update/add/${productId}/${quantityItem}`;
    });
  });
}
