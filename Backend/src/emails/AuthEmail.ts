import { transporter } from "../Config/nodemailer";

interface IEmail {
    email: string;
    name: string;
    token: string;
}

export class AuthEmail {
    static sendConfirmationEmail = async (user: IEmail) => {
        const info = await transporter.sendMail({
            from: 'UpTask <admin@uptask.com>',
            to: user.email,
            subject: 'UpTask - Confirma Tu Cuenta',
            text: 'UpTask - Confirma Tu Cuenta',
            html: ` 
            <p>Hola: ${user.name}, Tu cuenta se ha creado solamente falta que confirmes tu E-mail</p>
            <p>Visita el siguiente enlace:</p>
            <a href="">Confirmar Cuenta</a>
            <p>Ingresa El Siguiente Codigo: <b>${user.token}</b></p>
            <p>Este Token Expirara en 10 minutos</p>
            `
        });
    }
}