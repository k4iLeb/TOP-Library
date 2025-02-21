const books = [];

// **** SELECTORS ****

const input = document.querySelectorAll("input");
const submit = document.querySelector(".submit");
const inputCard = document.querySelector(".input");
const addBook = document.querySelector(".addBook");

// **** LISTENERS ****

submit.addEventListener("click", addBookToLibrary);

addBook.addEventListener("click", showForm);

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

  console.log(books);
}
