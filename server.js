const express = require('express');
const app = express();
const port = 3000;


app.use(express.json());
app.use('/admin', express.static(__dirname + '/admin')); // Add this line

const authors = [];
 let author = {
    name: 'chaker',
    lname: 'necibi',
    email: 'chaker@gmail.com',
    age: 25,
    country: 'USA'
}
authors.push(author);

const books = [];
let book = {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    price: 10,
    rating: 4.5,
    description: 'The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan, of lavish parties on Long Island at a time when The New York Times noted "gin was the national drink',
    itavailable: true
}
books.push(book);


app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html');
})

// author

app.get('/authors',(req,res) => {
    res.status(200).sendFile(__dirname + '/admin/Authors-list.html')
})

app.post('/authors', (req,res) => {
    const author = req.body; 
    authors.push(author)
    res.status(201).send('Author added!');
})

app.get('/api/authors', (req, res) => {
    // res.json(authors);
    res.send(authors);
});



// book

app.get('/books',(req,res) => {
    res.status(200).sendFile(__dirname + '/admin/Books-list.html')
    // res.json(books);
})

app.post('/books', (req,res) => {
    const book = req.body; 
    books.push(book)
    res.status(201).send('Book added!');
})

app.get('/api/books', (req, res) => {
    res.json(books);
})



// delete

// app.delete('/users/:id', (req,res) => {
//     const { id } = req.params
//     const finduser = users.find((x) => x.id === id);

//     if(finduser == -1){
//         res.status(404).send('User not found!');
//         return
//     }
//     users.splice(finduser,1);
//     res.status(200).send('Deleted!');
// })

app.listen(port, () => {
    console.log('Server is running on port 3000');
});