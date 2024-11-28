<?php

require_once __DIR__ . "/../lib/php/ejecutaServicio.php";
require_once __DIR__ . "/../lib/php/recuperaJson.php";
require_once __DIR__ . "/../lib/php/devuelveJson.php";
require_once __DIR__ . "/../lib/php/ProblemDetails.php";
require_once __DIR__ . "/../lib/php/devuelveProblemDetails.php";
require_once __DIR__ . "/../lib/php/devuelveErrorInterno.php";
require_once __DIR__ . "/modelo/TABLA_PRODUCTO.php";
require_once __DIR__ . "/modelo/validaproducto.php";
require_once __DIR__ . "/bd/productoAgrega.php";
require_once __DIR__ . "/bd/productoBusca.php";
require_once __DIR__ . "/bd/productoConsultaNoEliminados.php";
require_once __DIR__ . "/bd/productoModifica.php";

ejecutaServicio(function () {

 $lista = recuperaJson();

 if (!is_array($lista)) {
  $lista = [];
 }

 foreach ($lista as $modelo) {
  $modeloEnElCliente = validaProducto($modelo);
  $modeloEnElServidor = productoBusca($modeloEnElCliente[PROD_ID]);

  if ($modeloEnElServidor === false) {

   /* CONFLICTO: El modelo no ha estado en el servidor.
    * AGREGARLO solamente si no está eliminado. */
   if ($modeloEnElCliente[PROD_ELIMINADO] === 0) {
    productoAgrega($modeloEnElCliente);
   }
  } elseif (
   $modeloEnElServidor[PROD_ELIMINADO] === 0
   && $modeloEnElCliente[PROD_ELIMINADO] === 1
  ) {

   /* CONFLICTO: El registro está en el servidor, donde no se ha eliminado, pero
    * ha sido eliminado en el cliente.
    * Gana el cliente, porque optamos por no revivir lo eliminado. */
   productoModifica($modeloEnElCliente);
  } else if (
   $modeloEnElCliente[PROD_ELIMINADO] === 0
   && $modeloEnElServidor[PROD_ELIMINADO] === 0
  ) {

   /* CONFLICTO: Registros en el servidor y en el cliente. Pueden ser
    * diferentes.
    * GANA FECHA MÁS GRANDE. Cuando gana el servidor, no se hace nada. */
   if (
    $modeloEnElCliente[PROD_MODIFICACION] >
    $modeloEnElServidor[PROD_MODIFICACION]
   ) {
    // La versión del cliente es más nueva y prevalece.
    productoModifica($modeloEnElCliente);
   }
  }
 }

 $lista = productoConsultaNoEliminados();

 devuelveJson($lista);
});
