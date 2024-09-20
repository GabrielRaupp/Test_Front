import express from 'express';
import mongoose from 'mongoose'; 
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { MongoClient, ServerApiVersion } from 'mongodb';

// Configuração do __dirname e __filename para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Configuração da conexão com MongoDB Atlas
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

// Definição do schema para Horarios
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

// Rotas para Horarios
app.get('/horarios', async (req, res) => {
  try {
    const horarios = await Horario.find();
    res.json(horarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Servir os arquivos estáticos da aplicação React (da pasta 'dist')
app.use(express.static(path.join(__dirname, '/home/redes/Gabriel_Raupp/Test_Front/dist')));

// Rota para servir o 'index.html' da aplicação React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/home/redes/Gabriel_Raupp/Test_Front/dist', 'index.html'));
});

// Iniciando o servidor
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
