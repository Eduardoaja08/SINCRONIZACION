<?php

require_once __DIR__ . "/BAD_REQUEST.php";
require_once __DIR__ . "/ProblemDetails.php";

function validaPrecio(false|string $precio)
{

 if ($precio === false)
  throw new ProblemDetails(
   status: BAD_REQUEST,
   title: "Falta el precio.",
   type: "/error/faltaprecio.html",
   detail: "La solicitud no tiene el valor de precio."
  );

 $trimPrecio = trim($precio);

 if ($trimPrecio === "")
  throw new ProblemDetails(
   status: BAD_REQUEST,
   title: "Precio en blanco.",
   type: "/error/precioenblanco.html",
   detail: "Pon texto en el campo precio.",
  );

 return $trimPrecio;
}
