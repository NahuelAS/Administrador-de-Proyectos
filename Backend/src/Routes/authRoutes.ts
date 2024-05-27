import { Router } from "express";
import { AuthController } from "../Controllers/authController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../Middlewares/validation";
import { authenticate } from "../Middlewares/auth";

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

router.post('/request-code', 
    body('email')
        .isEmail().withMessage('El E-mail No es valido'),
    handleInputErrors,
    AuthController.requestConfirmationCode
);

router.post('/forgot-password',  
    body('email')
        .isEmail().withMessage('El E-mail No es valido'),
    handleInputErrors,
    AuthController.forgotPasssword
);

router.post('/validate-token', 
    body('token')
        .notEmpty().withMessage('el Token no Puede estar Vacio'),
    handleInputErrors,
    AuthController.validateToken
); 

router.post('/update-password/:token',  
    param('token').isNumeric().withMessage('Token no Válido'),    
    body('password')
        .isLength({min: 8}).withMessage('La contraseña es demaciado corta, Minimo 8 caracteres'),
    body('password_confirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas no coinciden');
        }
        return true;
        }),
    handleInputErrors,
    AuthController.updatePasswordWithToken
); 

router.get('/user', 
    authenticate,
    AuthController.user
);

/** Perfil */
router.put('/profile', 
    authenticate,
    body('name')
        .notEmpty().withMessage('Se debe ingresar un Nombre'),
    body('email')
        .isEmail().withMessage('El E-mail No es valido'),
    handleInputErrors,
    AuthController.updateProfile
);

router.post('/update-password',
    authenticate,
    body('current_password')
        .notEmpty().withMessage('El password actual no puede estas vacio'),
    body('password')
        .isLength({min: 8}).withMessage('La contraseña es demaciado corta, Minimo 8 caracteres'),
    body('password_confirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas no coinciden');
        }
        return true;
    }),
    handleInputErrors,
    AuthController.updateCurrentUserPassword
);

export default router;
