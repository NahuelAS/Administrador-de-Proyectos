import type { Request, Response } from 'express';
import User from '../Models/User';
import { checkPassword, hashPassword } from '../utils/auth';
import { generateToken } from '../utils/token';
import Token from '../Models/Token';
import { AuthEmail } from '../emails/AuthEmail';

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

            //Token
            const token = new Token();
            token.token = generateToken();
            token.user = user.id;

            //Envio Email
            AuthEmail.sendConfirmationEmail({
                email: user.email,
                name: user.name,
                token: token.token,
            });

            await Promise.allSettled( [user.save(), token.save()] );

            res.send('Usuario Creado Correctamente, Revise su Email para confirmar su cuenta!!');
        } catch (error) {
            res.status(500).json({error: '¡A ocurrido un Problema!'});
        }
    }

    static confirmAccount = async (req: Request, res: Response) => {
        try {
            const { token } = req.body; 

            const tokenExists = await Token.findOne({ token });
            if(!tokenExists) {
                const error = new Error('Token No Valido');
                return res.status(404).json({ error: error.message });
            }

            const user = await User.findById(tokenExists.user);
            user.confirmed = true;

            await Promise.allSettled( [user.save(), tokenExists.deleteOne()] );
            res.send('Usuario Confirmado Correctamente');

        } catch (error) {
            res.status(500).json({error: '¡A ocurrido un Problema!'});
        }
    }

    static login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            
            if(!user) {
                const error = new Error('Usuario No Encontrado');
                return res.status(404).json({ error: error.message });
            }
            if(!user.confirmed) {
                //Token
                const token = new Token();
                token.user = user.id;
                token.token = generateToken();
                await token.save();

                //Envio Email
                AuthEmail.sendConfirmationEmail({
                    email: user.email,
                    name: user.name,
                    token: token.token,
                });
                
                const error = new Error('Cuenta no Confirmada, se Reenviara un Nuevo Token de Confirmacion a su email.');
                return res.status(401).json({ error: error.message });
            }

            //Password
            const isPasswordCorrect = await checkPassword(password, user.password);
            if(!isPasswordCorrect) {
                const error = new Error('Contraseña Incorrecta');
                return res.status(401).json({ error: error.message });
            }

            res.send('Autenticado...');
        } catch (error) {
            res.status(500).json({error: '¡A ocurrido un Problema!'});
        }
    }
}
