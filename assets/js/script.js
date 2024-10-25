
class author {
     constructor (name , lname, email, age, country) {
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
    constructor (title, author, price, rating) {
        this.title = title;
        this.author = author;
        this.price = price;
        this.rating = rating;
        this.itavailable = true;
    }

    getSummary() {
        return `${this.title} was written by ${this.author} and has a rating of ${this.rating}`;
    }

    borrowBook() {

        if (this.itavailable) {
            this.itavailable = false;
            return `${this.title} is now borrowed`;
        } else {
            return `${this.title} is not available`;
        }

    }

    returnBook() {

        if (this.itavailable) {
            return `${this.title} is already available`;
        } else {
            this.itavailable = true;
            return `${this.title} is now returned`;
        }

    }
}


const authors = [];


function submitauthor() {
   const name = document.getElementById('Fname').value;
    const lname = document.getElementById('Lname').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const country = document.getElementById('country').value;



    const author1 = new author(name, lname, email, age, country);
    authors.push(author1);
    showauthor();

}


// show the authors as a table in the html
function showauthor() {
    let tbody = document.getElementById('authorsTable');
    let data = '';
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

showauthor();



