const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

app.use(bodyParser.json());

const books = [];
let nextId = 1;
const SECRET_KEY = "lkajfbooklkajd";

// Middleware to verify JWT
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied");

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).send("Invalid token");
    req.user = user;
    next();
  });
}

// User login route to get JWT
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  // For simplicity, we'll just check for a hardcoded username and password
  if (username === "pankajgupta" && password === "pankaj@express") {
    const user = { name: username };
    const token = jwt.sign(user, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(403).send("Invalid credentials");
  }
});

// Create book
app.post("/books", authenticateToken, (req, res) => {
  const { title, author } = req.body;
  const newBook = { id: nextId++, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Retrieve books
app.get("/books", authenticateToken, (req, res) => {
  res.json(books);
});

// Retrieve a single book by ID
app.get("/books/:id", authenticateToken, (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send("Book not found");
  res.json(book);
});

// Update book
app.put("/books/:id", authenticateToken, (req, res) => {
  const book = books.find((f) => f.id === parseInt(req.params.id));
  if (!book) return res.status(404).send("Book not found");

  const { title, author } = req.body;
  book.title = title || book.title;
  book.author = author || book.author;
  res.json(book);
});

// Delete book
app.delete("/books/:id", authenticateToken, (req, res) => {
  const index = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send("Book not found");
  const deletedBook = books.splice(index, 1);
  res.json(deletedBook);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
