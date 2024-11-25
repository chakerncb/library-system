const express = require('express');
const app = express();
const port = 3000;


app.use(express.json());
app.use('/admin', express.static(__dirname + '/admin')); // Add this line

const authors = [];
const books = [];

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html');
})

// author

app.get('/authors',(req,res) => {
    res.sendFile(__dirname + '/admin/Authors-list.html')
    // res.json(authors);
})

app.get('/api/authors', (req, res) => {
    res.json(authors);
});

app.post('/authors', (req,res) => {
    const author = req.body; 
    authors.push(author)
    res.status(201).send('Author added!');
})

// book

app.get('/books',(req,res) => {
    res.sendFile(__dirname + '/admin/Books-list.html')
    // res.json(books);
})

app.get('/api/books', (req, res) => {
    res.json(books);
})

app.post('/books', (req,res) => {
    const book = req.body; 
    books.push(book)
    res.status(201).send('Book added!');
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