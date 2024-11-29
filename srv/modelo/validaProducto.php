<?php

require_once __DIR__ . "/../../lib/php/BAD_REQUEST.php";
require_once __DIR__ . "/../../lib/php/validaJson.php";
require_once __DIR__ . "/../../lib/php/ProblemDetails.php";
require_once __DIR__ . "/TABLA_PRODUCTO.php";

function validaProducto($objeto)
{

 $objeto = validaJson($objeto);

 if (!isset($objeto->PROD_ID) || !is_string($objeto->PROD_ID))
  throw new ProblemDetails(
   status: BAD_REQUEST,
   title: "El id debe ser texto.",
   type: "/error/idincorrecto.html",
  );

 if (!isset($objeto->PROD_NOMBRE) || !is_string($objeto->PROD_NOMBRE))
  throw new ProblemDetails(
   status: BAD_REQUEST,
   title: "El nombre debe ser texto.",
   type: "/error/nombreincorrecto.html",
  );

  if (!isset($objeto->PROD_DESCRIPCION) || !is_string($objeto->PROD_DESCRIPCION))
  throw new ProblemDetails(
   status: BAD_REQUEST,
   title: "La descripción debe ser texto.",
   type: "/error/descripcionincorrecto.html",
  );

  if (!isset($objeto->PROD_PRECIO) || !is_string($objeto->PROD_PRECIO))
  throw new ProblemDetails(
   status: BAD_REQUEST,
   title: "El precio debe ser texto.",
   type: "/error/precioincorrecto.html",
  );

 if (!isset($objeto->PROD_MODIFICACION)  || !is_int($objeto->PROD_MODIFICACION))
  throw new ProblemDetails(
   status: BAD_REQUEST,
   title: "La modificacion debe ser número.",
   type: "/error/modificacionincorrecta.html",
  );

  if (!isset($objeto->PROD_ELIMINADO) || !is_int($objeto->PROD_ELIMINADO))
  throw new ProblemDetails(
   status: BAD_REQUEST,
   title: "El campo eliminado debe ser entero.",
   type: "/error/eliminadoincorrecto.html",
  );

 return [
  PROD_ID => $objeto->PROD_ID,
  PROD_NOMBRE => $objeto->PROD_NOMBRE,
  PROD_MODIFICACION => $objeto->PROD_MODIFICACION,
  PROD_PRECIO => $objeto->PROD_PRECIO,
  PROD_DESCRIPCION => $objeto->PROD_DESCRIPCION,
  PROD_ELIMINADO => $objeto->PROD_ELIMINADO
 ];
}
