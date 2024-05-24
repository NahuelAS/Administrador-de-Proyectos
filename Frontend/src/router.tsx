import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashboardView from "@/views/DashboardView";
import CreateProjectViews from "./views/projects/CreateProjectViews";
import EditProjectView from "./views/projects/EditProjectView";
import ProjectDetailsView from "./views/projects/ProjectDetailsView";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import ConfirmAccountView from "./views/auth/ConfirmAccountView";
import RequestNewCodeView from "./views/auth/RequestNewCodeView";

export default function Router() {

    return(
        <BrowserRouter>

            <Routes>

                <Route element={ <AppLayout/> }>

                    <Route path="/" element={ <DashboardView /> } index />
                    <Route path="/projects/create" element={ <CreateProjectViews /> } />
                    <Route path="/projects/:projectId/edit" element={ <EditProjectView /> } />
                    <Route path="/projects/:projectId" element={ <ProjectDetailsView /> } />

                </Route>

                <Route element={ <AuthLayout /> }>

                    <Route path="/auth/login" element={ <LoginView /> } />
                    <Route path="/auth/register" element={ <RegisterView /> } />
                    <Route path="/auth/confirm-account" element={ <ConfirmAccountView /> } />
                    <Route path="/auth/request-code" element={ <RequestNewCodeView /> } />

                </Route>

            </Routes>

        </BrowserRouter>
    )
    
}
