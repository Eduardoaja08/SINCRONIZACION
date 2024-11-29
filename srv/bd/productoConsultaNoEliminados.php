<?php

require_once __DIR__ . "/../../lib/php/select.php";
require_once __DIR__ . "/Bd.php";
require_once __DIR__ . "/../modelo/TABLA_PRODUCTO.php";

/**
 * @return array{
 *   PROD_ID: string,
 *   PROD_NOMBRE: string,
 *   PROD_DESCRIPCION: string,
 *   PROD_PRECIO: string,
 *   PROD_MODIFICACION: int,
 *   PROD_ELIMINADO: int
 *  }[]
 */
function productoConsultaNoEliminados()
{
 return select(
  pdo: Bd::pdo(),
  from: PRODUCTO,
  where: [PROD_ELIMINADO => 0],
  orderBy: PROD_NOMBRE
 );
}
