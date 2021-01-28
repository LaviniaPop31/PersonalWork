var books = [{
    title: "JavaScript:The Good Parts",
    author: "Douglas Crockford",
    isRead: false
},

{
    title: "You Don’t Know JS",
    author: "Kyle Simpson",
    isRead: true
},

{
    title: "JavaScript for Kids: A Playful Introduction to Programming",
    author: "Nick Morgan",
    isRead: true
}];

window.addEventListener('load', function () {
    var bookListSection = document.getElementById("bookList");
    var bookList = document.createElement("ul");
    bookListSection.appendChild(bookList);
    for (var i = 0; i < books.length; i++) {
        displayBook(books[i], bookList);
    }


    var addBookButton = document.getElementById("addNewBook");
    addBookButton.onclick = function () {
        var titleInput = document.getElementsByName("title")[0];
        var authorInput = document.getElementsByName("author")[0];
        console.log(titleInput.value, authorInput.value);
        var newBook = {
            title: titleInput.value,
            author: authorInput.value,
            isRead: false
        };
        // console.log(books);

        // validate that the title and author fields have values before adding a new book
        if (titleInput.value !== "" && authorInput.value !== "") {
            for (var i = 0; i < books.length; i++) {
                // validate duplicate items, if the book already exist in the list (has the same name
                // and author) display an error
                var errorDuplicate = document.getElementById("duplicate-names");
                errorDuplicate.innerHTML = "The book is already added";
                if (books[i].title == titleInput.value && books[i].author == authorInput.value) {
                    errorDuplicate.style.display = 'block';
                    return;
                } else {
                    errorDuplicate.style.display = 'none';
                }
            }
            books.push(newBook);
            console.log(books);
            displayBook(newBook, bookList);
            // reset the form after adding an item
            document.querySelector("form").reset();
        } else {
            validateInputs();
        }
    }
});

var titleInput = document.getElementsByName("title")[0];
var authorInput = document.getElementsByName("author")[0];
var errorTitle = document.getElementById("validTitle");
var errorAuthor = document.getElementById("validAuthor");
var errorDuplicate = document.getElementById("duplicate-names");


function validateInputs() {
    // display errors, which indicates which field is not completed
    errorAuthor.innerHTML = "*Field is required";
    errorTitle.innerHTML = "*Field is required";
    if (titleInput.value == '') {
        errorTitle.style.display = 'block';
    } else {
        errorTitle.style.display = 'none';
    }

    if (authorInput.value == '') {
        errorAuthor.style.display = 'block';
    } else {
        errorAuthor.style.display = 'none';
    }
}


function displayBook(book, list) {
    var listItem = document.createElement("li");
    var bookTitle = document.createElement("p");
    var bookAuthor = document.createElement("p");
    var isReadLabel = document.createElement("label");
    var isRead = document.createElement("input");
    isRead.setAttribute("type", "checkbox");

    bookTitle.innerText = "Title: " + book.title;
    bookAuthor.innerText = "Author: " + book.author;
    isReadLabel.innerText = "Already Read";

    isRead.checked = book.isRead;

    listItem.append(bookTitle, bookAuthor, isRead, isReadLabel);

    // listItem.innerText = book.title;
    list.appendChild(listItem);

}


// remove the errors, after the input has value
// hide this error when the input's value change
titleInput.addEventListener("keypress", function () {
    errorTitle.style.display = "none";
    errorDuplicate.style.display = "none";
})
authorInput.addEventListener("keypress", function () {
    errorAuthor.style.display = "none";
    errorDuplicate.style.display = "none";
})
document.querySelector("form").addEventListener("reset", function () {
    errorDuplicate.style.display = "none";
})