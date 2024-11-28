<?php

require_once __DIR__ . "/../../lib/php/validaNombre.php";
require_once __DIR__ . "/../../lib/php/validaDescripcion.php";
require_once __DIR__ . "/../../lib/php/update.php";
require_once __DIR__ . "/Bd.php";
require_once __DIR__ . "/../modelo/TABLA_PRODUCTO.php";
require_once __DIR__ . "/../modelo/validaId.php";

/**
 * @param array{
 *   PROD_ID: string,
 *   PROD_NOMBRE: string,
 *   PROD_MODIFICACION: int,
 *   PROD_ELIMINADO: int
 *  } $modelo
 */
function productoModifica(array $modelo)
{
 validaId($modelo[PROD_ID]);
 validaNombre($modelo[PROD_NOMBRE]);
 validaDescripcion($modelo[PROD_DESCRIPCION]);
 update(
  pdo: Bd::pdo(),
  table: PRODUCTO,
  set: $modelo,
  where: [PROD_ID => $modelo[PROD_ID]]
 );
}
