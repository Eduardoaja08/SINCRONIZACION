import { bdConsulta } from "../../lib/js/bdConsulta.js"
import { exportaAHtml } from "../../lib/js/exportaAHtml.js"
import { validaProducto } from "../modelo/validaProducto.js"
import { ALMACEN_PRODUCTO, Bd } from "./Bd.js"

/**
 * @param {string} id
 */
export async function productoBusca(id) {

 return bdConsulta(Bd, [ALMACEN_PRODUCTO],
  /**
   * @param {(resultado: import("../modelo/PRODUCTO.js").PRODUCTO|undefined)
   *                                                            => any} resolve 
   */
  (transaccion, resolve) => {

   /* Pide el primer objeto de ALMACEN_PRODUCTO que tenga como llave
    * primaria el valor del parámetro id. */
   const consulta = transaccion.objectStore(ALMACEN_PRODUCTO).get(id)

   // onsuccess se invoca solo una vez, devolviendo el objeto solicitado.
   consulta.onsuccess = () => {
    /* Se recupera el objeto solicitado usando
     *  consulta.result
     * Si el objeto no se encuentra se recupera undefined. */
    const objeto = consulta.result
    if (objeto !== undefined) {
     const modelo = validaProducto(objeto)
     if (modelo.PROD_ELIMINADO === 0) {
      resolve(modelo)
      return
     }
    }
    resolve(undefined)

   }

  })

}

exportaAHtml(productoBusca)