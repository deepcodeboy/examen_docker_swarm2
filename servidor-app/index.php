<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Formulario para Personas</title>
    <!-- Estilos y otras etiquetas head necesarias aquí -->
</head>
<body>

<?php
$mensaje = "";

// Manejo de la petición POST para el servicio REST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recopilación de datos del formulario
    $data = array(
        'apellidos' => $_POST['apellidos'],
        'nombres' => $_POST['nombres'],
        'dni' => $_POST['dni']
    );

    // Configuración de la petición POST
    $options = array(
        'http' => array(
            'header'  => "Content-type: application/json\r\n",
            'method'  => 'POST',
            'content' => json_encode($data)
        )
    );

    $context  = stream_context_create($options);
    $result = file_get_contents("http://rest-service:8080/insertar_con_rest", false, $context);

    // Manejo de la respuesta del servicio REST
    if ($result === FALSE) {
        $mensaje = "Error al enviar los datos";
    } else {
        $mensaje = "Datos enviados correctamente";
    }
}

// Petición GET al servicio SOAP
$soapResponse = "";
try {
    $wsdl = "http://soap-service:8888/consultar_con_soap?wsdl";
    $client = new SoapClient($wsdl);
    $soapResponse = $client->consultarPersonas();
} catch (SoapFault $fault) {
    $soapResponse = "Error: " . $fault->getMessage();
}
?>

<!-- Formulario para el servicio REST -->
<div>
    <form method="post">
        <input type="text" name="apellidos" placeholder="Apellidos" required>
        <input type="text" name="nombres" placeholder="Nombres" required>
        <input type="text" name="dni" placeholder="DNI" required>
        <button type="submit">Enviar</button>
    </form>
</div>

<!-- Mensaje de respuesta del servicio REST -->
<?php if ($mensaje): ?>
    <p><?php echo $mensaje; ?></p>
<?php endif; ?>

<!-- Respuesta del servicio SOAP -->
<div>
    <h2>Respuesta del Servicio SOAP:</h2>
    <pre><?php print_r($soapResponse); ?></pre>
</div>

</body>
</html>
