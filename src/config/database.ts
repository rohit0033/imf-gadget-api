import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: isProduction ? { rejectUnauthorized: false } : false
});

export const connectToDatabase = async () => {
    try {
        await pool.connect();
        console.log('Connected to database in', isProduction ? 'production' : 'development', 'mode');
    } catch (error) {
        console.error('Error connecting to database:', error);
        process.exit(1);
    }
};

export default pool;