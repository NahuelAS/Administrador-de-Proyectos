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
            <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar Cuenta</a>
            <p>Ingresa El Siguiente Codigo: <b>${user.token}</b></p>
            <p>Este Token Expirara en 10 minutos</p>
            `
        });
    }

    static sendPasswordResetToken = async (user: IEmail) => {
        const info = await transporter.sendMail({
            from: 'UpTask <admin@uptask.com>',
            to: user.email,
            subject: 'UpTask - Restablecer Contraseña',
            text: 'UpTask - Restablecer Contraseña',
            html: ` 
            <p>Hola: ${user.name}, Tu Solicitud para reestablecer la Contraseña.</p>
            <p>Visita el siguiente enlace:</p>
            <a href="${process.env.FRONTEND_URL}/auth/new-password">Reestablecer Contraseña</a>
            <p>Ingresa El Siguiente Codigo: <b>${user.token}</b></p>
            <p>Este Token Expirara en 10 minutos</p>
            `
        });
    }
}