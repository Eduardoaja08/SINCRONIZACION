import { bdEjecuta } from "../../lib/js/bdEjecuta.js"
import { exportaAHtml } from "../../lib/js/exportaAHtml.js"
import { validaId } from "../modelo/validaId.js"
import { validaNombre } from "../modelo/validaNombre.js"
import { validaDescripcion } from "../modelo/validaDescripcion.js"
import { validaPrecio } from "../modelo/validaPrecio.js"
import { ALMACEN_PRODUCTO, Bd } from "./Bd.js"
import { productoBusca } from "./productoBusca.js"

/**
 * @param { import("../modelo/PRODUCTO.js").PRODUCTO } modelo
 */
export async function productoModifica(modelo) {
 validaNombre(modelo.PROD_NOMBRE)
 validaDescripcion(modelo.PROD_DESCRIPCION)
 validaPrecio(modelo.PROD_PRECIO)
 if (modelo.PROD_ID === undefined)
  throw new Error(`Falta PROD_ID de ${modelo.PROD_NOMBRE}.`)
 validaId(modelo.PROD_ID)
 const anterior = await productoBusca(modelo.PROD_ID)
 if (anterior !== undefined) {
  modelo.PROD_MODIFICACION = Date.now()
  modelo.PROD_ELIMINADO = 0
  return bdEjecuta(Bd, [ALMACEN_PRODUCTO], transaccion => {
   const almacenProducto = transaccion.objectStore(ALMACEN_PRODUCTO)
   almacenProducto.put(modelo)
  })
 }
}

exportaAHtml(productoModifica)