export const deleteItem = (buttonDelete, popupClass, cancelPopupId, confirmDeleteButtonId) => {
    const buttonDeleteUser = document.querySelectorAll(`.${buttonDelete}`);
    const popup = document.querySelector(`.${popupClass}`);
    const cancelPopup = document.getElementById(`${cancelPopupId}`);
    const confirmDeleteButton = document.getElementById(`${confirmDeleteButtonId}`);

    buttonDeleteUser.forEach(button => {
        button.addEventListener("click", () => {
    
            popup.hidden = false;
    
            confirmDeleteButton.addEventListener("click", () => {
    
                const link = button.getAttribute("link");
                fetch(link, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.code == 200) {
                            popup.hidden = true;
                            window.location.reload();
                        }
                    });
    
            });
    
        });
    })
    
    cancelPopup.addEventListener("click", () => {
    
        popup.hidden = true;
    
    });
};