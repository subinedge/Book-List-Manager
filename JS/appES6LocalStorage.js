// two constructors, here two classes

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    // getting the div ID, place where the results are shown
    const list = document.getElementById('book-list');

    // create a TR row element
    const row = document.createElement('tr');

    // console.log(row);

    row.innerHTML = `<td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" style="text-decoration:none" class="delete">X</a></td>`;

    list.appendChild(row);
  }

  showAlert(msg, className) {
    const div = document.createElement('div');

    div.className = `alert ${className}`;

    div.appendChild(document.createTextNode(msg));

    //insert it to the DOM, so get the PARENT ELEMENT (CONTAINER)
    const container = document.querySelector('.container');

    // have to insert it before the form
    const form = document.querySelector('#myForm');

    //insert before form with reference to container
    container.insertBefore(div, form);

    setTimeout(function() {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === 'delete') {
      //event delegation
      // .. have to delete the TR .. for that .. get the <a> tag,
      // then, see the parent element for that ... <td> and <tr>.. two parents... to delete a book, need to delete the td and tr ..
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    title.value = '';
    author.value = '';
    isbn.value = '';
  }
}

// Local Storage class

class LocalStorage {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static displayBooks() {}

  static addBook(book) {
    const books = LocalStorage.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook() {}
}

//Event listener for book add
document.getElementById('myForm').addEventListener('submit', function(e) {
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  // instantiate book constructor .. pass those input box values to the book object
  const book = new Book(title, author, isbn);

  // instantiate UI object
  const ui = new UI();

  //empty input fields check

  if (title === '' || author === '' || isbn === '') {
    ui.showAlert('Please fill those asswhooping fields !!', 'error');
  } else {
    // add book to list
    ui.addBookToList(book);

    // add book to Local Storage
    LocalStorage.getBooks(book);

    // add success alert after adding a book
    ui.showAlert('Sucessfully Added a book !!', 'success');

    // clear the input fields
    ui.clearFields();
  }

  e.preventDefault();
});

// event listener for book delete on clicking X
document.getElementById('book-list').addEventListener('click', function(e) {
  // have to instantiate the UI obj second time to use it here
  const ui = new UI();

  // delete book
  ui.deleteBook(e.target);

  //show success message on deleting the book
  ui.showAlert('Book Removed !!', 'success');

  e.preventDefault();
});
