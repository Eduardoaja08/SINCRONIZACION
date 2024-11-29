<?php

require_once __DIR__ . "/../../lib/php/validaNombre.php";
require_once __DIR__ . "/../../lib/php/validaDescripcion.php";
require_once __DIR__ . "/../../lib/php/validaPrecio.php";
require_once __DIR__ . "/../../lib/php/insert.php";
require_once __DIR__ . "/Bd.php";
require_once __DIR__ . "/../modelo/TABLA_PRODUCTO.php";
require_once __DIR__ . "/../modelo/validaId.php";

/**
 * @param array{
 *   PROD_ID: string,
 *   PROD_NOMBRE: string,
 *   PROD_DESCRIPCION: string,
 *   PROD_PRECIO: string,
 *   PROD_MODIFICACION: int,
 *   PROD_ELIMINADO: int
 *  } $modelo
 */
function productoAgrega(array $modelo)
{
 validaId($modelo[PROD_ID]);
 validaNombre($modelo[PROD_NOMBRE]);
 validaDescripcion($modelo[PROD_DESCRIPCION]);
 validaPrecio($modelo[PROD_PRECIO]);
 insert(pdo: Bd::pdo(), into: PRODUCTO, values: $modelo);
}
