import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './tools/database';
import Routes from './routes/authRoutes';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { initialDataToDB } from './data/initialDataToDB';


dotenv.config();

const app = express();

app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
));

app.use(express.json());
app.use(cookieParser());

connectToDatabase();

 initialDataToDB();
app.use('/auth', Routes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})