const modal = document.querySelector(".add-book-modal");
const form = document.querySelector(".add-book-form");
const bookList = document.querySelector(".book-list");
const library = [];

function Book(title, author, language, bookPages, ISBNNumber, description, readStatus) {
    this.title = title;
    this.author = author;
    this.language = language;
    this.bookPages = bookPages;
    this.ISBNNumber = ISBNNumber;
    this.description = description;
    this.readStatus = readStatus;
    this.selectStatus = false;
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
        addBookElement(book);
        resetForm();
        toggleModal();
    } else {
        console.log("form is invalid");
        form.reportValidity();
    }
})


bookList.addEventListener("click", event => {
    if (event.target.closest(".book-read-status") !== null) {
        console.log("toggle read status pressed");
        const bookElement = event.target.closest(".book-card");
        toggleReadStatus(findBookObj(bookElement), bookElement);
    }
    if (event.target.closest(".book-remove-button") !== null) {
        console.log("book-remove-button pressed");
        const bookElement = event.target.closest(".book-card");
        removeBookElement(findBookObj(bookElement));
        resetSelectStatus();
        closeRightSidebar();
    }
    if (event.target.closest(".book-card") !== null
    && !event.target.closest(".book-read-status")
    && !event.target.closest(".book-remove-button")) {
        const bookElement = event.target.closest(".book-card");
        const bookObj = findBookObj(bookElement);
        if (bookObj.selectStatus === false) {
            resetSelectStatus();
            bookElement.classList.add("selected");
            bookObj.selectStatus = true;
            updateRightSidebarContent(bookObj);
        }
        console.log("book card clicked");
    }
})

const rightSidebarCloseButton = document.querySelector(".right-sidebar-close");
rightSidebarCloseButton.addEventListener("click", event => {
    resetSelectStatus();
    closeRightSidebar();
})


function resetForm() {
    form.reset();
}

function toggleModal() {
    modal.classList.toggle("hidden");
}

function addBookElement(book) {
    const newBook = document.querySelector(".book-template").cloneNode(true);
    newBook.classList.remove("hidden");
    newBook.classList.remove("book-template");
    newBook.classList.add(`book-${library.length}`);
    newBook.querySelector(".book-title").textContent = book.title;
    newBook.querySelector(".book-author").textContent = book.author;
    newBook.querySelector(".book-cover").setAttribute("src", getRandomCover());
    if (book.readStatus === "true") newBook.querySelector(".book-read-status").classList.add("read");
    bookList.appendChild(newBook);
}

function removeBookElement(book) {
    const listTitleAuthor = [...bookList.querySelectorAll(".book-title, .book-author")];
    for (let i = 0; i < listTitleAuthor.length; i+=2) {
        if (listTitleAuthor[i].textContent === book.title && listTitleAuthor[i+1].textContent === book.author) {
            listTitleAuthor[i].closest(".book-card").remove();
            library.splice(library.indexOf(book), 1);
        }
    }
}

function toggleReadStatus(book, bookElement) {
    if (book.readStatus === "true") {
        book.readStatus = "false";
        bookElement.querySelector(".book-read-status").classList.toggle("read");
    } else {
        book.readStatus = "true";
        bookElement.querySelector(".book-read-status").classList.toggle("read");
    }
}

function findBookObj(bookElement) {
    return library.find( bookObj => {
        return bookElement.querySelector(".book-title").textContent === bookObj.title
        && bookElement.querySelector(".book-author").textContent === bookObj.author
    });
}

function findBookElement(book) {
    const listTitleAuthor = [...bookList.querySelectorAll(".book-title, .book-author")];
    for (let i = 0; i < listTitleAuthor.length; i+=2) {
        if (listTitleAuthor[i].textContent === book.title && listTitleAuthor[i+1].textContent === book.author) {
            return listTitleAuthor[i].closest(".book-card");
        }
    }
    return null;
}

function resetSelectStatus() {
    if (!library.some(bookObj => bookObj.selectStatus === true)) return;
    const selectedBook = library.find(object => object.selectStatus === true);
    console.log(selectedBook);
    findBookElement(selectedBook).classList.remove("selected");
    selectedBook.selectStatus = false;
    console.log("selection is reset");
}

function updateRightSidebarContent(book) {
    const rightSidebar = document.querySelector(".content-right-sidebar");
    if (rightSidebar.classList.contains("hidden")) rightSidebar.classList.remove("hidden");
    rightSidebar.querySelector(".main-book-cover > img").setAttribute("src", findBookElement(book).querySelector(".book-cover").getAttribute("src"));
    rightSidebar.querySelector(".book-details-title").textContent = book.title;
    rightSidebar.querySelector(".book-author-value").textContent = book.author;
    rightSidebar.querySelector(".book-language-value").textContent = book.language;
    rightSidebar.querySelector(".book-pages-value").textContent = book.bookPages;
    rightSidebar.querySelector(".book-isbn-value").textContent = book.ISBNNumber;
    rightSidebar.querySelector(".book-overview").textContent = book.description;
}

function closeRightSidebar() {
    document.querySelector(".content-right-sidebar").classList.add("hidden");   
    console.log("right sidebar closed");
}

function getRandomCover() {
    return `./images/book-${Math.floor(Math.random() * 6) + 1}.jpg`
}

function addDummyBook(number) {
    if (number <= 0) return;
    let i = 1 + library.length;
    let length = number+library.length;
    for (i; i <= length; i++) {
        const book = new Book(`book ${i}`, "cool author", "english", 123, 212, "some random description here", "false");
        library.push(book);
        addBookElement(book);
    }
}
addDummyBook(8);