<?php

class Bd
{

 private static ?PDO $pdo = null;

 static function pdo(): PDO
 {
  if (self::$pdo === null) {
   self::$pdo = new PDO(
    // cadena de conexión
    "sqlite:sincronizacion.db",
    // usuario
    null,
    // contraseña
    null,
    // Opciones: pdos no persistentes y lanza excepciones.
    [PDO::ATTR_PERSISTENT => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
   );

   self::$pdo->exec(
    'CREATE TABLE IF NOT EXISTS PRODUCTO (
      PROD_ID TEXT NOT NULL,
      PROD_NOMBRE TEXT NOT NULL,
      PROD_DESCRIPCION TEXT NOT NULL,
      PROD_MODIFICACION INTEGER NOT NULL,
      PROD_ELIMINADO INTEGER NOT NULL,
      CONSTRAINT PROD_PK
       PRIMARY KEY(PROD_ID),
      CONSTRAINT PROD_ID_NV
      CHECK(LENGTH(PROD_ID) > 0),
      CONSTRAINT PROD_NOM_NV
      CHECK(LENGTH(PROD_NOMBRE) > 0)
     )'
   );
  }

  return self::$pdo;
 }
}
