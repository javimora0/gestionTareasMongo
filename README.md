
# Documentación API - Tareas Mongo

## Acceso

### Registro
- **POST** `/api/registro`
- **Body:**
  ```json
  {
    "nombre": "root",
    "email": "prueba3@gmail.com",
    "password": "prueba"
  }
  ```

### Login
- **POST** `/api/login`
- **Body:**
  ```json
  {
    "email": "prueba3@gmail.com",
    "password": "prueba"
  }
  ```


## Tareas

### Crear tarea
- **POST** `/api/admin/tareas/:idUsuario`
- **Headers:** `x-token: [Token]`
- **Body:**
  ```json
  {
    "descripcion": "Tarea modificar final",
    "dificultad": "L",
    "horas_previstas": 2,
    "horas_realizadas": 2,
    "porcentaje": 0,
    "completada": 0
  }
  ```

### Eliminar tarea
- **DELETE** `/api/admin/tareas/:idTarea`
- **Headers:** `x-token: [Token]`

### Obtener tareas
- **GET** `/api/admin/tareas`
- **Headers:** `x-token: [Token]`

### Obtener tarea específica
- **GET** `/api/admin/tareas/:idTarea`
- **Headers:** `x-token: [Token]`

### Asignar tarea a usuario
- **PUT** `/api/admin/tarea/usuario/:idTarea/:idUsuario`
- **Headers:** `x-token: [Token]`

### Modificar tarea
- **PUT** `/api/admin/tareas/:idTarea`
- **Headers:** `x-token: [Token]`
- **Body:**
  ```json
  {
    "descripcion": "Modificada2",
    "dificultad": "S",
    "horas_previstas": 1,
    "horas_realizadas": 3,
    "porcentaje": 100,
    "completada": 1
  }
  ```


## Usuarios

### Todos los usuarios
- **GET** `/api/admin/usuarios`
- **Headers:** `x-token: [Token]`

### Todas las tareas disponibles
- **GET** `/api/programador/tareas/disponibles`
- **Headers:** `x-token: [Token]`

### Consultar tareas de un usuario
- **GET** `/api/programador/tareas/:idUsuario`
- **Headers:** `x-token: [Token]`

### Modificar propia tarea
- **PUT** `/api/programador/tareas/:idTarea/:idUsuario`
- **Headers:** `x-token: [Token]`
- **Body:**
  ```json
  {
    "descripcion": "Tarea modificada 2 2 2"
  }
  ```

### Ranking de usuarios por tareas completadas
- **GET** `/api/programador/ranking`
- **Headers:** `x-token: [Token]`

### Modificar contraseña de un usuario
- **PUT** `/api/programador/change_password/:idUsuario`
- **Headers:** `x-token: [Token]`
- **Body:**
  ```json
  {
    "old_password": "prueba",
    "new_password": "nuevaPassword"
  }
  ```

### Crear usuario (Admin)
- **POST** `/api/admin/usuarios`
- **Headers:** `x-token: [Token]`
- **Body:**
  ```json
  {
    "email": "jjj121@gmail.com",
    "nombre": "jjj",
    "password": "jjj",
    "rol": "admin"
  }
  ```

### Borrar Usuario (Admin)
- **DELETE** `/api/admin/usuarios/:idUsuario`
- **Headers:** `x-token: [Token]`

### Asignar rol a un usuario (Admin)
- **PUT** `/api/admin/usuario/rol/:idUsuario`
- **Headers:** `x-token: [Token]`
- **Body:**
  ```json
  {
    "rol": "programador"
  }
  ```
