\# Polymarket Prediction Explorer



\## Respaldo de la base de datos



Por el tamaño del respaldo completo de la base de datos, el archivo no se subió directamente a GitHub.



El respaldo completo puede descargarse desde Google Drive:



https://drive.google.com/file/d/1gF5n8kBRfMBJt2iyXvDOVsWgYRANKLY0/view?usp=sharing



Archivo incluido:

polymarket\_db.zip



Después de descargarlo, se debe descomprimir el archivo e importar `polymarket\_db.sql` en MySQL Workbench.



\## Descripción del proyecto



Polymarket Prediction Explorer es una aplicación web que permite consultar información de mercados de predicción almacenados en una base de datos MySQL. El sistema utiliza un backend con Node.js y Express para consultar la base de datos y devolver resultados en formato JSON. También cuenta con un frontend en HTML, CSS y JavaScript para que el usuario pueda realizar búsquedas y visualizar los resultados de forma más clara.



El objetivo principal del proyecto es demostrar el uso de bases de datos, consultas SQL, backend, API en formato JSON y frontend conectado a datos reales.



\## Fuente de datos



Los datos utilizados provienen de un archivo en formato `.parquet` relacionado con mercados de Polymarket. Este archivo fue procesado con Python y cargado posteriormente en una base de datos MySQL.



Por el tamaño del archivo original, el proyecto puede incluir un respaldo SQL de la base de datos o el script necesario para reconstruirla.



\## Tecnologías utilizadas



\* MySQL

\* MySQL Workbench

\* Python

\* Pandas

\* PyArrow

\* SQLAlchemy

\* PyMySQL

\* Node.js

\* Express

\* MySQL2

\* CORS

\* Dotenv

\* HTML

\* CSS

\* JavaScript

\* JSON



\## Estructura general del proyecto



```text

polymarket-api/

├─ backend/

│  ├─ config/

│  ├─ controllers/

│  ├─ models/

│  ├─ routes/

│  ├─ index.js

│  ├─ package.json

│  └─ .env.example

│

├─ frontend/

│  └─ index.html

│

├─ database/

│  └─ polymarket\\\_db.sql

│

├─ load\\\_markets\\\_to\\\_mysql.py

├─ README.md

├─ ABRIR\\\_PRIMERO.txt

└─ .gitignore

```



\## Base de datos



La base de datos utilizada se llama:



```sql

polymarket\\\_db

```



La tabla principal se llama:



```sql

markets

```



Esta tabla contiene información como:



\* ID del mercado

\* Pregunta del mercado

\* Estado del mercado

\* Precios de resultados

\* Volumen

\* Fechas

\* Información del evento



\## Funcionalidades principales



La aplicación permite realizar consultas como:



\* Ver estadísticas generales de la base de datos.

\* Buscar mercados por palabra clave.

\* Consultar mercados activos.

\* Consultar mercados cerrados.

\* Consultar mercados con mayor volumen.

\* Consultar mercados competitivos.

\* Consultar mercados con favoritos fuertes.

\* Mostrar resultados en una interfaz visual.



\## Rutas principales de la API



```text

GET /api

GET /api/markets/stats

GET /api/markets/search?q=bitcoin

GET /api/markets/open-top-volume

GET /api/markets/competitive

GET /api/markets/strong-favorites

GET /api/markets/newest-open

GET /api/markets/resolved

GET /api/markets/random-open

```



\## Cómo ejecutar el proyecto



\### 1. Crear la base de datos en MySQL



En MySQL Workbench:



```sql

CREATE DATABASE polymarket\\\_db;

USE polymarket\\\_db;

```



\### 2. Cargar los datos



Si se cuenta con el archivo `.parquet`, ejecutar el script de carga:



```cmd

py load\\\_markets\\\_to\\\_mysql.py

```



También se puede importar el respaldo SQL desde la carpeta `database`, si está incluido en el proyecto.



\### 3. Configurar el backend



Entrar a la carpeta del backend:



```cmd

cd backend

```



Instalar dependencias:



```cmd

npm install

```



Crear un archivo `.env` usando como referencia `.env.example`:



```env

DB\\\_HOST=localhost

DB\\\_USER=root

DB\\\_PASSWORD=tu\\\_password

DB\\\_NAME=polymarket\\\_db

DB\\\_PORT=3306

PORT=3000

```



\### 4. Ejecutar el backend



Dentro de la carpeta `backend`:



```cmd

node index.js

```



El backend se ejecuta en:



```text

http://localhost:3000

```



\### 5. Abrir el frontend



Abrir el archivo:



```text

frontend/index.html

```



El frontend consume la API local y muestra los datos de forma visual.



\## Explicación general



El proyecto funciona mediante una arquitectura de tres partes:



1\. \*\*MySQL:\*\* almacena los datos de los mercados.

2\. \*\*Backend Node.js/Express:\*\* consulta la base de datos y responde en formato JSON.

3\. \*\*Frontend HTML/CSS/JavaScript:\*\* muestra los datos al usuario mediante botones, buscador y tarjetas visuales.



Este proyecto demuestra el manejo de datos reales, carga de información a MySQL, creación de una API JSON y consumo de datos desde una interfaz web.





