import jwt from 'jsonwebtoken';
import { LoginCredentials } from '../types/auth.types';

export class AuthService {
    private readonly JWT_SECRET = process.env.JWT_SECRET!;
    private readonly DEMO_USER = {
        username: 'imf_agent',
        password: 'mission_possible'
    };

    async login(credentials: LoginCredentials): Promise<string | null> {
        if (credentials.username === this.DEMO_USER.username && 
            credentials.password === this.DEMO_USER.password) {
            return jwt.sign({ username: credentials.username }, this.JWT_SECRET, {
                expiresIn: '1h'
            });
        }
        return null;
    }
}