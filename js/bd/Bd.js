export const ALMACEN_PRODUCTO = "PRODUCTO"
export const PROD_ID = "PROD_ID"
export const INDICE_NOMBRE = "INDICE_NOMBRE"
export const PROD_NOMBRE = "PROD_NOMBRE"
export const PROD_DESCRIPCION = "PROD_DESCRIPCION"
const BD_NOMBRE = "sincronizacion"
const BD_VERSION = 1

/** @type { Promise<IDBDatabase> } */
export const Bd = new Promise((resolve, reject) => {

 /* Se solicita abrir la base de datos, indicando nombre y
  * número de versión. */
 const solicitud = indexedDB.open(BD_NOMBRE, BD_VERSION)

 // Si se presenta un error, rechaza la promesa.
 solicitud.onerror = () => reject(solicitud.error)

 // Si se abre con éxito, devuelve una conexión a la base de datos.
 solicitud.onsuccess = () => resolve(solicitud.result)

 // Si es necesario, se inicia una transacción para cambio de versión.
 solicitud.onupgradeneeded = () => {

  const bd = solicitud.result

  // Como hay cambio de versión, borra el almacén si es que existe.
  if (bd.objectStoreNames.contains(ALMACEN_PRODUCTO)) {
   bd.deleteObjectStore(ALMACEN_PRODUCTO)
  }

  // Crea el almacén "PASATIEMPO" con el campo llave "PAS_ID".
  const almacenProducto =
   bd.createObjectStore(ALMACEN_PRODUCTO, { keyPath: PROD_ID })

  // Crea un índice ordenado por el campo "PAS_NOMBRE" que no acepta duplicados.
  almacenProducto.createIndex(INDICE_NOMBRE, "PROD_NOMBRE")
 }

})