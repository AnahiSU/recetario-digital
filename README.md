# Munay – Recetario Digital

Aplicación web para guardar y organizar recetas de cocina propias, planificar un menú semanal por día y tiempo de comida (desayuno, almuerzo, cena) y generar una lista de compras a partir de las recetas y del menú planificado.

**Demo:** https://anahisu.github.io/recetario-digital

## Funcionalidades

- **Mis Recetas**: catálogo de recetas propias en formato de tarjetas, filtrable por categoría (Postres, Comida, Bebidas, Ensaladas).
- **Detalle de receta**: consulta de ingredientes, pasos de preparación y notas; opciones para editar o eliminar.
- **Nueva receta / Editar receta**: formulario para registrar nombre, porciones, tiempo, categoría, foto, ingredientes, preparación y notas.
- **Buscar**: búsqueda de recetas por nombre y acceso rápido a recetas recientes.
- **Menú semanal**: planificación de desayuno, almuerzo y cena por día de la semana.
- **Lista de compras**: alta manual de productos, marcado como comprado, eliminación, y generación de la lista a partir del menú semanal.
- **Perfil**: edición de datos de usuario (username, correo, foto de perfil).

## Stack técnico

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) como bundler y servidor de desarrollo
- [React Router](https://reactrouter.com/) para el enrutamiento
- [Tailwind CSS](https://tailwindcss.com/) para los estilos
- [react-icons](https://react-icons.github.io/react-icons/) para la iconografía
- [ESLint](https://eslint.org/) para el análisis estático de código

Los datos de recetas, menú semanal y perfil se manejan en memoria mediante Context API de React y se inicializan a partir de archivos mock en `src/mocks/`; al recargar la página se restablecen a sus valores originales.

## Estructura del proyecto

```
src/
├── assets/            # Imágenes y recursos estáticos
├── components/        # Componentes reutilizables (Sidebar, Navbar, tarjetas, modales, etc.)
├── context/           # RecipesContext: estado global de recetas
├── mocks/             # Datos de ejemplo (recipes.json, weekMenu.json, profile.json)
├── pages/             # Vistas de la aplicación (una por ruta)
│   ├── MyRecipes.tsx
│   ├── RecipeDetail.tsx
│   ├── RecipeForm.tsx
│   ├── SearchReceipts.tsx
│   ├── WeeklyMenu.tsx
│   ├── ShoppingList.tsx
│   └── Profile.tsx
├── App.tsx            # Definición de rutas
└── main.tsx            # Punto de entrada
```

## Rutas principales

| Ruta                      | Vista                          |
|---------------------------|---------------------------------|
| `/mis-recetas`             | Catálogo de recetas             |
| `/mis-recetas/:id`         | Detalle de una receta           |
| `/receta/nueva`            | Formulario de nueva receta      |
| `/receta/editar/:id`       | Formulario de edición de receta |
| `/buscar`                  | Búsqueda de recetas             |
| `/menu-semanal`            | Planificación del menú semanal  |
| `/carrito`                 | Lista de compras                |
| `/perfil`                  | Perfil de usuario               |

## Instalación y uso

Este proyecto usa [pnpm](https://pnpm.io/) como gestor de paquetes.

```bash
# Clonar el repositorio
git clone https://github.com/AnahiSU/recetario-digital.git
cd recetario-digital

# Instalar dependencias
pnpm install

# Levantar el entorno de desarrollo
pnpm dev
```

La aplicación quedará disponible en `http://localhost:5173`.

### Otros scripts disponibles

| Comando          | Descripción                                              |
|-------------------|-----------------------------------------------------------|
| `pnpm dev`        | Inicia el servidor de desarrollo con hot reload            |
| `pnpm build`      | Compila TypeScript y genera el build de producción en `dist/` |
| `pnpm preview`    | Sirve localmente el build de producción                    |
| `pnpm lint`       | Ejecuta ESLint sobre el proyecto                            |
| `pnpm deploy`     | Publica el build en GitHub Pages (rama `gh-pages`)          |

## Despliegue

El proyecto se despliega en GitHub Pages mediante `gh-pages`. Para generar y publicar una nueva versión:

```bash
pnpm deploy
```

Esto ejecuta `pnpm build` (a través de `predeploy`) y publica el contenido de `dist/` en la rama `gh-pages`.

## Autoría

Proyecto desarrollado para la materia de Interacción Humano-Computador, Facultad de Ciencias y Tecnología, Universidad Mayor de San Simón.

- Alisson Dalet Alvarado
- Leonel Zeballos Aldunate
- Anahi Sanabria Ugarte
