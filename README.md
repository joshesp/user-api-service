# User API Service

## Contexto del proyecto

Este repositorio contiene el código de un microservicio para las funcionalidades básicas de autenticación y la gestión de la cuenta del usuario.

_**NOTA:** El reposotorio se seguirá actualizando_

## Índice

- [Funcionalidades](#features)
- [Tecnologías utilizadas](#languages)
- [Instalación](#setup)
- [Estructura del proyecto](#structure)
- [Endpoints](#endpoints)
- [Licencia](#license)

<a name="features"></a>

## Funcionalidades

- Autenticación de usuario
  - Crear cuenta
  - Autenticación
  - Recuperación de contraseña
  - Actualización de contraseña
  - Actualización de JWT
- Usuario
  - Datos básicos del usuario

<a name="languages"></a>

## Tecnologías utilizadas

- [NodeJS (version 20.4.0)](https://nodejs.org/en)
- [PostgreSql (version 16)](https://postgresapp.com)
- [Typescript (version 5.4.5)](https://www.typescriptlang.org/)

<a name="setup"></a>

## Instalación

1. Clona el repositorio

```bash
git clone https://github.com/joshesp/user-api-service.git
cd user-api-service
```

2. Instala las dependencias

```bash
npm install
```

3. Copia el archivo **.env.template** y pegalo al mismo nivel raíz del directorio con el nombre **.env** y actualiza los valores correspondientes.

```env
NODE_ENV=development|production|test
PORT=number
POSTGRES_CONNECTION=connection-string
POSTGRES_CONNECTION_TIMEOUT=number
JWT_SECRET=jwt_secret
JWT_EXPIRATION=1d|1w|20m|...
JWT_REFRESH_SECRET=jwt_refresh_secret
JWT_REFRESH_EXPIRES_IN=1d|1w|20m|...
ENCRYPTION_KEY=encryption_key
```

<a name="structure"></a>

## Estructura del proyecto

### Directorio "src/"

- **config:**
  - connectionDatabase.ts: Configuraciones para la conexión a base de datos.
  - constanst.ts: Constantes para el servicio.
  - env.ts: Archivo con las definiciones de las variables de entorno.
  - swaggerConfig.ts: Definiciones básicas para la documentación del API.
- **controllers:**
  - authController.ts: Controlador de autenticación.
  - userController.ts: Controlador de usuario.
- **core:**
  - **errors**
    - AppError.ts: Clase para manejar los errores.
  - **interfaces**
    - auth:
      - IAuthController.ts: Interfaz para el controlador de autenticación.
      - IAuthService.ts: Interfaz para el servicio de autenticación.
      - IPasswordResetRepository.ts: Interfaz para el repositorio de recuperación de contraseña.
    - payloads:
      - IUserAuthData.ts: Interfaz del payload para el request de autenticación.
      - IUserData.ts.ts: Interfaz del response de los datos del usuario.
    - user:
      - IUserController.ts: Interfaz para el controlador de usuario.
      - IUserRepository.ts: Interfaz para el repositorio de usuario.
      - IUserService.ts: Interfaz para el servicio de usuario.
- **types**
  index.d.ts: Definición de los tipos de datos.
- **entity:**
  - PasswordReset.ts: Entidad para la recuperación de contraseña.
  - User.ts: Entidad de usuario.
- **middlewares**
  - authMiddleware.ts: Middleware para la autenticación
  - authValidatorFieldsMiddleware.ts: Middleware para la validación de los campos necesarios para el request de autenticación.
  - errorMiddleware.ts: Middleware para manejar los errores.
- **repositories:**
  - PasswordResetRepository.ts: Repositorio de base de datos para agregar/actualizar/eliminar registros de la tabla de recuperación de contraseña.
  - UserRepository.ts: Repositorio de base de datos para agregar/actualizar/obtener registros de la tabla de usuarios.
- **routes:**
  - authRoutes.ts: Rutas para el controlador de autenticación.
  - userRoutes.ts: Rutas para el controlador de usuario.
- **services:**
  - AuthService.ts: Lógica de negocio para el servicio de autenticación.
  - UserService.ts: Lógica de negocio para el servicio de usuario.
- **utils**
  - Logger.ts.ts: Archivo para la configuración de la librería logger.
  - bcryptString.ts: Archivo para la encriptación de contraseñas.
  - cryptoUtils.ts: Archivo para la generación de tokens.
  - jwt.ts: Archivo para generar y validar los JWT
- **app.ts**: Archvio principal del proyecto.
- **server.ts**: Archivo para iniciar el servidor.

<a name="endpoints"></a>

## Endpoints

La información sobre cómo utilizar el microservicio está en la documentación Swagger del microservicio: _{domain}/api-docs_

<a name="licence"></a>

## Licencia

Este repositorio está licenciado bajo la licencia [MIT](https://choosealicense.com/licenses/mit/).
