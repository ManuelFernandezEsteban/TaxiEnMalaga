<?php
    /*mail('lolo3f@gmail.com','prueba','esto es una prueba');

    963830950272-as3o1j4398mg8ipbisagkudpr883bv5c.apps.googleusercontent.com

    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*/
require './phpMailer/Exception.php';
require './phpMailer/PHPMailer.php';
require './phpMailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;

use PHPMailer\PHPMailer\SMTP;
 
$oMail= new PHPMailer();
$oMail->isSMTP();
$oMail->Host="smtp.gmail.com";
//$oMail->SMTPDebug = SMTP::DEBUG_SERVER;
$oMail->Port=465;
$oMail->SMTPSecure="ssl";
$oMail->SMTPAuth=true;
$oMail->Username="pruebasenviomail02@gmail.com";
$oMail->Password="wamsbpkcmonndqlk";
$oMail->setFrom("pruebasenviomail02@gmail.com","Taxi En Malaga");
$oMail->addAddress($_POST['email'],"TaxiEnMalaga");
$oMail->Subject="Reserva";
$oMail->msgHTML($_POST['fecha']);
//TO-DO enviar correo con todos los datos en formato HTML y texto  
if(!$oMail->send())
  echo json_encode($oMail->ErrorInfo);
else
  echo json_encode('Enviado con exito');
?>
