//array for storing book items who's details are entered through input prompts
const myLibrary = [];

//prototype for book object
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        if(this.read === true){
            return this.title + " by " + this.author + ", " + this.pages + " pages, read";
        }
        else{
            return this.title + " by " + this.author + ", " + this.pages + " pages, not read yet";
        }
    }
}

//function that takes user inputs and stores into myLibrary array
function addBookToLibrary(title, author, pages, read){
    const newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook);
}

//function that takes each item within myLibrary and adds each in a grid within the page content

function displayLibrary(){
    
    const contentSection = document.querySelector(".content");

    // Clear the container before adding new content
    contentSection.innerHTML = '';

    myLibrary.forEach(function(book, index) {
        const card = document.createElement("div");
        card.classList.add("card");

        const cardTitleDiv = document.createElement("div");
        cardTitleDiv.classList.add("cardTitle");
        cardTitleDiv.textContent = "Title: " + book.title;

        const cardAuthorDiv = document.createElement("div");
        cardAuthorDiv.classList.add("cardAuthor");
        cardAuthorDiv.textContent = "Author: " + book.author;

        const cardPagesDiv = document.createElement("div");
        cardPagesDiv.classList.add("cardPages");
        cardPagesDiv.textContent = " Pages: " + book.pages;

        const cardReadDiv = document.createElement("div");
        cardReadDiv.classList.add("cardRead");
        if(book.read){
            cardReadDiv.textContent = "Book read? Yes";
        }
        else{
            cardReadDiv.textContent = "Book read? No";
        }
        // Append all created elements to the card
        card.appendChild(cardTitleDiv);
        card.appendChild(cardAuthorDiv);
        card.appendChild(cardPagesDiv);
        card.appendChild(cardReadDiv);

        // Create and append the Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = function() {
            myLibrary.splice(index, 1); // Remove the book from the array
            displayLibrary(); // Refresh the display
        };
        card.appendChild(deleteBtn);

        // Create and append the Toggle Read Status button
        const toggleReadBtn = document.createElement("button");
        toggleReadBtn.textContent = "Toggle Read Status";
        toggleReadBtn.onclick = function() {
            book.read = !book.read; // Toggle the read status
            displayLibrary(); // Refresh the display
        };
        card.appendChild(toggleReadBtn);

        // Append the card to the content section
        contentSection.appendChild(card);
    });
}

//NEW BOOK button function that adds in input options for creating book widgets within the array to be displayed
document.addEventListener("DOMContentLoaded", function() {

    const openDialogButton = document.getElementById("newBook");
    const dialog = document.getElementById("dialog");
    const bookForm = document.getElementById("bookForm");
  
    // Event listener to open the dialog when the button is clicked
    openDialogButton.addEventListener("click", function() {
        dialog.showModal();
    });
  
    // Event listener to handle form submission
    bookForm.addEventListener("submit", function(event) {
      event.preventDefault();
  
      // Get form values
      const title = document.getElementById("title").value;
      const author = document.getElementById("author").value;
      const pages = parseInt(document.getElementById("pages").value); // Parse as integer
      const read = document.getElementById("read").value === "true"; // Convert string to boolean
  
      // Add book to library
      addBookToLibrary(title, author, pages, read);
  
      // Close dialog
      console.log(document.getElementById('dialog').open);
      dialog.close();
      console.log(document.getElementById('dialog').open);
  
      // Refresh display
      displayLibrary();
    });
  });


