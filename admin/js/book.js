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

// document.addEventListener('submit', async () => {
//   const booksTable = document.getElementById('booksTable');

//   try {
//     const response = await fetch('/api/books');
//     const books = await response.json();

//     booksTable.innerHTML = ''; // Clear existing rows
//     books.forEach(book => {
//       const row = document.createElement('tr');
//       row.innerHTML = `
//           <td class="px-4 py-4">${book.title}</td>
//           <td class="px-4 py-4">${book.author}</td>
//           <td class="px-4 py-4">${book.price}</td>
//           <td class="px-4 py-4">${book.rating}</td>
//           <td class="px-4 py-4">${book.description}</td>
//           <td class="px-4 py-4">${book.itavailable}</td>
//       `;
//       booksTable.appendChild(row);
//     });
//   } catch (error) {
//     console.error('Error fetching books:', error);
//   }
  
// });







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



async function Postnewbook() {
  let card = document.getElementById("booksCard");
  let data1 = "";

  try {
    const response = await fetch('/api/books');
    const books = await response.json(); 
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
catch (error) {
  console.error('Error fetching books:', error);
}
}




// function booksnumber() {
//   let b_number = books.length;
//   const booksid = document.getElementById("b-number");
//   booksid.innerHTML = `<h4 class="text-title-md font-bold text-black dark:text-white">${b_number}</h4>`;
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