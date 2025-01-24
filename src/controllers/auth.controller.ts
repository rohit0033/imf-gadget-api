import { Request, Response } from 'express';
import { AuthService } from '../services/auth.services';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    login = async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;
            const token = await this.authService.login({ username, password });

            if (!token) {
                return res.status(401).json({ 
                    success: false, 
                    message: 'Invalid credentials' 
                });
            }

            res.json({ 
                success: true, 
                data: { token } 
            });
        } catch (error) {
            res.status(500).json({ 
                success: false, 
                message: 'Login failed' 
            });
        }
    }
}