const sortPetSelect = document.querySelector('[sort-pet]');

if (sortPetSelect) {
  let url = new URL(window.location.href);

  sortPetSelect.addEventListener('change', () => {
    const [sortKey, sortValue] = sortPetSelect.value.split('-');

    if (sortKey && sortValue) {
      url.searchParams.set('sortKey', sortKey);
      url.searchParams.set('sortValue', sortValue);
    }

    window.location.href = url.href;
  });
}
