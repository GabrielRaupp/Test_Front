import express from 'express';
import mongoose from 'mongoose'; 
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Use a variável de ambiente para a URI do MongoDB
const uri = process.env.MONGODB_URI || "mongodb+srv://Gabriel:qVeyehZk9ydz3eRZ@cluster0.imngu.mongodb.net/myDatabase?retryWrites=true&w=majority";

mongoose.connect(uri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  writeConcern: { w: "majority", j: true } // Adiciona writeConcern conforme recomendado
})
  .then(() => console.log('Conectado ao MongoDB Atlas com sucesso!'))
  .catch((error) => console.error('Erro ao conectar ao MongoDB:', error));

// Definição do Schema e Model
const HorarioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  budget: { type: Number, required: true },
  cost: { type: Number, default: 0 },
  category: {
    name: String,
  },
  services: [
    {
      id: String,
      name: String,
      cost: Number,
      description: String,
    },
  ],
});

const Horario = mongoose.model('Horario', HorarioSchema);

// Endpoints de API
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
  const { name, budget, category } = req.body;

  const horario = new Horario({
    name,
    budget,
    category,
    services: [],
  });

  try {
    const newHorario = await horario.save();
    res.status(201).json(newHorario);
  } catch (error) {
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

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));