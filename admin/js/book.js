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

document.addEventListener('DOMContentLoaded', async () => {
  getAuthors();
});



document.getElementById('bookForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("authors-select").value;
    const price = document.getElementById("price").value;
    const rating = document.getElementById("rating").value;
    const description = document.getElementById("description").value;
    const error = document.getElementById("errorfield");

    if (CheckBook() === 0) {
      const book1 = new book(title, author, price, rating, description);
      document.getElementById('bookForm').reset();
      alert('Book added!');

      try {
        const response = await fetch('/books', {

          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(book1)
        });

      } catch (error) {
        console.error('Error submitting author:', error);
      }
    }
  });



function CheckBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("authors-select").value;
  const price = document.getElementById("price").value;
  const rating = document.getElementById("rating").value;
  const description = document.getElementById("description").value;
  const error = document.getElementById("errorfield");

  if ( title === "" || author === "" || price === "" || rating === "" || description === "") {
    error.innerHTML = `<center><p class="error-msg"><b>Please fill all the fields</b></p></center>`;
    return 1;
  } 
   else if (price < 0 || isNaN(price)) {
    error.innerHTML = `<center><p class="error-msg"><b>Price must be a positive number</b></p></center>`;
    return 1;
  } 
   else if (rating < 0 || rating > 5 || isNaN(rating)) {
    error.innerHTML = `<center><p class="error-msg"><b>Rating must be between 0 and 5</b></p></center>`;
    return 1;
  }
   else if (description.length < 10) {
    error.innerHTML = `<center><p class="error-msg"><b>Description must be more than 10 characters</b></p></center>`;
    return 1;
  }
   else {
      error.innerHTML = "";
      return 0;
  }
}



document.addEventListener('submit', async () => {
  const booksTable = document.getElementById('booksTable');

  try {
    const response = await fetch('/api/books');
    const books = await response.json();

    booksTable.innerHTML = ''; // Clear existing rows
    books.forEach(book => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td class="px-4 py-4">${book.title}</td>
          <td class="px-4 py-4">${book.author}</td>
          <td class="px-4 py-4">${book.price}</td>
          <td class="px-4 py-4">${book.rating}</td>
          <td class="px-4 py-4">${book.description}</td>
          <td class="px-4 py-4">${book.itavailable ? 'Available' : 'Not Available'}</td>
          <td class="px-4 py-4">
              <button class="inline-flex rounded-full bg-primary bg-opacity-10 px-3 py-1 text-sm font-medium text-primary" onclick="borrowBook(${books.indexOf(book)})">Borrow</button>
              <button class="inline-flex rounded-full bg-primary bg-opacity-10 px-3 py-1 text-sm font-medium text-primary" onclick="returnBook(${books.indexOf(book)})">Return</button>
          </td>
      `;
      booksTable.appendChild(row);
    });
  } catch (error) {
    console.error('Error fetching books:', error);
  }
});

// async function borrowBook(id) {
//   let i = id;
//   const form = document.getElementById('bookForm');
//   try {
//     const response = await fetch('/api/books');
//     const books = await response.json();
//     books[i].itavailable = false;
//     form.submit();
//   }
//   catch (error) {
//     console.error('Error fetching books:', error);
//   }
    
// }

// function returnBook(id) {
//   let i = id;
//   books[i].itavailable = true;
//   showbook();
// }



async function getAuthors() {
  const authorSelect = document.getElementById("authors-select");
  try {
    const response = await fetch('/api/authors');
    const authors = await response.json();
    authors.forEach((author) => {
      const option = document.createElement("option");
      option.value = author.name;
      option.textContent = author.name;
      authorSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error fetching authors:', error);
  }
}


 async function SearchBook(){
   const search = document.getElementById("search").value;
   const error = document.getElementById("error");
   const tbody = document.getElementById("booksTable");

   let i = 0;
   let data = "";

   try {
       const response = await fetch('/api/books');
       const books = await response.json();

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

   if(i === 0 && search !== "") {
    error.innerHTML ='<p class="error-msg">Book Unvailble</p>';
     data += '<td></td>';
   }
   tbody.innerHTML = data;
   if(search === ""){
    error.innerHTML = "";
    booksTable.innerHTML = ''; // Clear existing rows
    books.forEach(book => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td class="px-4 py-4">${book.title}</td>
          <td class="px-4 py-4">${book.author}</td>
          <td class="px-4 py-4">${book.price}</td>
          <td class="px-4 py-4">${book.rating}</td>
          <td class="px-4 py-4">${book.description}</td>
          <td class="px-4 py-4">${book.itavailable ? 'Available' : 'Not Available'}</td>
          <td class="px-4 py-4">
              <button class="inline-flex rounded-full bg-primary bg-opacity-10 px-3 py-1 text-sm font-medium text-primary" onclick="borrowBook(${books.indexOf(book)})">Borrow</button>
              <button class="inline-flex rounded-full bg-primary bg-opacity-10 px-3 py-1 text-sm font-medium text-primary" onclick="returnBook(${books.indexOf(book)})">Return</button>
          </td>
      `;
      booksTable.appendChild(row);
    });
   }
  } catch (error) {
    console.error('Error fetching books:', error);
  }
}