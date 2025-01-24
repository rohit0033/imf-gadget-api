import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

export const generateToken = (userId: string): string => {
    return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' });
};

export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
};