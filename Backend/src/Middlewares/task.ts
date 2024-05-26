import type { Request, Response, NextFunction } from "express";
import Task, { ITask } from "../Models/Task";

declare global {
    namespace Express {
        interface Request{
            task: ITask;
        }
    }
}

export async function taskExists(req: Request, res: Response, next: NextFunction) {

    try {
        const { taskId } = req.params;
        const task = await Task.findById(taskId);

        if (!task) {
            const error = new Error('Tarea no encontrado');
            return res.status(404).json({ error: error.message });
        }
        req.task = task;
        next();

    } catch (error) {
        res.status(500).json({error: 'Error'});
    }
}

export function taskBelongsToProject(req: Request, res: Response, next: NextFunction) {
    
    if ( req.task.project.toString() !== req.project.id.toString() ) {
        const error = new Error('La tarea no corresponde al Proyecto');
        return res.status(400).json({ error: error.message });
    }
    next();
}

export function hasAuthorization(req: Request, res: Response, next: NextFunction) {
    
    if (req.user.id.toString() !== req.project.manager.toString()) {
        const error = new Error('Accion No Permitida');
        return res.status(400).json({ error: error.message });
    }
    next();
}
