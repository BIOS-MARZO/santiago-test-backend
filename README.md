Requisitos

Asegúrate de tener instalados los siguientes programas en tu máquina:

Node.js (versión 14 o superior)

Docker y Docker Compose

MongoDB Compass (opcional, para gestionar la base de datos gráficamente)

Instalación

Clona este repositorio en tu máquina local:

git clone <URL_DEL_REPOSITORIO>
cd backtodo

Instala las dependencias del proyecto:

npm install

Crea un archivo .env en la raíz del proyecto con las siguientes variables de entorno:

PORT=3000
MONGO_URI=mongodb://localhost:27017/backtodo
JWT_SECRET=tu_secreto_para_jwt

Configura el contenedor Docker para MongoDB. Crea un archivo docker-compose.yml en la raíz del proyecto con el siguiente contenido:

version: '3.8'
services:
  mongodb:
    image: mongo:6
    container_name: mongodb
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
volumes:
  mongodb_data:

Inicia el contenedor Docker:

docker-compose up -d

Abre MongoDB Compass y conecta a mongodb://localhost:27017. Crea una base de datos llamada backtodo si no existe.

Uso

Inicia el servidor en modo desarrollo:

npm run dev

El servidor estará disponible en http://localhost:3000.

Usa una herramienta como Postman o Insomnia para interactuar con las rutas de la API.

Scripts disponibles

npm run dev: Inicia la aplicación en modo desarrollo con Nodemon.

Dependencias

bcryptjs: Para encriptación de contraseñas.

cors: Para manejar políticas de origen cruzado.

dotenv: Para cargar variables de entorno desde un archivo .env.

express: Framework para crear el servidor.

jsonwebtoken: Para manejar autenticación basada en tokens.

mongoose: ORM para interactuar con MongoDB.
