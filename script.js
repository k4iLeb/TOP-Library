// const books = [];
const books = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    pages: "320",
    read: false,
    data: "2025221161135924",
  },
];

console.log(books);

// **** SELECTORS ****

const input = document.querySelectorAll("input");
const submit = document.querySelector(".submit");
const inputCard = document.querySelector(".input");
const addBook = document.querySelector(".addBook");
const library = document.querySelector(".library");

// **** LISTENERS ****

submit.addEventListener("click", addBookToLibrary);

addBook.addEventListener("click", showForm);

// **** DISPLAY BOOKS ****
displayBooks();

// **** FUNCTIONS ****

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.data = createData();
}

function createData() {
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

  input.forEach((x) => (x.value = ""));
  books.push(book);
  inputCard.style.visibility = "hidden";

  // console.log(books);
  displayBooks();
}

function displayBooks() {
  library.innerHTML = "";
  books.forEach(({ title, author, pages, read, data }) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data", `${data}`);

    const titleEl = document.createElement("p");
    titleEl.classList.add("title");
    titleEl.textContent = title;

    const authorEl = document.createElement("p");
    authorEl.classList.add("author");
    authorEl.textContent = `by ${author}`;

    const pagesEl = document.createElement("p");
    pagesEl.classList.add("pages");
    pagesEl.textContent = `${pages} pages`;

    const readEl = document.createElement("div");
    readEl.classList.add("status");
    readEl.textContent = read ? "Read" : "Not Read";

    const delEl = document.createElement("button");
    delEl.classList.add("del-button");
    delEl.innerText = `X`;
    delEl.addEventListener("click", () => {
      books.forEach((x) => {
        if (x.data == delEl.parentElement.attributes[1].value) {
          books.splice(books.indexOf(x), 1);
          displayBooks();
        }
      });
    });

    const toggleButton = document.createElement("button");
    toggleButton.classList.add("toggle-btn");
    toggleButton.textContent = read ? "Mark as Unread" : "Mark as Read";
    // *** WIP: ADD TOGGLE FUNCTIONALITY ***

    readEl.append(toggleButton);
    card.append(titleEl, authorEl, pagesEl, readEl, delEl);
    library.appendChild(card);
  });
}
