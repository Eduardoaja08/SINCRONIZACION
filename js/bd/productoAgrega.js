import { bdEjecuta } from "../../lib/js/bdEjecuta.js"
import { creaIdCliente } from "../../lib/js/creaIdCliente.js"
import { ALMACEN_PRODUCTO, Bd } from "./Bd.js"
import { validaNombre } from "../modelo/validaNombre.js"
import { exportaAHtml } from "../../lib/js/exportaAHtml.js"

/**
 * @param {import("../modelo/PRODUCTO.js").PRODUCTO} modelo
 */
export async function productoAgrega(modelo) {
 validaNombre(modelo.PROD_NOMBRE)
 modelo.PROD_MODIFICACION = Date.now()
 modelo.PROD_ELIMINADO = 0
 // Genera id único en internet.
 modelo.PROD_ID = creaIdCliente(Date.now().toString())
 return bdEjecuta(Bd, [ALMACEN_PRODUCTO], transaccion => {
  const almacenProducto = transaccion.objectStore(ALMACEN_PRODUCTO)
  almacenProducto.add(modelo)
 })
}

exportaAHtml(productoAgrega)