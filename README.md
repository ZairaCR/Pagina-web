# Mini Biblioteca - Proyecto base

## Qué contiene
- Next.js (frontend + API routes)
- Autenticación con JWT y contraseñas con bcrypt
- Roles: `user` y `admin`
- MongoDB (Atlas) - conexión mediante `MONGODB_URI` en `.env`
- TailwindCSS para estilos
- Endpoints API mínimos para auth y libros

## Instrucciones
1. Descomprime el zip y abre la carpeta en VS Code.
2. Crea un archivo `.env` en la raíz con:
```
MONGODB_URI=tu_cadena_de_conexion_de_mongodb
JWT_SECRET=un_secreto_seguro
```
3. Ejecuta:
```bash
npm install
npm run dev
```
4. Abre `http://localhost:3000`.

--- 

## Estructura principal
- pages/: landing, login, register, dashboard, api routes
- models/: User, Book
- utils/: db connection, auth middleware

> Este es un scaffold mínimo para que puedas completar y adaptar.
