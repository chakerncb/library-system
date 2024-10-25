
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





const author1 = new author('chaker', 'necibi', 'chaker@gmail.com', 19, 'algeria');

const book1 = new book('book1', author1.name, 20, 4.5);

console.log(book1.getSummary());