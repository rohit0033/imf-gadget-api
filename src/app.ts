import express from 'express';
import bodyParser from 'body-parser';
import { json, urlencoded } from 'body-parser';
import gadgetRoutes from './routes/gadget.routes';
import errorMiddleware from './middleware/error.middleware';
import authMiddleware from './middleware/auth.middleware';
import authRoutes from './routes/auth.routes';
import { connectToDatabase } from './config/database';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));


// Routes
app.use('/gadgets', authMiddleware,gadgetRoutes);
app.use('/auth',authRoutes);


// Error handling middleware
app.use(errorMiddleware);

// Database connection
connectToDatabase();

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});