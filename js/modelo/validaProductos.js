import { validaProducto } from "./validaProducto.js"

/**
 * @param { any } objetos
 * @returns {import("./PRODUCTO.js").PRODUCTO[]}
 */
export function validaProductos(objetos) {
 if (!Array.isArray(objetos))
  throw new Error("no se recibió un arreglo.")
 /**
  * @type {import("./PRODUCTO.js").PRODUCTO[]}
  */
 const arreglo = []
 for (const objeto of objetos) {
  arreglo.push(validaProducto(objeto))
 }
 return arreglo
}