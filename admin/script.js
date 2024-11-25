
class author {
  constructor(name, lname, email, age, country) {
    this.name = name;
    this.lname = lname;
    this.email = email;
    this.age = age;
    this.country = country;
  }
}


class book {
  constructor(title, author, price, rating, description) {
    this.title = title;
    this.author = author;
    this.price = price;
    this.rating = rating;
    this.description = description;
    this.itavailable = true;
  }

  getSummary() {
    return `${this.title} was written by ${this.author} and he speaks about ${this.description}`;
  }
}



// const book1 = new book("The Alchemist", "Paulo Coelho", 10, 5, "The Alchemist follows the journey of an Andalusian shepherd");
// const book2 = new book( "The Da Vinci Code", "Dan Brown", 15, 4, "The Da Vinci Code is a 2003 mystery thriller novel by Dan Brown");
// const book3 = new book( "The Great Gatsby", "F. Scott Fitzgerald", 12, 3, "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald");
// const book4 = new book( "The Catcher in the Rye", "J.D. Salinger", 13, 4, "The Catcher in the Rye is a novel by J. D. Salinger");
// const book5 = new book( "The Alchemist", "Paulo Coelho", 10, 5, "The Alchemist follows the journey of an Andalusian shepherd");
// const book6 = new book( "The Da Vinci Code", "Dan Brown", 15, 4, "The Da Vinci Code is a 2003 mystery thriller novel by Dan Brown");
// books.push(book1, book2, book3, book4, book5, book6);

// /////////////////////////////  authors  ///////////////////////////////
// const author2 = new author( "chaker", "chaker", "chaker@gmail.com", 19, "algeria");
// const author3 = new author("ali", "ali", "ali@gmail.com", 20, "algeria");
// authors.push(author2, author3);


 function CheckAuthor() {

  
  const name = document.getElementById("Fname").value;
  const lname = document.getElementById("Lname").value;
  const email = document.getElementById("email").value;
  const age = document.getElementById("age").value;
  const country = document.getElementById("country").value;
  const error = document.getElementById("errorfield");
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if ( name === "" || lname === "" || email === "" || age === "" || country === "") {
    error.innerHTML = `<center><p class="error-msg"><b>Please fill all the fields</b></p></center>`;
    return 1;
  } 
  else if (!email.match(emailRegex)) {
    error.innerHTML = `<center><p class="error-msg"><b>Email is not valid</b></p></center>`;
    return 1;
  } 
  else if (age < 0 || age > 100 || isNaN(age)) {
    error.innerHTML = `<center><p class="error-msg"><b>Age must be between 0 and 100</b></p></center>`;
    return 1;
  } 
  else {
    error.innerHTML = "";
    return 0;
  }
}


// function showauthor() {
//   let tbody = document.getElementById("authorsTable");
//   let data = "";
//   authors.forEach((author) => {
//     data += `<tr class="bg-gray-2 text-left dark:bg-meta-4" >
//                     <td class="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11" >${author.name}</td>
//                     <td class="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11" >${author.lname}</td>
//                     <td class="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11" >${author.age}</td>
//                     <td class="px-4 py-4 font-medium text-black dark:text-white">${author.country}</td>
//                     <td min-w-[220px] px-4 py-4 font-medium text-black dark:text-white >${author.email}</td>

//                 </tr>`;
//   });
//   tbody.innerHTML = data;
// }

function SearchAuthor() {
  const search = document.getElementById("search").value;
  const error = document.getElementById("error");
  const tbody = document.getElementById("authorsTable");

  let i = 0;
  let data = "";
  authors.forEach((author) => {
    if(author.name === search || author.lname === search){
      data +=`
      <tr class="bg-gray-2 text-left dark:bg-meta-4" >
                    <td class="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11" >${author.name}</td>
                    <td class="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11" >${author.lname}</td>
                    <td class="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11" >${author.age}</td>
                    <td class="px-4 py-4 font-medium text-black dark:text-white">${author.country}</td>
                    <td min-w-[220px] px-4 py-4 font-medium text-black dark:text-white >${author.email}</td>
                    </tr>`;
    i++;
    }
  });
  if(i === 0) {
    error.innerHTML ='<p class="error-msg">User Unvailble</p>';
     data += '<td></td>';
    
  }
  tbody.innerHTML = data;
  if(search === ""){
      showauthor();
  }
}


