# Administrador de Proyectos

## Este proyecto esta desarrollado con:

### Base de Datos: 
- MongoDB

### Backend: 
- Mongoose
- Express
- Node.js
- TypeScript

 ### Frontend: 
- React Query
- Vite
- Tailwindcss
- Headless UI
- TypeScript

Con esta aplicación puedes gestionar tus proyectos, donde encontrarás vistas que te permiten ejecutar acciones CRUD. También cuenta con un panel de gestión de equipos donde se pueden incluir colaboradores. A cada proyecto se le pueden crear múltiples tareas, las cuales pueden ser controladas en cuanto a qué estado se encuentran, por ejemplo: En Espera, En Proceso, Completada, etc. En lo que se refiere al registro de usuarios, estos cuentan con un formulario, el cual, una vez completado y enviado, enviará un email con un token, que es un número de 6 dígitos, el cual debe ser ingresado para que se "active" la cuenta del usuario.
Como manejador de emails se utilizo [MailTrap](https://mailtrap.io/).

--------
## Instalacion Local

### La Instalacion es simple: 
**Una vez se trae el proyecto, realizar lo siguiente:**
### Backend:
- cd Backend
- npm install
- Crear un archivo **.env** con lo siguiente:
                
#### Para la base de datos se utilizo MongoDB Atlas y MongoDB Compass.
- DATABASE_URL= "Aquí colocar la url de su base de datos" 
- FRONTEND_URL= "URL Frontend"

#### Aquí van los valores de MailTrap.
- SMTP_HOST=sandbox.smtp.mailtrap.io      
- SMTP_PORT=2525
- SMTP_USER=3732d3ed4acaf3
- SMTP_PASS=6e35fdc7cb1f84

#### Aquí la clave para que se genere el JWT.
- JWT_SECRET=clavesecreta

### Frontend: 
- cd Frontend
- npm install
- Crear un archivo **.env.local** con lo siguiente:
    VITE_API_URL=http://localhost:8000/api


