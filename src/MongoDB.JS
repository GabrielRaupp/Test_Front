const { MongoClient } = require('mongodb');

async function main() {
const uri = "mongodb+srv://Gabriel:qVeyehZk9ydz3eRZ@cluster0.imngu.mongodb.net/myDatabase?retryWrites=true&w=majority";

  
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Conectado ao MongoDB!");

    const database = client.db('TCC'); 
    const collection = database.collection('horario'); 

    const result = await collection.insertOne({ nome: "Teste", valor: 42 });
    console.log(`Documento inserido com o id: ${result.insertedId}`);

  } catch (error) {
    console.error("Erro ao conectar ao MongoDB ou inserir documento:", error);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