function authorsnumber() {
  let a_Count = authors.length;
  const authorsid = document.getElementById("a-number");
  authorsid.innerHTML = `<h4 class="text-title-md font-bold text-black dark:text-white">${a_Count}</h4>`;
}


/////////////////////////////  books  ///////////////////////////////
function CheckAndSubmitBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("authors-select").value;
  const price = document.getElementById("price").value;
  const rating = document.getElementById("rating").value;
  const description = document.getElementById("description").value;
  const error = document.getElementById("errorfield");

  if ( title === "" || author === "" || price === "" || rating === "" || description === "") {
    error.innerHTML = `<center><p class="error-msg"><b>Please fill all the fields</b></p></center>`;
  } 
   else if (price < 0 || isNaN(price)) {
    error.innerHTML = `<center><p class="error-msg"><b>Price must be a positive number</b></p></center>`;
  } 
   else if (rating < 0 || rating > 5 || isNaN(rating)) {
    error.innerHTML = `<center><p class="error-msg"><b>Rating must be between 0 and 5</b></p></center>`;
  }
   else if (description.length < 10) {
    error.innerHTML = `<center><p class="error-msg"><b>Description must be more than 10 characters</b></p></center>`;
  }
   else {
      const book1 = new book(title, author, price, rating, description);
      books.push(book1);
      showbook();
      Postnewbook();
  }
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
                    <td class="px-4 py-4 font-medium text-black dark:text-white">${book.description}</td>`;
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
                                            <button class="inline-flex rounded-full bg-primary bg-opacity-10 px-3 py-1 text-sm font-medium text-primary" onclick="borrowBook(${i-1})">Borrow</button>
                                            <button class="inline-flex rounded-full bg-primary bg-opacity-10 px-3 py-1 text-sm font-medium text-primary" onclick="returnBook(${i-1})">Return</button>
                                        </td>
                                    </tr>`;
  });

  tbody.innerHTML = data;
}



function Postnewbook() {
  let card = document.getElementById("booksCard");
  let data1 = "";
  books.forEach((book) => {
    data1 += `            
    <div class="card1 phone-card rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div class="flex">
            <h1 class="text-title-md font-bold text-black dark:text-white">${book.title}</h1>
            </div>
            <br>
            <hr>
            <br>
            <p class="text-title" >${book.getSummary()}</p>
            <br>
            <hr>
            <br>
            <div class="flex" >
             <p class="price text-title font-bold text-black">DZ${
               book.price
             }</p>
              <p class="flex rating text-title font-bold text-black">${book.rating}'
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
               </svg>
              </p> 
            </div>
        </div>`;
        
  });
  card.innerHTML = data1;
}



function booksnumber() {
  let b_number = books.length;
  const booksid = document.getElementById("b-number");
  booksid.innerHTML = `<h4 class="text-title-md font-bold text-black dark:text-white">${b_number}</h4>`;
}


function getAuthors() {
  const authorSelect = document.getElementById("authors-select");
  authors.forEach((authors) => {
    const option = document.createElement("option");
    option.value = authors.name;
    option.textContent = authors.name;
    authorSelect.appendChild(option);
  });
}

function borrowBook(id) {
  let i = id;
  books[i].itavailable = false;
  showbook();
}

function returnBook(id) {
  let i = id;
  books[i].itavailable = true;
  showbook();
}

function SearchBook(){
   const search = document.getElementById("search").value;
   const error = document.getElementById("error");
   const tbody = document.getElementById("booksTable");

   let i = 0;
   let data = "";
   books.forEach((book) => {
     if(book.title === search){
       data += `<tr class="bg-gray-2 text-left dark:bg-meta-4" >
                    <td class="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11" >${book.title}</td>
                    <td class="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11" >${book.author}</td>
                    <td class="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11" >${book.price}</td>
                    <td class="px-4 py-4 font-medium text-black dark:text-white">${book.rating}</td>
                    <td class="px-4 py-4 font-medium text-black dark:text-white">${book.description}</td>`;
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
                                    </tr>
       `;
       i++;
     }
   });

   if(i === 0) {
    error.innerHTML ='<p class="error-msg">Book Unvailble</p>';
     data += '<td></td>';
   }
   tbody.innerHTML = data;
   if(search === ""){
       showbook();
   }

}