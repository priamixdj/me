<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

// CONFIGURAZIONE SMTP
$gmailAddress = 'mix.pria@gmail.com'; // la tua email Gmail
$gmailAppPassword = 'utzi hnsw zdgi pldm'; // password per app Gmail

// Solo se arriva POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // --- RACCOLTA E PULIZIA DATI ---
    $name = trim($_POST['nome'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $message = trim($_POST['message'] ?? '');

    // --- VALIDAZIONE ---
    $errors = [];

    // Nome valido (2-50 caratteri, solo lettere e spazi)
    if (!preg_match('/^[a-zA-ZÀ-ÿ\'\s]{2,50}$/', $name)) {
        $errors[] = "Nome non valido";
    }

    // Email valida (opzionale, ma se presente deve essere corretta)
    if (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Email non valida";
    }

    // Messaggio valido
    if (!empty($errors)) {
        // Stampa errori e termina
        foreach ($errors as $error) {
            echo $error . "<br>";
        }
        exit;
    }

    // --- SANITIZZAZIONE OUTPUT ---
    $safe_message = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));

    // --- INVIO EMAIL ---
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = $gmailAddress;
        $mail->Password = $gmailAppPassword;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Mittente (Gmail)
        $mail->setFrom($gmailAddress, 'Modulo Contatti');

        // Reply-To solo se valido
        if (!empty($email)) {
            $mail->addReplyTo($email, $name);
        }

        // Destinatario (la tua email)
        $mail->addAddress($gmailAddress);

        // Contenuto
        $mail->isHTML(true);
        $mail->Subject = 'Nuovo messaggio dal modulo contatti';
        $mail->Body = "
            <h3>Hai ricevuto un nuovo messaggio</h3>
            <p><strong>Nome:</strong> {$name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Messaggio:</strong><br>{$message}</p>
        ";

        $mail->send();

        $mittente_mail = new PHPMailer(true);
        $mittente_mail->isSMTP();
        $mittente_mail->Host = $mail->Host;
        $mittente_mail->SMTPAuth = $mail->SMTPAuth;
        $mittente_mail->Username = $mail->Username;
        $mittente_mail->Password = $mail->Password;
        $mittente_mail->SMTPSecure = $mail->SMTPSecure;
        $mittente_mail->Port = $mail->Port;

        // Mittente (Gmail)
        $mittente_mail->setFrom($gmailAddress, 'Modulo Contatti - Priamix Portfolio');

        // Destinatario (utente che ha scritto il form)
        if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $mittente_mail->addAddress($email, $name);
        }

        // Contenuto
        $mittente_mail->isHTML(true);
        $mittente_mail->Subject = 'Ricevuto il tuo messaggio!';
        $mittente_mail->Body = '
            <style> 
                h3 { color: #4CAF50; }
                p { font-size: 16px; }
                body { font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; }
            </style>
            <h3 style="color: #4CAF50; ">Ciao {$name}, abbiamo ricevuto il tuo messaggio!</h3>
            <p><strong>Messaggio:</strong><br>{$message}</p>
        ';

        // Invia
        $mittente_mail->send();
        header('Location: index.php#contattami?success_contact_mail=1');
        exit();

    } catch (Exception $e) {
        header('Location: index.php#contattami?success_contact_mail=0');
        exit();
    }   
}
?>
