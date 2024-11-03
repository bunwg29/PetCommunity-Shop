document.addEventListener('DOMContentLoaded', () => {
    const minPriceSelect = document.getElementById('min-price');
    const maxPriceSelect = document.getElementById('max-price');
    const genderCheckboxes = document.querySelectorAll("input[name='gender']");
    const sizeCheckboxes = document.querySelectorAll("input[name='size']");
    
    const updateSearchParams = () => {
        const url = new URL(window.location.href);
        
        if (minPriceSelect.value) {
            url.searchParams.set("minPrice", minPriceSelect.value);
        } else {
            url.searchParams.delete("minPrice");
        }
        
        if (maxPriceSelect.value) {
            url.searchParams.set("maxPrice", maxPriceSelect.value);
        } else {
            url.searchParams.delete("maxPrice");
        }

        let selectedGenders = Array.from(genderCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        
        if (selectedGenders.length) {
            url.searchParams.set("gender", selectedGenders.join(","));
        } else {
            url.searchParams.delete("gender");
        }

        let selectedSizes = Array.from(sizeCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        if (selectedSizes.length) {
            url.searchParams.set("size", selectedSizes.join(","));
        } else {
            url.searchParams.delete("size");
        }

        window.location.href = url.href;
    };

    
    genderCheckboxes.forEach(checkbox => checkbox.addEventListener("change", updateSearchParams));
    sizeCheckboxes.forEach(checkbox => checkbox.addEventListener("change", updateSearchParams));

    let minPriceSelected = false;
    let maxPriceSelected = false;

    const checkAndUpdate = () => {
        if (minPriceSelected && maxPriceSelected === true) {
            updateSearchParams();
            minPriceSelected = false;
            maxPriceSelected = false;
        }
    };


    minPriceSelect.addEventListener("change", () => {
        minPriceSelected = true;
        checkAndUpdate();
    });

    maxPriceSelect.addEventListener("change", () => {
        maxPriceSelected = true;
        checkAndUpdate();
    });

});
