// Handle image preview for pet product

const mainImage = document.querySelector(".main-image");
const additionalImages = document.querySelectorAll(".additional-image");
const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");

const styleBorder = (item) => {
    additionalImages.forEach(img => {
        img.style.border = ""; 
    });
    item.style.border = "5px solid #F1D092";
};

const styleImageByPosition = (position) => {
    additionalImages.forEach((img) => {
        const imagePosition = parseInt(img.getAttribute("image_position"), 10);
        img.style.border = imagePosition === position ? "5px solid #F1D092" : "";
    });
};

const findSourceImage = (position) => {
    const targetImage = document.querySelector(`img[image_position="${position}"]`);
    return targetImage ? targetImage.getAttribute("src") : null;
};

const updateMainImage = (position, src) => {
    mainImage.setAttribute("image_position", position);
    mainImage.src = src;
};

additionalImages.forEach(item => {
    item.addEventListener("click", () => {
        styleBorder(item);
        updateMainImage(item.getAttribute("image_position"), item.getAttribute("src"));
    }); 
});

arrowLeft.addEventListener("click", () => {
    let positionMainImage = parseInt(mainImage.getAttribute("image_position"), 10);
    positionMainImage = Math.max(0, positionMainImage - 1); // Đảm bảo không nhỏ hơn 0

    const newSrc = positionMainImage > 0 
        ? findSourceImage(positionMainImage) 
        : document.querySelector(`img[image_position="main_avt"]`).getAttribute("src");

    updateMainImage(positionMainImage, newSrc);
    styleImageByPosition(positionMainImage);
});

arrowRight.addEventListener("click", () => {
    let positionMainImage = parseInt(mainImage.getAttribute("image_position"), 10);
    positionMainImage += 1;

    const newSrc = findSourceImage(positionMainImage);

    if (newSrc) {
        updateMainImage(positionMainImage, newSrc);
        styleImageByPosition(positionMainImage);
    }
});


// End image preview for pet product
