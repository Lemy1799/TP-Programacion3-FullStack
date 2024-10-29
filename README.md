# Proyecto Fullstack - CRUD de Tareas

Este es un proyecto fullstack que permite la gestión de tareas utilizando **MongoDB** para la base de datos y **Auth0** para la autenticación.

## Tecnologías Utilizadas

- **Frontend**: React
- **Backend**: Node.js, Express
- **Base de Datos**: MongoDB (Mongoose)
- **Autenticación**: Auth0

## Configuración del backend

### Base de Datos:
MongoDB: (DB_FULLSTACK, Connection string de MongoDB)

### Login:
AuthZero: (AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET y AUTH0_AUDIENCE; todo sacado desde la pagina de authzero)

### Servidor
PORT: (a eleccion, solo en caso de desarrollo para cuando se usa localhost)

## Instalación

1. **Clonar el repositorio**:
```bash
git clone https://github.com/rocioairasca/TPFullStack_Prog3.git
```

2. **Instalar dependencias**:
```bash
npm install
```

3. **Configurar las variables de entorno en un .env**:
(cada carpeta, back y front, tienen un .env separado)

4. **Iniciar el servidor**:
```bash
node index.js
```

## Configuración del frontend

### Auth0 Config
REACT_APP_AUTH0_DOMAIN=(va lo mismo que en AUTH0_DOMAIN)
REACT_APP_AUTH0_CLIENT_ID=(va lo mismo que en AUTH0_CLIENT_ID)

## Instalación

1. **Moverse a la carpeta frontend**:
```bash
cd frontend
```

2. **Instalar dependencias**:
```bash
npm install
```

3. **Configurar las variables de entorno en un .env**:

4. **Iniciar el proyecto**:
```bash
npm start
```
