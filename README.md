# DevLocker v1 – API REST de Snippets Privados

DevLocker es una API REST construida con **Node.js, Express y MongoDB** que permite a los usuarios guardar fragmentos de código (*snippets*) de forma **segura y privada**, garantizando que cada usuario solo pueda acceder a sus propios recursos.

Este proyecto implementa **seguridad a nivel de datos** usando **JWT** y referencias entre modelos con **Mongoose**.


## Tecnologías Usadas

- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- express-validator
- dotenv
- nodemon

## Modelo de Datos

### Snippet
{
  user: ObjectId (ref: "User"),
  title: String (required, min: 3),
  language: String,
  code: String (required),
  tags: [String]
}


Cada snippet pertenece a un único usuario, identificado mediante el token JWT.

### Autenticación

Todos los endpoints de snippets están protegidos por JWT.

El usuario autenticado se obtiene desde el token (req.user._id)
Nunca se usa el userId enviado por el cliente.

Endpoints (v1)
Autenticación
Método	Endpoint	Descripción
POST	/api/v1/auth/register	Registrar usuario
POST	/api/v1/auth/login	Login y obtención de token

Snippets (Protegidos con JWT)
Método	Endpoint	Acción
POST	/api/v1/snippets	Crear snippet
GET	/api/v1/snippets	Listar snippets del usuario
PUT	/api/v1/snippets/:id	Editar snippet propio
DELETE	/api/v1/snippets/:id	Eliminar snippet propio
Seguridad: Muro de Privacidad

## El sistema garantiza que:

Un usuario no puede ver snippets ajenos

No puede editar ni eliminar snippets de otros usuarios

Aunque conozca el ID del recurso

Esto se logra filtrando siempre por:

{ _id: snippetId, user: req.user._id }

Prueba de Fuego (QA)

Registrar User A y User B

Crear un snippet con el token del User A

Intentar eliminar ese snippet con el token del User B

Resultado esperado: 401 Unauthorized o 404 Not Found

Si el snippet no se elimina, el sistema es seguro.

### Instalación y Ejecución
1️. Clonar el repositorio
git clone https://github.com/tu-usuario/devlocker.git
cd devlocker
2️. Instalar dependencias
npm install
3️. Configurar variables de entorno

Crear archivo .env:

PORT=5000
MONGO_URI=tu_uri_de_mongodb
JWT_SECRET=tu_secreto_jwt
4️. Ejecutar el proyecto
npm run dev

Servidor corriendo en:

http://localhost:5000
Autor
Farid Castellanos

Estado del Proyecto

Funcional
Seguro
Prueba de fuego superada
