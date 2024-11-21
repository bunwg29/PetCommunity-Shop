document.addEventListener("DOMContentLoaded", function () {
  function setupToggleMenu(toggleId, menuId, chevronClass) {
    const toggleElement = document.getElementById(toggleId);
    const menuElement = document.getElementById(menuId);
    const chevronIcon = toggleElement.querySelector(`.${chevronClass}`);

    toggleElement.addEventListener("click", () => {
      menuElement.classList.toggle("hidden");
      menuElement.classList.toggle("max-h-0");
      menuElement.classList.toggle("max-h-[200px]");

      chevronIcon.innerHTML = menuElement.classList.contains("hidden")
        ? `
          <path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312'/>
        `
        : `
          <path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m19 9-7 7-7-7'/>
        `;
    });
  }

  setupToggleMenu("petFoodToggle", "petFoodMenu", "icon-chevron-default");
  setupToggleMenu("petToyToggle", "petToyMenu", "icon-chevron-default");
});
