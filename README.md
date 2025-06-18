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
que contenga dicho array. Cada elemento debe incluir al menos los campos
`title`, `address` y `url`. Opcionalmente se aceptan `phone` y `categoryName`.

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
