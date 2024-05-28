import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ProjectForm from "@/components/projects/ProjectForm";
import { ProjectFormData } from "@/types/index";
import { createProject } from "@/api/ProjectAPI";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

export default function CreateProjectViews() {
    
    const navigate = useNavigate();
    const initialValues: ProjectFormData = {
        projectName: "",
        clientName: "", 
        description: ""
    }
    
    const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: initialValues});
    
    const { mutate } = useMutation({
        mutationFn: createProject,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            navigate('/');
        }
    });

    const handleForm = (formData: ProjectFormData) => mutate(formData);
    
    return (
        <>
        <div className="maw-w-3xl mx-auto">
            <h1 className="text-5xl font-black">Crear Proyecto</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">Completa el Formulario y Crea tu Proyecto</p>
            <nav className="my-5">
                <Link 
                    className="bg-indigo-500 hover:bg-indigo-600 px-10 py-3 text-white text-xl font-bold cursor-pointer transitions-colors rounded-lg"
                    to={'/'}
                >
                    Volver a Proyectos
                </Link>
            </nav>

            <form 
                className="mt-10 bg-white shadow-lg p-10 rounded-lg" 
                onSubmit={handleSubmit(handleForm)}
                noValidate
            >

                <ProjectForm 
                    register={register}
                    errors={errors}
                />

                <input 
                    type="submit"
                    value='Crear Proyecto'
                    className="bg-indigo-700 hover:bg-indigo-800 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                />
            </form>
        </div>
        </>
    )
}