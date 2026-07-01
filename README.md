# API REST de Productos

API Rest desarrollada con Node.js y Express que permite administrar productos (Crear, Leer, Actualizar y Eliminar), con autenticacion mediante JSON Web Tokens y almacenamiento en la nube utilizando Firestore de Firebase.

Este proyecto fue desarrollado como Proyecto Final del curso, cumpliendo con los siguientes puntos: arquitectura en capas (rutas, controladores, servicios y modelos), autenticacion con JWT, conexion a Firestore, validaciones de entrada y manejo centralizado de errores.

## Tecnologias utilizadas

- Node.js
- Express
- Firebase (Firestore)
- JSON Web Token (jsonwebtoken)
- CORS
- body-parser
- dotenv

## Estructura del proyecto

```
project-final/
  index.js
  package.json
  .env.example
  .gitignore
  README.md
  src/
    config/
      firebase.config.js
    routes/
      products.routes.js
      auth.routes.js
    controllers/
      products.controller.js
      auth.controller.js
    services/
      products.service.js
      auth.service.js
    models/
      products.model.js
      users.model.js
    middlewares/
      auth.middleware.js
      error.middleware.js
    validators/
      products.validator.js
      auth.validator.js
    utils/
      CustomError.js
```

## Requisitos previos

- Tener instalado Node.js (version 18 o superior recomendada).
- Tener una cuenta de Firebase con un proyecto creado y Firestore habilitado.

## Instalacion

1. Clonar el repositorio o descargar el codigo fuente.

2. Instalar las dependencias:

```
npm install
```

3. Crear un archivo llamado `.env` en la raiz del proyecto, tomando como base el archivo `.env.example` incluido. Completar cada variable con los valores correspondientes:

```
PORT=3000

FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=

JWT_SECRET=
JWT_EXPIRES_IN=1h

ADMIN_EMAIL=
ADMIN_PASSWORD=
```

Los valores de Firebase se obtienen desde la consola de Firebase, dentro de Configuracion del proyecto, en la seccion Tus apps, seleccionando o creando una aplicacion web.

El JWT_SECRET puede ser cualquier cadena de texto secreta definida por el desarrollador, utilizada para firmar los tokens.

ADMIN_EMAIL y ADMIN_PASSWORD son las credenciales que se utilizaran para autenticarse contra el endpoint de login.

4. Configurar las reglas de Firestore de forma que la aplicacion pueda leer y escribir en la coleccion products durante el desarrollo. En produccion se recomienda restringir estas reglas o migrar el acceso a un backend privilegiado.

5. Crear en Firestore una coleccion llamada `products` y agregar un primer documento de ejemplo para definir la estructura, por ejemplo:

```
{
  "name": "Producto de ejemplo",
  "price": 100,
  "stock": 10,
  "category": "general"
}
```

## Ejecucion

Para iniciar el servidor en modo normal:

```
npm run start
```

Para iniciar el servidor en modo desarrollo con recarga automatica (requiere nodemon):

```
npm run dev
```

El servidor quedara disponible en `http://localhost:3000` (o el puerto configurado en la variable PORT).

## Endpoints disponibles

### Autenticacion

POST /auth/login

Recibe en el body las credenciales del usuario y devuelve un Bearer token si son validas.

Body de ejemplo:

```
{
  "email": "admin@correo.com",
  "password": "contrasena123"
}
```

Respuesta exitosa:

```
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

El email debe tener un formato valido y no contener espacios. La contrasena no debe contener espacios y debe tener al menos 6 caracteres.

### Productos

GET /api/products

Devuelve todos los productos registrados. No requiere autenticacion.

GET /api/products/:id

Devuelve el producto correspondiente al id indicado. No requiere autenticacion.

POST /api/products/create

Crea un nuevo producto. Requiere autenticacion mediante Bearer token.

Body de ejemplo:

```
{
  "name": "Notebook",
  "price": 850000,
  "stock": 15,
  "category": "tecnologia"
}
```

DELETE /api/products/:id

Elimina el producto correspondiente al id indicado. Requiere autenticacion mediante Bearer token.

## Autenticacion en las rutas protegidas

Para acceder a las rutas protegidas, se debe incluir el token obtenido en el login dentro del header Authorization con el formato:

```
Authorization: Bearer <token>
```

## Manejo de errores

La API responde con los siguientes codigos de estado segun el tipo de error:

- 400: la peticion contiene datos invalidos o incompletos.
- 401: no se proporciono un token de autenticacion o las credenciales de login son incorrectas.
- 403: el token proporcionado es invalido o expiro.
- 404: la ruta solicitada no existe, o el recurso solicitado no fue encontrado.
- 500: error interno del servidor o fallo en la comunicacion con el servicio de datos externo.

Todas las respuestas de error siguen el siguiente formato:

```
{
  "status": "error",
  "message": "Descripcion del error"
}
```

## Notas sobre seguridad

Las claves de Firebase y JWT no se encuentran incluidas en el repositorio, ya que se cargan mediante variables de entorno definidas en el archivo .env, el cual esta excluido del control de versiones a traves del archivo .gitignore. Se incluye el archivo .env.example como referencia de las variables necesarias para ejecutar el proyecto.

## Autor

Lucas Rama
