import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve o caminho do diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Conectar ao MongoDB
const uri = 'mongodb+srv://Gabriel:01102005Br@cluster0.mongodb.net/TCC?retryWrites=true&w=majority';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado ao MongoDB Atlas com sucesso!'))
  .catch((error) => console.error('Erro ao conectar ao MongoDB Atlas:', error));

// Serve os arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, 'build')));

// Rotas API
const HorarioSchema = new mongoose.Schema({
  name: String,
  budget: Number,
  cost: Number,
  category: {
    name: String
  },
  services: [
    {
      id: String,
      name: String,
      cost: Number,
      description: String
    }
  ]
});

const Horario = mongoose.model('Horario', HorarioSchema);

app.get('/horarios', async (req, res) => {
  try {
    const horarios = await Horario.find();
    res.json(horarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/horarios', async (req, res) => {
  const horario = new Horario(req.body);
  try {
    const newHorario = await horario.save();
    res.status(201).json(newHorario);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/horarios/:id', async (req, res) => {
  try {
    const horario = await Horario.findById(req.params.id);
    if (!horario) return res.status(404).json({ message: 'Horário não encontrado' });
    res.json(horario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/horarios/:id', async (req, res) => {
  try {
    const horario = await Horario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!horario) return res.status(404).json({ message: 'Horário não encontrado' });
    res.json(horario);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/horarios/:id', async (req, res) => {
  try {
    const horario = await Horario.findByIdAndDelete(req.params.id);
    if (!horario) return res.status(404).json({ message: 'Horário não encontrado' });
    res.json({ message: 'Horário removido com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rota para arquivos estáticos (React)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
