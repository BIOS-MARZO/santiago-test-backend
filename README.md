<h1>BackEnd Todo</h1>
<p>
Backtodo es una aplicación backend para la gestión de tareas, desarrollada en Node.js con Express y MongoDB. Esta aplicación permite gestionar tareas a través de una API conectada a una base de datos MongoDB ejecutada en un contenedor Docker.
</p>

<h2>
Requisitos
</h2>

<p>
Asegúrate de tener instalados los siguientes programas en tu máquina:
</p>
- Node.js (versión 14 o superior)
- Docker.
- MongoDB Compass (opcional, para gestionar la base de datos gráficamente)

<h2>
Instalación
</h2>
- Clona el repositorio en tu equipo

```
git clone <URL_del_Repositorio>
```

- Instala las Dependencias del Proyecto
  
```
npm install
```

- Crea un archivo .env para tus variables de entorno 
```
PORT:3000
MONGO_URI=<URL_DE_TU_BD>
JWT_SECRET=TU_CLAVE_SECRETA_PARA_JWR
```
- Crea un contenedor de Docker con la imagen de MondoDB

- Abre MongoCompas y coloca tu URL para acceder a la BD

<h2>
Uso
</h2>

- Inicia el Servidor con el comando:

```
npm run dev
```

<h2>
Dependencias
</h2>
<ul>
<p>
<li>bcryptjs: Para encriptación de contraseñas</li>
<li>cors: Para manejar Politicas de origen cruzado</li>
<li>dotenv: Para cargar variables de entorno</li>
<li>express: Framework para crear el servidor</li>
<li>jsonwebtoken: Para manejar authenticacion basada en tokens</li>
<li>mongoose: ORM para interactuar con MongoDB</li>
</p>
</ul>
