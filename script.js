const books = [];

// **** SELECTORS ****

const input = document.querySelectorAll("input");
const submit = document.querySelector(".submit");
const inputCard = document.querySelector(".input");
const addBook = document.querySelector(".addBook");
const library = document.querySelector(".library");

// **** LISTENERS ****

submit.addEventListener("click", addBookToLibrary);

addBook.addEventListener("click", showForm);

document.addEventListener("click", (e) => {
  if (inputCard.contains(e.target) || addBook.contains(e.target)) {
  } else {
    resetInput();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key == "Escape") resetInput();
});

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

  createData() {
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
  }

  toggleRead = () => {
    return (this.read = !this.read);
  };
}

books.push(
  new Book("Atomic Habits", "James Clear", "320", false),
  new Book("So Good They Can't Ignore You", "Cal Newport", "305", false),
  new Book("The Subtle Art of Not Giving a F*ck", "Mark Manson", "212", true)
);

// console.log(books);

// console.log(new Book("Atomic Habits", "James Clear", "320", false));

// **** FUNCTIONS ****

function showForm() {
  inputCard.style.visibility = "visible";
}

function addBookToLibrary() {
  const book = new Book(
    input[0].value,
    input[1].value,
    input[2].value,
    input[3].checked
  );

  books.push(book);
  resetInput();

  displayBooks();
}

function resetInput() {
  input.forEach((x) => {
    x.value = "";
    x.checked = false;
  });
  inputCard.style.visibility = "hidden";
}

function displayBooks() {
  library.innerHTML = "";
  books.forEach((book) => {
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
      books.forEach((x, index) => {
        let data = e.target.parentElement.attributes[1].value;
        if (x.data == data) {
          books.splice(index, 1);
          displayBooks();
        }
      });
    });

    const toggleButton = document.createElement("button");
    toggleButton.classList.add("toggle-btn");
    toggleButton.textContent = read ? "Mark as Unread" : "Mark as Read";

    toggleButton.addEventListener("click", (e) => {
      const data = e.target.parentElement.parentElement.attributes[1].value;
      books.forEach((x) => {
        if (x.data == data) {
          x.toggleRead();
          displayBooks();
        }
      });
    });

    readEl.append(readSp, toggleButton);
    card.append(titleEl, authorEl, pagesEl, readEl, delEl);
    library.appendChild(card);
  });
}

// **** DISPLAY BOOKS ****
displayBooks();
