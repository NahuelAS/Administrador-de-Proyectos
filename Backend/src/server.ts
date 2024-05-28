import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { corsConfig } from './Config/cors';
import { connectDB } from './Config/db';
import authRoutes from './Routes/authRoutes';
import projectRoutes from './Routes/projectRoutes';


dotenv.config();

connectDB();

const app = express();
app.use(cors(corsConfig));

app.use(morgan('dev'));
app.use(express.json());

//Rutas
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

export default app;