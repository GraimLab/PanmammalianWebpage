// Tell TypeScript that plotly.js/dist/plotly (the pre-built bundle used by
// react-plotly.js) has the same public API as the main plotly.js package.
// This avoids a Vite/Rolldown build error that occurs when importing from the
// plotly.js source entry, which references Node.js built-ins (e.g. "buffer/").
declare module "plotly.js/dist/plotly" {
    export * from "plotly.js";
}
