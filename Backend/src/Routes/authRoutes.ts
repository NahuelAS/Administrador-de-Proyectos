import { Router } from "express";
import { AuthController } from "../Controllers/authController";
import { body } from "express-validator";
import { handleInputErrors } from "../Middlewares/validation";

const router = Router();

router.post('/create-account', 
    body('name')
        .notEmpty().withMessage('Se debe ingresar un Nombre'),
    body('password')
        .isLength({min: 8}).withMessage('La contraseña es demaciado corta, Minimo 8 caracteres'),
    body('password_confirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas no coinciden');
        }
        return true;
    }),
    body('email')
        .isEmail().withMessage('El E-mail No es valido'),
    handleInputErrors,
    AuthController.createAccount
);

router.post('/confirm-account', 
    body('token')
        .notEmpty().withMessage('el Token no Puede estar Vacio'),
    handleInputErrors,
    AuthController.confirmAccount
); 

router.post('/login', 
    body('email')
        .isEmail().withMessage('El E-mail No es valido'),
    body('password')
        .notEmpty().withMessage('La contraseña no puede ir vacia'),
    handleInputErrors,
    AuthController.login
);

export default router;