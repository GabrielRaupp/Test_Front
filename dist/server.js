"use strict";

var _express = _interopRequireDefault(require("express"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _cors = _interopRequireDefault(require("cors"));
var _path = _interopRequireDefault(require("path"));
var _url = require("url");
var _mongodb = require("mongodb");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Configuração do __dirname e __filename para ES Modules
const _filename = (0, _url.fileURLToPath)(import.meta.url);
const _dirname = _path.default.dirname(_filename);
const app = (0, _express.default)();
const PORT = process.env.PORT || 3000;
app.use(_express.default.json());
app.use((0, _cors.default)());

// Configuração da conexão com MongoDB Atlas
const uri = "mongodb+srv://Gabriel:qVeyehZk9ydz3eRZ@cluster0.imngu.mongodb.net/myDatabase?retryWrites=true&w=majority";
const client = new _mongodb.MongoClient(uri, {
  serverApi: {
    version: _mongodb.ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});
async function run() {
  try {
    await client.connect();
    console.log("Conectado ao MongoDB Atlas com sucesso!");
    await client.db("admin").command({
      ping: 1
    });
    console.log("Ping bem-sucedido ao MongoDB!");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
  }
}
run().catch(console.dir);

// Definição do schema para Horarios
const HorarioSchema = new _mongoose.default.Schema({
  name: String,
  budget: Number,
  cost: Number,
  category: {
    name: String
  },
  services: [{
    id: String,
    name: String,
    cost: Number,
    description: String
  }]
});
const Horario = _mongoose.default.model('Horario', HorarioSchema);

// Rotas para Horarios
app.get('/horarios', async (req, res) => {
  try {
    const horarios = await Horario.find();
    res.json(horarios);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Servir os arquivos estáticos da aplicação React (da pasta 'dist')
app.use(_express.default.static(_path.default.join(_dirname, '/home/redes/Gabriel_Raupp/Test_Front/dist')));

// Rota para servir o 'index.html' da aplicação React
app.get('*', (req, res) => {
  res.sendFile(_path.default.join(_dirname, '/home/redes/Gabriel_Raupp/Test_Front/dist', 'index.html'));
});

// Iniciando o servidor
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));