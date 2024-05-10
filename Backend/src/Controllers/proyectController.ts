import type { Request, Response } from "express"
import Project from "../Models/Proyect";

export class ProjectController {

    static createProjects = async (req: Request, res: Response) => {

        const project = new Project(req.body);
        try {
            await project.save();
            res.send('Project Created Success');
        } catch (err) {
            console.log(err);
        }
    }

    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({});
            res.json(projects);
        } catch (err) {
            console.log(err);
        }
    }

    static getProjectById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const project = await Project.findById(id);

            if (!project) {
                const error = new Error('Proyecto No Encontrado');
                return res.status(404).json({ error: error.message });
            }

            res.json(project);
        } catch (err) {
            console.log(err);
        }
    }

    static updateProduct = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const project = await Project.findByIdAndUpdate(id, req.body);

            if (!project) {
                const error = new Error('Proyecto No Encontrado');
                return res.status(404).json({ error: error.message });
            }

            await project.save();
            res.send('Proyecto Actializado');
        } catch (err) {
            console.log(err);
        }
    }

    static deleteProject = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const project = await Project.findById(id);

            if (!project) {
                const error = new Error('Proyecto No Encontrado');
                return res.status(404).json({ error: error.message });
            }

            await project.deleteOne();
            res.send('Proyecto Eliminado');
        } catch (err) {
            console.log(err);
        }
    }
}