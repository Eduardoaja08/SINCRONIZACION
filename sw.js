/* Este archivo debe estar colocado en la carpeta raíz del sitio.
 * 
 * Cualquier cambio en el contenido de este archivo hace que el service
 * worker se reinstale. */

/**
 * Cambia el número de la versión cuando cambia el contenido de los
 * archivos.
 * 
 * El número a la izquierda del punto (.), en este caso <q>1</q>, se
 * conoce como número mayor y se cambia cuando se realizan
 * modificaciones grandes o importantes.
 * 
 * El número a la derecha del punto (.), en este caso <q>00</q>, se
 * conoce como número menor y se cambia cuando se realizan
 * modificaciones menores.
 */
const VERSION = "2.00"

/**
 * Nombre de la carpeta de caché.
 */
const CACHE = "sincro"

/**
 * Archivos requeridos para que la aplicación funcione fuera de línea.
 */
const ARCHIVOS = [
 "agrega.html",
"index.html",
"modifica.html",
"css/estilos.css",
"img/maskable_icon.png",
"img/maskable_icon_x48.png",
"img/maskable_icon_x72.png",
"img/maskable_icon_x96.png",
"img/maskable_icon_x144.png",
"img/maskable_icon_x192.png",
"img/screenshot_horizontal.png",
"img/screenshot_vertical.png",
"error/datosnojson.html",
"error/eliminadoincorrecto.html",
"error/errorinterno.html",
"error/faltaid.html",
"error/faltanombre.html",
"error/idincorrecto.html",
"error/modificacionincorrecta.html",
"error/nombreenblanco.html",
"error/nombreincorrecto.html",
"error/resultadonojson.html",
"js/esperaUnPocoYSincroniza.js",
"js/registraServiceWorker.js",
"js/renderiza.js",
"js/sincroniza.js",
"js/bd/Bd.js",
"js/bd/productoAgrega.js",
"js/bd/productoBusca.js",
"js/bd/productoConsultaNoEliminados.js",
"js/bd/productoConsultaTodos.js",
"js/bd/productoElimina.js",
"js/bd/productoModifica.js",
"js/bd/productosReemplaza.js",
"js/modelo/PRODUCTO.js",
"js/modelo/validaId.js",
"js/modelo/validaNombre.js",
"js/modelo/validaProducto.js",
"js/modelo/validaProductos.js",
"lib/js/bdConsulta.js",
"lib/js/bdEjecuta.js",
"lib/js/consumeJson.js",
"lib/js/creaIdCliente.js",
"lib/js/enviaJson.js",
"lib/js/exportaAHtml.js",
"lib/js/htmlentities.js",
"lib/js/muestraError.js",
"lib/js/muestraObjeto.js",
"lib/js/ProblemDetails.js",
 "/"
]

// Verifica si el código corre dentro de un service worker.
if (self instanceof ServiceWorkerGlobalScope) {
 // Evento al empezar a instalar el servide worker,
 self.addEventListener("install",
  (/** @type {ExtendableEvent} */ evt) => {
   console.log("El service worker se está instalando.")
   evt.waitUntil(llenaElCache())
  })

 // Evento al solicitar información a la red.
 self.addEventListener("fetch", (/** @type {FetchEvent} */ evt) => {
  if (evt.request.method === "GET") {
   evt.respondWith(buscaLaRespuestaEnElCache(evt))
  }
 })

 // Evento cuando el service worker se vuelve activo.
 self.addEventListener("activate",
  () => console.log("El service worker está activo."))
}

async function llenaElCache() {
 console.log("Intentando cargar caché:", CACHE)
 // Borra todos los cachés.
 const keys = await caches.keys()
 for (const key of keys) {
  await caches.delete(key)
 }
 // Abre el caché de este service worker.
 const cache = await caches.open(CACHE)
 // Carga el listado de ARCHIVOS.
 await cache.addAll(ARCHIVOS)
 console.log("Cache cargado:", CACHE)
 console.log("Versión:", VERSION)
}

/** @param {FetchEvent} evt */
async function buscaLaRespuestaEnElCache(evt) {
 // Abre el caché.
 const cache = await caches.open(CACHE)
 const request = evt.request
 /* Busca la respuesta a la solicitud en el contenido del caché, sin
  * tomar en cuenta la parte después del símbolo "?" en la URL. */
 const response = await cache.match(request, { ignoreSearch: true })
 if (response === undefined) {
  /* Si no la encuentra, empieza a descargar de la red y devuelve
   * la promesa. */
  return fetch(request)
 } else {
  // Si la encuentra, devuelve la respuesta encontrada en el caché.
  return response
 }
}