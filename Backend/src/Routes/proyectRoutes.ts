import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../Controllers/projectController";
import { handleInputErrors } from "../Middlewares/validation";
import { TaskController } from "../Controllers/taskController";
import { projectExists } from "../Middlewares/project";
import { taskBelongsToProject, taskExists } from "../Middlewares/task";
import { authenticate } from "../Middlewares/auth";
import { TeamMemberController } from "../Controllers/teamController";

const router = Router();

router.use(authenticate);

// Rutas de Proyectos
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
    ProjectController.updateProject
);

router.delete('/:id', 
    param('id').isMongoId().withMessage('ID No Valido'),
    handleInputErrors,
    ProjectController.deleteProject
);

//Rutas de Tareas
router.param('projectId', projectExists);

router.post('/:projectId/tasks', 
    body('name')
        .notEmpty().withMessage('El Nombre de la Tarea es Oblidatorio'),
    body('description')
        .notEmpty().withMessage('La descripcion es Obligatoria'),
    handleInputErrors,
    TaskController.createTask
);

router.get('/:projectId/tasks', 
    TaskController.getProjectTask
);

router.param('taskId', taskExists);
router.param('taskId', taskBelongsToProject);

router.get('/:projectId/tasks/:taskId', 
    param('taskId').isMongoId().withMessage('ID No Valido'),
    handleInputErrors,
    TaskController.getTaskById
);

router.put('/:projectId/tasks/:taskId', 
    param('taskId').isMongoId().withMessage('ID No Valido'),
    body('name')
        .notEmpty().withMessage('El Nombre de la Tarea es Oblidatorio'),
    body('description')
        .notEmpty().withMessage('La descripcion es Obligatoria'),   
    TaskController.updateTask
);

router.delete('/:projectId/tasks/:taskId', 
    param('taskId').isMongoId().withMessage('ID No Valido'),
    handleInputErrors,
    TaskController.deleteTask
);

router.post('/:projectId/tasks/:taskId/status', 
    param('taskId').isMongoId().withMessage('ID No Valido'),
    body('status')
        .notEmpty().withMessage('Establecer un estado es Obligatorio'),
    handleInputErrors,
    TaskController.updateStatus
);

//Rutas Para Equipos
router.post('/:projectId/team/find',
    body('email')
        .isEmail().withMessage('El E-mail No es valido'),
    handleInputErrors,
    TeamMemberController.findMemberByEmail
);

router.get('/:projectId/team', TeamMemberController.getProjectTeam);

router.post('/:projectId/team',
    body('id')
        .isMongoId().withMessage('Id No Válido'),
    handleInputErrors,
    TeamMemberController.addMemberById
);

router.delete('/:projectId/team',
    body('id')
        .isMongoId().withMessage('Id No Válido'),
    handleInputErrors,
    TeamMemberController.removeMemberById
);

export default router;
