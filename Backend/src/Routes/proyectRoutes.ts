import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../Controllers/proyectController";
import { handleInputErrors } from "../Middlewares/validation";

const router = Router();

router.post('/', 
    body('projectName')
        .notEmpty().withMessage('El Nombre del Proyecto es Oblidatorio'),
    body('clientName')
        .notEmpty().withMessage('El Nombre del Cliente es Oblidatorio'),
    body('description')
        .notEmpty().withMessage('La descripcion es Obligatoria'),
    handleInputErrors,
    ProjectController.createProjects
);

router.get('/', ProjectController.getAllProjects);

router.get('/:id', 
    param('id').isMongoId().withMessage('ID No Valido'),
    handleInputErrors,
    ProjectController.getProjectById
);

router.put('/:id', 
    param('id').isMongoId().withMessage('ID No Valido'),
    body('projectName')
        .notEmpty().withMessage('El Nombre del Proyecto es Oblidatorio'),
    body('clientName')
        .notEmpty().withMessage('El Nombre del Cliente es Oblidatorio'),
    body('description')
        .notEmpty().withMessage('La descripcion es Obligatoria'),
    handleInputErrors,
    ProjectController.updateProduct
);

router.delete('/:id', 
    param('id').isMongoId().withMessage('ID No Valido'),
    handleInputErrors,
    ProjectController.deleteProject
);

export default router;
