function Book(title, author, pages, isRead) {
  this.id = crypto.randomUUID(); 
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}


const myLibrary = [];


function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
  displayBooks();
}


function displayBooks() {
  const booksContainer = document.getElementById("books-container");
  booksContainer.innerHTML = "";

  myLibrary.forEach((book) => {

    const bookElement = document.createElement("div");
    bookElement.classList.add("book-card");
    bookElement.setAttribute("data-id", book.id);

    bookElement.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Delivery date:</strong> ${book.author}</p>
        <p><strong>Quantity:</strong> ${book.pages}</p>
        <p><strong>Order Type:</strong> <span class="status">${
          book.isRead ? "Delivery" : "Pick Up"
        }</span></p>
        <button class="toggle-read-btn" data-id="${
          book.id
        }">Toggle Order</button>
        <button class="remove-btn" data-id="${book.id}">Remove</button>
      `;

   
    booksContainer.appendChild(bookElement);
  });
}

const newBookForm = document.getElementById("new-book-form");
const newBookButton = document.getElementById("new-book-button");

newBookButton.addEventListener("click", () => {
  if (newBookForm.style.display === "block") {
    newBookForm.style.display = "none"; 
    newBookButton.textContent = "Add Order";
  } else {
    newBookForm.style.display = "block"; 
    newBookButton.textContent = "Close Form";
  }
});

newBookForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form submission

  // Get form data
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("is-read").checked;

  addBookToLibrary(title, author, pages, isRead);

  newBookForm.reset();
  newBookForm.style.display = "none";
});


document
  .getElementById("books-container")
  .addEventListener("click", (event) => {
    const target = event.target;


    if (target.classList.contains("remove-btn")) {
      const bookId = target.getAttribute("data-id");
      removeBookFromLibrary(bookId);
    }


    if (target.classList.contains("toggle-read-btn")) {
      const bookId = target.getAttribute("data-id");
      toggleReadStatus(bookId);
    }
  });


function removeBookFromLibrary(bookId) {
  const bookIndex = myLibrary.findIndex((book) => book.id === bookId);
  if (bookIndex !== -1) {
    myLibrary.splice(bookIndex, 1);
    displayBooks(); 
  }
}


function toggleReadStatus(bookId) {
  const book = myLibrary.find((book) => book.id === bookId);
  if (book) {
    book.toggleReadStatus(); 
    displayBooks(); 
  }
}

Book.prototype.toggleReadStatus = function () {
  this.isRead = !this.isRead;
};

