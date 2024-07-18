const modal = document.querySelector(".add-book-modal");
const form = document.querySelector(".add-book-form");


const addBookButton = document.querySelector(".add-book-button");
addBookButton.addEventListener("click", event => {
    toggleModal();
    console.log("enable modal");
})

const modalCloseButton = document.querySelector(".modal-close-button");
modalCloseButton.addEventListener("click", event => {
    resetForm();
    toggleModal();
    console.log("disable modal");
})

const cancelButton = document.querySelector(".cancel-add-book");
cancelButton.addEventListener("click", event => {
    resetForm();
    toggleModal();
    console.log("disable modal");
    console.log("reset form");
})

function resetForm() {
    form.reset();
}

function toggleModal() {
    modal.classList.toggle("hidden");
}