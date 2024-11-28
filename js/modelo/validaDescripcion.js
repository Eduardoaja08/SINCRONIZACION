/**
 * @param {string} descripcion
 */
export function validaDescripcion(descripcion) {
    if (descripcion === "")
     throw new Error("Falta el descripcion.")
   }