class author {
  constructor(name, lname, email, age, country) {
    this.name = name;
    this.lname = lname;
    this.email = email;
    this.age = age;
    this.country = country;
  }

  getBio() {
    return ` ${this.name} ${this.lname} is ${this.age} years old. He lives in ${this.country}`;
  }
}

class book {
  constructor(title, author, price, rating) {
    this.title = title;
    this.author = author;
    this.price = price;
    this.rating = rating;
    this.itavailable = true;
  }

  getSummary() {
    return `${this.title} was written by ${this.author} and has a rating of ${this.rating}`;
  }
}

const authors = [];
const author2 = new author(
  "chaker",
  "necibi",
  "chaker@gmail.com",
  19,
  "algeria"
);
authors.push(author2);
var authrsCount = 1;
var bookCount = 1;

booksnumber();
authorsnumber();
function submitauthor() {
  const name = document.getElementById("Fname").value;
  const lname = document.getElementById("Lname").value;
  const email = document.getElementById("email").value;
  const age = document.getElementById("age").value;
  const country = document.getElementById("country").value;

  const author1 = new author(name, lname, email, age, country);
  authors.push(author1);
  authrsCount++;
  showauthor();
}

// show the authors as a table in the html
function showauthor() {
  let tbody = document.getElementById("authorsTable");
  let data = "";
  authors.forEach((authors) => {
    data += `<tr class="bg-gray-2 text-left dark:bg-meta-4" >
                    <td class="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11" >${authors.name}</td>
                    <td class="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11" >${authors.lname}</td>
                    <td class="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11" >${authors.age}</td>
                    <td class="px-4 py-4 font-medium text-black dark:text-white">${authors.country}</td>
                    <td min-w-[220px] px-4 py-4 font-medium text-black dark:text-white >${authors.email}</td>

                </tr>`;
  });
  tbody.innerHTML = data;
}

const books = [];
const book1 = new book("The Alchemist", "Paulo Coelho", 10, 5);
books.push(book1);
function submitbook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("authors-select").value;
  const price = document.getElementById("price").value;
  const rating = document.getElementById("rating").value;

  const book1 = new book(title, author, price, rating);
  books.push(book1);
  bookCount++;
  showbook();
}

function showbook() {
  let tbody = document.getElementById("booksTable");
  let data = "";
  let i = 0;
  books.forEach((book) => {
    i++;
    data += `<tr class="bg-gray-2 text-left dark:bg-meta-4" >
                    <td class="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11" >${book.title}</td>
                    <td class="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11" >${book.author}</td>
                    <td class="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11" >${book.price}</td>
                    <td class="px-4 py-4 font-medium text-black dark:text-white">${book.rating}</td>
                                `;
    if (book.itavailable) {
      data += `<td class="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                                <p class="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success">
                                                Available
                                                </p>
                                            </td>`;
    } else {
      data += `<td class="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                                <p class="inline-flex rounded-full bg-warning bg-opacity-10 px-3 py-1 text-sm font-medium text-warning">
                                                    Not Available
                                                </p>
                                            </td>`;
    }
    data += `<td class="px-4 py-4 font-medium text-black dark:text-white">
                                            <button class="inline-flex rounded-full bg-primary bg-opacity-10 px-3 py-1 text-sm font-medium text-primary" onclick="borrowBook(${i})">Borrow</button>
                                            <button class="inline-flex rounded-full bg-primary bg-opacity-10 px-3 py-1 text-sm font-medium text-primary" onclick="returnBook(${i})">Return</button>
                                        </td>
                                    </tr>`;
  });
  tbody.innerHTML = data;
}

function booksnumber() {
  const booksid = document.getElementById("b-number");
  booksid.innerHTML = `<h4 class="text-title-md font-bold text-black dark:text-white">${bookCount}</h4>`;
}

function authorsnumber() {
  const authorsid = document.getElementById("a-number");
  authorsid.innerHTML = `<h4 class="text-title-md font-bold text-black dark:text-white">${authrsCount}</h4>`;
}

const authorSelect = document.getElementById("authors-select");
authors.forEach((authors) => {
  const option = document.createElement("option");
  option.value = authors.name;
  option.textContent = authors.name;
  authorSelect.appendChild(option);
});

function borrowBook(id) {
  let i = id - 1;
  books[i].itavailable = false;
  showbook();
}

function returnBook(id) {
  let i = id - 1;
  books[i].itavailable = true;
  showbook();
}
