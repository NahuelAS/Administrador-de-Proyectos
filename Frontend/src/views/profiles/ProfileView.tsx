import ProfileForm from "@/components/profiles/ProfileForm";
import { useAuth } from "@/hooks/useAuth"

export default function ProfileView() {
    
    const { data, isLoading } = useAuth();

    if (isLoading) return 'Cargando...';
    
    if(data) return <ProfileForm data={data} />
}
