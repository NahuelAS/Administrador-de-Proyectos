import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './Config/db';
import projectRoutes from './Routes/proyectRoutes'

dotenv.config();

connectDB();
const app = express();

app.use(express.json());
//Rutas
app.use('/api/projects', projectRoutes);

export default app;