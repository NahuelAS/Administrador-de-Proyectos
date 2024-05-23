import type { Request, Response } from 'express';
import User from '../Models/User';
import { hashPassword } from '../utils/auth';

export class AuthController {
    static createAccount = async (req: Request, res: Response) => {
        try {
            const { password, email } = req.body;
            
            const userExists = await User.findOne({ email });
            if(userExists) {
                const error = new Error('El Usuario ya ha sido Registrado');
                return res.status(409).json({ error: error.message });
            }

            const user = new User(req.body);
            
            //hash password
            user.password = await hashPassword(password);
            
            await user.save();
            res.send('Usuario Creado Correctamente, Revise su Email para confirmar su cuenta!!');
        } catch (error) {
            res.status(500).json({error: '¡A ocurrido un Problema!'});
        }
    }
}
