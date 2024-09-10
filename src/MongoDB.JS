const { MongoClient } = require('mongodb');

async function main() {
  const uri = "mongodb://localhost:27017"; // Para MongoDB local
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Conectado ao MongoDB!");

    const database = client.db('meuBancoDeDados');
    const collection = database.collection('minhaColecao');

    const result = await collection.insertOne({ nome: "Teste", valor: 42 });
    console.log(`Documento inserido com o id: ${result.insertedId}`);

  } finally {
    await client.close();
  }
}

main().catch(console.error);
