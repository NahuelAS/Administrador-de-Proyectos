import { NoteFormData } from "@/types/index";
import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/api/NoteAPI";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";

export default function AddNoteForm() {
    
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const params = useParams();
    
    const projectId = params.projectId!;
    const taskId = queryParams.get('viewTask')!;


    const initialValues: NoteFormData = {
        content: ''
    }
    const { register, handleSubmit, reset, formState: {errors} } = useForm({defaultValues: initialValues});

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: createNote,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({queryKey: ['task', taskId]});
        }
    });
    
    const handleAddNote = (formData: NoteFormData) => {
        mutate({projectId, taskId, formData});
        reset();
    }

    return (
        <form 
            onSubmit={handleSubmit(handleAddNote)}
            className="space-y-3"
            noValidate
        >
            <div className="flex flex-col gap-2">
                <label className="font-bold" htmlFor="content">Crear Nota</label>
                <input 
                    type="text"
                    id="content" 
                    placeholder="Contenido de la Nota"
                    className="w-full p-3 border border-gray-300"
                    {...register('content', {
                        required: 'El contenido de la nota es obligatorio'
                    })}
                />
                {errors.content && (
                    <ErrorMessage>{errors.content.message}</ErrorMessage>
                )}
            </div>

            <input 
                type="submit"
                value='Crear Nota'
                className="bg-indigo-700 hover:bg-indigo-800 w-full p-2 text-white font-black cursor-pointer"
            />
        </form>
    )
}
