document.addEventListener('DOMContentLoaded', () => {
  // Start handle increase, decrease quantity
  const quantitySpan = document.querySelector('.quantity');
  const reduceBtn = document.querySelector('.reduce-btn');
  const addBtn = document.querySelector('.add-btn');

  reduceBtn.addEventListener('click', () => {
    let currentQuantity = parseInt(quantitySpan.getAttribute('quantity'));
    if (currentQuantity > 1) {
      currentQuantity -= 1;
      quantitySpan.textContent = currentQuantity;
      quantitySpan.setAttribute('quantity', currentQuantity);
    }
  });

  addBtn.addEventListener('click', () => {
    let currentQuantity = parseInt(quantitySpan.getAttribute('quantity'));

    currentQuantity += 1;
    quantitySpan.textContent = currentQuantity;
    quantitySpan.setAttribute('quantity', currentQuantity);
  });

  // End handle increase, decrease quantity

  const btnAddCart = document.querySelector('.addcart');
  const productId = btnAddCart.getAttribute('productId');
  btnAddCart.addEventListener('click', () => {
    let currentQuantity = quantitySpan.getAttribute('quantity');
    window.location.href = `/toycart/add/${productId}/${currentQuantity}`;
  });
});
