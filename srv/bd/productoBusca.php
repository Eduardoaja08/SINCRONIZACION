<?php

require_once __DIR__ . "/../../lib/php/selectFirst.php";
require_once __DIR__ . "/Bd.php";
require_once __DIR__ . "/../modelo/TABLA_PRODUCTO.php";

/**
 * @return false | array{
 *   PROD_ID: string,
 *   PROD_NOMBRE: string,
 *   PROD_DESCRIPCION: string,
 *   PROD_PRECIO: string,
 *   PROD_MODIFICACION: int,
 *   PROD_ELIMINADO: int
 *  }
 */
function productoBusca(string $id): false|array
{
 return selectFirst(
  pdo: Bd::pdo(),
  from: PRODUCTO,
  where: [PROD_ID => $id]
 );
}
