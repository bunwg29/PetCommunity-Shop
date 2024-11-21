// Start delete detail user

const buttonDeleteUser = document.querySelectorAll(".delete-user");
const popup = document.querySelector(".popup-delete-user");
const cancelPopup = document.getElementById("cancelDelete");
const confirmDeleteButton = document.getElementById("confirmDelete");
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

// End delete detail user
