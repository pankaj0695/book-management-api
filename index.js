const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
const port = 3000;

app.use(bodyParser.json());

const users = [];
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

// User registration route
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  // Check if user already exists
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(400).send("User already exists");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { username, password: hashedPassword };
  users.push(newUser);

  res.status(201).send("User registered successfully");
});

// User login route to get JWT
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(403).send("Invalid username");
  }

  // Check password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(403).send("Invalid password");
  }

  const token = jwt.sign({ name: username }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
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
