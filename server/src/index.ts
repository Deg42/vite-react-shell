import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import kanbaRoute from './routes/Kanban'; // Importa el router


dotenv.config();
const app = express();
const port = 5000;

// Cargar la URI de conexión desde las variables de entorno
const mongoURI = process.env.MONGODB_URI as string;

if (!mongoURI) {
  console.error('MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

mongoose.connect(`${mongoURI}`, {
  dbName: 'kanban',
})
  .then(() => {
    console.log('Connected to MongoDB');
    console.log('Database name:', mongoose.connection.db.databaseName);
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

app.use(cors());
app.use(express.json());
app.use(kanbaRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});