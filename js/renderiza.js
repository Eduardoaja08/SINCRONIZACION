import { exportaAHtml } from "../lib/js/exportaAHtml.js"
import { htmlentities } from "../lib/js/htmlentities.js"

/**
 * @param {HTMLUListElement} lista
 * @param {import("./modelo/PRODUCTO.js").PRODUCTO[]} productos
 */
export function renderiza(lista, productos) {
 let render = ""
 for (const modelo of productos) {
  if (modelo.PROD_ID === undefined)
   throw new Error(`Falta PROD_ID de ${modelo.PROD_NOMBRE}.`)
  const nombre = htmlentities(modelo.PROD_NOMBRE)
  const descripcion = htmlentities(modelo.PROD_DESCRIPCION)
  const precio = htmlentities(modelo.PROD_PRECIO)
  const searchParams = new URLSearchParams([["id", modelo.PROD_ID]])
  const params = htmlentities(searchParams.toString())
  render += /* html */
   `<li>
     <p><a href="modifica.html?${params}">${nombre} - ${descripcion} - ${precio}</a></p>
    </li>`
 }
 lista.innerHTML = render
}

exportaAHtml(renderiza)