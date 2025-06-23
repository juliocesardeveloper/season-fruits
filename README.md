# 🍓 Season Fruits App

Una aplicación React + Vite que permite explorar frutas de temporada, consultar sus propiedades nutricionales y filtrarlas por distintos criterios como familia, género y orden. Además, puedes guardar tus frutas favoritas.

### 🛠️ Tecnologías utilizadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Bootstrap 5](https://getbootstrap.com/)
- [SASS](https://sass-lang.com/)
- [LocalStorage](https://developer.mozilla.org/es/docs/Web/API/Window/localStorage)

---

### 📁 Estructura del proyecto

src/
│
├── assets/images/fruits/ # Imágenes de frutas
├── fruits/ # Hooks relacionados con la API
│ └── hooks/useApi.js # Hook para llamadas a la API
├── router/
│ └── AppRouter.jsx # Definición de rutas
├── ui/components/ # Componentes reutilizables
│ ├── FruitCard.jsx
│ ├── FruitsGrid.jsx
│ ├── GeneralInformationCard.jsx
│ └── NavbarComponent.jsx
├── pages/
│ └── FruitsPage.jsx # Página principal de frutas
├── SeasonFruitsApp.jsx # Componente raíz con enrutamiento
├── main.jsx # Punto de entrada de la app
└── styles/ # Estilos globales

---

### 🚀 Instalación

1. Clona el repositorio:

git clone https://github.com/tu-usuario/season-fruits-app.git
cd season-fruits-app

2. Instala las dependencias:

yarn


3. Inicia el entorno de desarrollo:

yarn dev

4. Accede a la app en:

📍 http://localhost:5173


### 🔍 Características principales

✅ Búsqueda por familia, orden, género o nombre.

✅ Visualización de propiedades nutricionales acumuladas.

✅ Favoritos almacenados en localStorage.

✅ Botón "See More" para paginar los resultados.

✅ Modo de orden ascendente y descendente.

✅ Interfaz responsiva con Bootstrap.

### 📦 API esperada

La app espera una API REST disponible bajo el path /api/fruit. Endpoints usados:

Endpoint	Descripción
GET /api/fruit/all	Lista de todas las frutas
GET /api/fruit/family/:name	Frutas por familia
GET /api/fruit/order/:name	Frutas por orden
GET /api/fruit/genus/:name	Frutas por género

### 🌄 Imágenes

Las imágenes de las frutas están en la carpeta /assets/images/fruits/ y se gestionan dinámicamente mediante import.meta.glob. Si no se encuentra la imagen correspondiente, se muestra una por defecto: not-available.webp.

### 🧠 Autor
Desarrollado por Julio César Arroyave Herrera
Frontend Developer especializado en ReactJS + VTEX IO