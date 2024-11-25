class author {
    constructor(name, lname, email, age, country) {
      this.name = name;
      this.lname = lname;
      this.email = email;
      this.age = age;
      this.country = country;
    }
  }

document.getElementById('authorForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const name = document.getElementById('Fname').value;
    const lname = document.getElementById('Lname').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const country = document.getElementById('country').value;
  
    if (CheckAuthor() === 0) {
  
    const author1 = new author(name, lname, email, age, country);
  
      try {
        const response = await fetch('/authors' , {
  
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify(author1)
        });
  
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error submitting author:', error);
      }
  
    }
    else {
      // document.getElementById('errorfield').innerHTML = 'Please fill all the fields';
    }
  
  
  });
  
  document.addEventListener('submit', async () => {
      const authorsTable = document.getElementById('authorsTable');
  
      try {
          const response = await fetch('/api/authors');
          const authors = await response.json();
  
          authorsTable.innerHTML = ''; // Clear existing rows
          authors.forEach(author => {
              const row = document.createElement('tr');
              row.innerHTML = `
                  <td class="px-4 py-4">${author.name}</td>
                  <td class="px-4 py-4">${author.lname}</td>
                  <td class="px-4 py-4">${author.age}</td>
                  <td class="px-4 py-4">${author.country}</td>
                  <td class="px-4 py-4">${author.email}</td>
              `;
              authorsTable.appendChild(row);
          });
      } catch (error) {
          console.error('Error fetching authors:', error);
      }
      
  });

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

  async function SearchAuthor() {
    const search = document.getElementById("search").value;
    const error = document.getElementById("error");
    const tbody = document.getElementById("authorsTable");
  
    let i = 0;
    let data = "";

    try {
        const response = await fetch('/api/authors');
        const authors = await response.json();

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
    if(i === 0 && search !== "") {
      error.innerHTML ='<p class="error-msg">User Unvailble</p>';
       data += '<td></td>';
      
    }
    tbody.innerHTML = data;
    if(search === ""){
        authorsTable.innerHTML = ''; // Clear existing rows
          authors.forEach(author => {
              const row = document.createElement('tr');
              row.innerHTML = `
                  <td class="px-4 py-4">${author.name}</td>
                  <td class="px-4 py-4">${author.lname}</td>
                  <td class="px-4 py-4">${author.age}</td>
                  <td class="px-4 py-4">${author.country}</td>
                  <td class="px-4 py-4">${author.email}</td>
              `;
              authorsTable.appendChild(row);
          });
    }

} catch (error) {
    console.error('Error fetching authors:', error);

}
  }
  
