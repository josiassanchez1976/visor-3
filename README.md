# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Cargar datos

Al iniciar la aplicación no existen tiendas cargadas. Para importarlas debes
seleccionar un archivo `.json` usando el campo de subida de archivos. El JSON
puede ser un array de objetos o un objeto con una propiedad `stores` o `data`
que contenga dicho array. Cada elemento debe incluir al menos el campo `url`.
Los campos `title` (o `name`), `address` y `categoryName` son opcionales y, si
faltan, se mostrarán como cadenas vacías. Opcionalmente se acepta `phone`.

Ejemplo:

```json
[
  {
    "title": "Metal Store",
    "address": "Calle Falsa 123",
    "phone": "555-1234",
    "categoryName": "Ferretería",
    "url": "https://maps.google.com/?q=Metal+Store"
  }
]
```

## Depuración manual

Al cargar las tiendas se mostrará un botón de **Eliminar** (❌) y uno de **Aprobar** (✅) en cada tarjeta. El botón de eliminar quita la tienda de la vista sin guardar nada. El de aprobar también la oculta, pero la almacena temporalmente en memoria.

Arriba de la lista encontrarás el botón **Exportar aprobadas**. Al pulsarlo se descargará un archivo `approved_stores.txt` con las tiendas aprobadas en el siguiente formato:

```
Nombre
Dirección
Teléfono
Categoría

(repetir por cada tienda)
```

Después de exportar, la lista de aprobadas se vacía. Estos datos sólo existen en memoria; al recargar la página se pierden.
