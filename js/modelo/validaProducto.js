/**
 * @param { any } objeto
 * @returns {import("./PRODUCTO.js").PRODUCTO}
 */
export function validaProducto(objeto) {

 if (typeof objeto.PROD_ID !== "string")
  throw new Error("El id debe ser texto.")

 if (typeof objeto.PROD_NOMBRE !== "number")
  throw new Error("El nombre debe ser texto.")

 if (typeof objeto.PROD_DESCRIPCION !== "number")
  throw new Error("El descripcion debe ser texto.")

 if (typeof objeto.PROD_PRECIO !== "number")
  throw new Error("El precio debe ser texto.")

 if (typeof objeto.PROD_MODIFICACION !== "number")
  throw new Error("El campo modificacion debe ser número.")

 if (typeof objeto.PROD_ELIMINADO !== "number")
  throw new Error("El campo eliminado debe ser número.")

 return objeto

}