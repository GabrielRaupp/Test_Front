import express from 'express';
import mongoose from 'mongoose'; 
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const uri = process.env.MONGODB_URI || "mongodb+srv://Gabriel:qVeyehZk9ydz3eRZ@cluster0.imngu.mongodb.net/myDatabase?retryWrites=true&w=majority";

mongoose.connect(uri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  writeConcern: { w: "majority", j: true } 
})
  .then(() => console.log('Conectado ao MongoDB Atlas com sucesso!'))
  .catch((error) => console.error('Erro ao conectar ao MongoDB:', error));

const HorarioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  horarios: { type: String, required: true }, 
  category: {
    name: String,
  },
});

const Horario = mongoose.model('Horario', HorarioSchema);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  email: { type: String, required: true, unique: true }
});

const User = mongoose.model('User', userSchema);

app.get('/horarios', async (req, res) => {
  try {
    const horarios = await Horario.find();
    res.json(horarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/horarios/:id', async (req, res) => {
  try {
    const horario = await Horario.findById(req.params.id);
    if (!horario) {
      return res.status(404).json({ message: 'Horário não encontrado' });
    }
    res.json(horario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/horarios', async (req, res) => {
  try {
    const { name, horarios, category } = req.body; 
    if (!name || !horarios || !category) {
      throw new Error('Campos obrigatórios não preenchidos');
    }
    const horario = new Horario({
      name,
      horarios,
      category: { name: category },
    });
    const newHorario = await horario.save();
    res.status(201).json(newHorario);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

app.put('/horarios/:id', async (req, res) => {
  try {
    const updatedHorario = await Horario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedHorario) {
      return res.status(404).json({ message: 'Horário não encontrado' });
    }
    res.json(updatedHorario);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/horarios/:id', async (req, res) => {
  try {
    const horario = await Horario.findByIdAndDelete(req.params.id);
    if (!horario) {
      return res.status(404).json({ message: 'Horário não encontrado' });
    }
    res.json({ message: 'Horário removido com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/register', async (req, res) => {
  try {
    const { username, password, name, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); 
    const user = new User({ username, password: hashedPassword, name, email });
    await user.save();
    res.json({ message: 'Usuário criado com sucesso!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Senha inválida' });
    }
    res.json({ message: 'Usuário logado com sucesso!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
