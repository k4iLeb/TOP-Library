// **** CLASSES ****
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.data =
      this.title.slice(0, 2).toLowerCase() +
      this.author.slice(0, 2).toLowerCase() +
      this.createData();
  }

  createData = () => {
    const date = new Date();
    const [year, month, day, hrs, mins, secs, ms] = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds(),
    ];
    const data = [
      year.toString(),
      month.toString(),
      day.toString(),
      hrs.toString(),
      mins.toString(),
      secs.toString(),
      ms.toString(),
    ];

    return data.join("");
  };

  toggleRead = () => {
    this.read = !this.read;
  };
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook = (book) => {
    this.books.push(book);
  };

  removeBook = (id) => {
    this.books = this.books.filter((book) => book.data !== id);
  };

  get getBooks() {
    return this.books;
  }
}

class Display {
  constructor(library) {
    this.library = library;
  }

  showForm = () => {
    inputCard.style.visibility = "visible";
  };

  resetInput = () => {
    input.forEach((x) => {
      x.value = "";
      x.checked = false;
    });
    inputCard.style.visibility = "hidden";
  };

  showBooks = () => {
    libraryDiv.innerHTML = "";

    this.library.getBooks.forEach((book) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.setAttribute("data", `${book.data}`);

      const titleEl = document.createElement("p");
      titleEl.classList.add("title");
      titleEl.textContent = book.title;

      const authorEl = document.createElement("p");
      authorEl.classList.add("author");
      authorEl.textContent = `by ${book.author}`;

      const pagesEl = document.createElement("p");
      pagesEl.classList.add("pages");
      pagesEl.textContent = `${book.pages} pages`;

      const readEl = document.createElement("div");
      readEl.classList.add("status");

      const readSp = document.createElement("span");
      readSp.classList.add("status");
      readSp.textContent = book.read ? "Read" : "Not Read";
      readSp.style.backgroundColor = book.read
        ? "rgba(68, 250, 129, 0.699)"
        : "rgba(250, 68, 92, 0.699)";

      const delEl = document.createElement("button");
      delEl.classList.add("del-button");
      delEl.innerText = `X`;
      delEl.addEventListener("click", (e) => {
        this.library.getBooks.forEach((x) => {
          let data = e.target.parentElement.attributes[1].value;
          if (x.data == data) {
            this.library.removeBook(data);
          }
        });
        display.showBooks();
      });

      const toggleButton = document.createElement("button");
      toggleButton.classList.add("toggle-btn");
      toggleButton.textContent = book.read ? "Mark as Unread" : "Mark as Read";

      toggleButton.addEventListener("click", (e) => {
        const data = e.target.parentElement.parentElement.attributes[1].value;
        const selectedBook = this.library.getBooks.find((x) => x.data === data);
        selectedBook.toggleRead();
        display.showBooks();
      });

      readEl.append(readSp, toggleButton);
      card.append(titleEl, authorEl, pagesEl, readEl, delEl);
      libraryDiv.appendChild(card);
    });
  };
}

// **** INITIALIZATION ****
const myLibrary = new Library();
const display = new Display(myLibrary);

myLibrary.addBook(new Book("Atomic Habits", "James Clear", "320", false));
myLibrary.addBook(
  new Book("So Good They Can't Ignore You", "Cal Newport", "305", false)
);
myLibrary.addBook(
  new Book("The Subtle Art of Not Giving a F*ck", "Mark Manson", "212", true)
);

// **** SELECTORS ****

const input = document.querySelectorAll("input");
const submit = document.querySelector(".submit");
const inputCard = document.querySelector(".input");
const addBook = document.querySelector(".addBook");
const libraryDiv = document.querySelector(".library");

// **** LISTENERS ****

submit.addEventListener("click", () => {
  const book = new Book(
    input[0].value,
    input[1].value,
    input[2].value,
    input[3].checked
  );
  myLibrary.addBook(book);
  display.resetInput();
  display.showBooks();
});

addBook.addEventListener("click", display.showForm);

document.addEventListener("click", (e) => {
  if (inputCard.contains(e.target) || addBook.contains(e.target)) {
  } else {
    display.resetInput();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key == "Escape") display.resetInput();
});

// **** DISPLAY BOOKS ****

display.showBooks();
