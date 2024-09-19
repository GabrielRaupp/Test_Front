import express from 'express';
import mongoose from 'mongoose'; 
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { MongoClient, ServerApiVersion } from 'mongodb';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const uri = "mongodb+srv://Gabriel:qVeyehZk9ydz3eRZ@cluster0.imngu.mongodb.net/myDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect(); 
    console.log("Conectado ao MongoDB Atlas com sucesso!");

    await client.db("admin").command({ ping: 1 });
    console.log("Ping bem-sucedido ao MongoDB!");
    

  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
  }
}

run().catch(console.dir);

const HorarioSchema = new mongoose.Schema({
  name: String,
  budget: Number,
  cost: Number,
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

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
