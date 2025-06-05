require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado ao MongoDB Atlas via .env'))
.catch(err => console.error('❌ Erro na conexão:', err));

const Book = mongoose.model('Book', {
  name: String,
  description: String,
  photo: String,
  latitude: Number,
  longitude: Number,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage: storage });

app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar livros' });
  }
});

app.post('/books', upload.single('photo'), async (req, res) => {
  try {
    const { name, description, latitude, longitude } = req.body;
    const photo = req.file ? req.file.path : null;
    const book = new Book({ name, description, photo, latitude, longitude });
    await book.save();
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao salvar livro' });
  }
});

app.listen(3000, () => console.log('🚀 Backend listening on port 3000'));
