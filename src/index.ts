import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import RedisStore from 'connect-redis';
import client from './services/cacheService';
import session from 'express-session';

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use(
    session({
        store: new RedisStore({ client }),
        secret: process.env.SESSION_SECRET || 'f37e5b4a4f9f10ab11e4de8b4919c70aa07b927a9df1b5b5ed3d5e245c282d6f376ef204c8d1b19aa4dbda19af08c4be6f18',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 30,
        }
    })
);

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
