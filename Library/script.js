// Library object and functions
var myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    var newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    renderLibrary();
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
    renderLibrary();
}

function toggleReadStatus(index) {
    myLibrary[index].read = !myLibrary[index].read;
    renderLibrary();
}

function renderLibrary() {
    var bookList = document.getElementById("bookList");
    bookList.innerHTML = '';

    myLibrary.forEach(function(book, index) {
        var bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        
        var bookTitle = document.createElement("h3");
        bookTitle.textContent = book.title;
        
        var bookAuthor = document.createElement("p");
        bookAuthor.textContent = "Author: " + book.author;

        var bookPages = document.createElement("p");
        bookPages.textContent = "Pages: " + book.pages;

        var bookReadStatus = document.createElement("p");
        bookReadStatus.classList.add("read-status");
        bookReadStatus.textContent = "Read: " + (book.read ? "Yes" : "No");

        var toggleReadButton = document.createElement("button");
        toggleReadButton.textContent = book.read ? "Mark as Unread" : "Mark as Read";
        toggleReadButton.addEventListener('click', function() {
            toggleReadStatus(index);
        });

        var removeBookButton = document.createElement("button");
        removeBookButton.textContent = "Remove";
        removeBookButton.addEventListener('click', function() {
            removeBookFromLibrary(index);
        });

        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookPages);
        bookCard.appendChild(bookReadStatus);
        bookCard.appendChild(toggleReadButton);
        bookCard.appendChild(removeBookButton);

        bookList.appendChild(bookCard);
    });
}

// Selecting elements
var addBookButton = document.getElementById('addBookButton');
var popupOverlay = document.getElementById('popup-overlay');
var cancelButton = document.getElementById('cancelButton');
var bookForm = document.getElementById('bookForm');

// Show popup when "Add New Book" button is clicked
addBookButton.addEventListener('click', function() {
    popupOverlay.style.visibility='visible';
});

// Hide popup when "Cancel" button is clicked
cancelButton.addEventListener('click', function() {
    popupOverlay.style.visibility='hidden';
});

// Form submission handling
bookForm.addEventListener('submit', function(event) {
    popupOverlay.style.visibility='hidden';
    event.preventDefault();
    
    var title = document.getElementById('title').value || "Unknown Title";
    var author = document.getElementById('author').value || "Unknown Author";
    var pages = document.getElementById('pages').value || 0;
    var read = document.getElementById('read-status').checked;

    addBookToLibrary(title, author, pages, read);

    bookForm.reset();
    popupOverlay.classList.add('hidden');
});

// Initial library rendering
renderLibrary();
