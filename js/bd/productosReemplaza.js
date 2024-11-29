import { bdEjecuta } from "../../lib/js/bdEjecuta.js"
import { ALMACEN_PRODUCTO, Bd } from "./Bd.js"

/**
 * Borra el contenido del almacén PRODUCTO y guarda nuevosproductos.
 * @param {import("../modelo/PRODUCTO.js").PRODUCTO[]} nuevosproductos
 */
export async function productosReemplaza(nuevosproductos) {
 return bdEjecuta(Bd, [ALMACEN_PRODUCTO], transaccion => {
  const almacenProducto = transaccion.objectStore(ALMACEN_PRODUCTO)
  almacenProducto.clear()
  for (const objeto of nuevosproductos) {
   almacenProducto.add(objeto)
  }
 })
}