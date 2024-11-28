import { enviaJson } from "../lib/js/enviaJson.js"
import { exportaAHtml } from "../lib/js/exportaAHtml.js"
import { muestraError } from "../lib/js/muestraError.js"
import { productoConsultaTodos } from "./bd/productoConsultaTodos.js"
import { productosReemplaza } from "./bd/productoReemplaza.js"
import { esperaUnPocoYSincroniza } from "./esperaUnPocoYSincroniza.js"
import { validaProductos } from "./modelo/validaProductos.js"
import { renderiza } from "./renderiza.js"

/**
 * @param {HTMLUListElement} lista
 */
export async function sincroniza(lista) {
 try {
  if (navigator.onLine) {
   const todos = await productoConsultaTodos()
   const respuesta = await enviaJson("srv/sincroniza.php", todos)
   const productos = validaProductos(respuesta.body)
   await productosReemplaza(productos)
   renderiza(lista, productos)
  }
 } catch (error) {
  muestraError(error)
 }
 esperaUnPocoYSincroniza(lista)

}
 
exportaAHtml(sincroniza)