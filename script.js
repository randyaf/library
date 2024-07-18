const modal = document.querySelector(".add-book-modal");
const form = document.querySelector(".add-book-form");
const library = [];

function Book(title, author, language, ISBNNumber, description, readStatus) {
    this.title = title;
    this.author = author;
    this.language = language;
    this.ISBNNumber = ISBNNumber;
    this.description = description;
    this.readStatus = readStatus;
}

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

const submitAddBookButton = document.querySelector(".submit-add-book");
submitAddBookButton.addEventListener("click", event => {
    event.preventDefault();
    console.log("form: " + form.checkValidity());
    if (form.checkValidity()) {
        console.log("form is valid");
        const formData = new FormData(form);
        const book = new Book(...formData.values());
        library.push(book);
        resetForm();
        toggleModal();
    } else {
        console.log("form is invalid");
        form.reportValidity();
    }
})


function resetForm() {
    form.reset();
}

function toggleModal() {
    modal.classList.toggle("hidden");
}