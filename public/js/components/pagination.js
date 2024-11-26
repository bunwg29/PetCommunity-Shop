// Start handle set params on url when user switch pagination
<<<<<<< HEAD

const buttonPaginations = document.querySelectorAll('[button-pagination]');
const totalPageDiv = document.querySelector('[totalPage]');
const totalPage = totalPageDiv.getAttribute('totalPage');

=======
const nav = document.querySelector('.nav');
const buttonPaginations = document.querySelectorAll('[button-pagination]');
const totalPageDiv = document.querySelector('[totalPage]');
const totalPage = totalPageDiv.getAttribute('totalPage');
const lastBtnPagination = document.querySelector('[end-pagination]');
if (totalPage <= 3) {
  lastBtnPagination.classList.add('hidden');
}
if (totalPage == 0) {
  nav.classList.add('hidden');
}
>>>>>>> 10/client
if (buttonPaginations.length > 0) {
  let url = new URL(window.location.href);

  buttonPaginations.forEach((button) => {
    button.addEventListener('click', () => {
      const page = button.getAttribute('button-pagination');

      if (page < 1 || page > totalPage) {
        return;
      }

      url.searchParams.set('page', page);

      window.location.href = url.href;
    });
  });
}

// End handle set params on url when user switch pagination
