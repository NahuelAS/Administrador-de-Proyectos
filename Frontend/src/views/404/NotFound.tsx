import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <>
            <h1 className="font-black text-center text-4xl text-white">404 - Not Found</h1>
            <p className="mt-10 text-center text-white">
                Pagina NO encontrada, volver a: {' '}
                <Link className="text-blue-500" to={'/'}>Proyectos</Link>
            </p>
        </>
    )
}
