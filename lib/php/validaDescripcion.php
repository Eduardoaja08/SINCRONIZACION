<?php

require_once __DIR__ . "/BAD_REQUEST.php";
require_once __DIR__ . "/ProblemDetails.php";

function validaDescripcion(false|string $descripcion)
{

 if ($descripcion === false)
  throw new ProblemDetails(
   status: BAD_REQUEST,
   title: "Falta el descripcion.",
   type: "/error/faltadescripcion.html",
   detail: "La solicitud no tiene el valor de descripcion."
  );

 $trimDescripcion = trim($descripcion);

 if ($trimDescripcion === "")
  throw new ProblemDetails(
   status: BAD_REQUEST,
   title: "Descripcion en blanco.",
   type: "/error/descripcionenblanco.html",
   detail: "Pon texto en el campo descripcion.",
  );

 return $trimDescripcion;
}
