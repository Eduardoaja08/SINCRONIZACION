import { bdEjecuta } from "../../lib/js/bdEjecuta.js"
import { exportaAHtml } from "../../lib/js/exportaAHtml.js"
import { ALMACEN_PRODUCTO, Bd } from "./Bd.js"
import { productoBusca } from "./productoBusca.js"

/**
 * @param { string } id
 */
export async function productoElimina(id) {
 const modelo = await productoBusca(id)
 if (modelo !== undefined) {
  modelo.PROD_MODIFICACION = Date.now()
  modelo.PROD_ELIMINADO = 1
  return bdEjecuta(Bd, [ALMACEN_PRODUCTO], transaccion => {
   const almacenProducto = transaccion.objectStore(ALMACEN_PRODUCTO)
   almacenProducto.put(modelo)
  })
 }
}

exportaAHtml(productoElimina)