<?php
if(!empty($_POST["send"])) {
	if(!isset($_POST['g-recaptcha-response']) || empty($_POST['g-recaptcha-response'])){
		$failureMessage = "Wiadomość NIE została wysłana. Potwierdź, że nie jesteś robotem";
		echo "<script type='text/javascript'>alert('$failureMessage');</script>";
	} 
	else{
		$secret = '6Lf7MDYgAAAAABn2Aweh7SHdKUIKeVDSBpSEICdK';

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://www.google.com/recaptcha/api/siteverify?secret='.$secret.'&response='.$_POST['g-recaptcha-response']);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        curl_close($ch);
        $response = json_decode($response);

        if($response->success) {
			$userName = $_POST["userName"];
			$userEmail = $_POST["userEmail"];
			$userMessage = $_POST["userMessage"];
			$toEmail = "bartekDO123@gmail.com";

			$subject = "Nowa wiadomość od: " . $userName . " <" . $userEmail . ">";

			$subjectFrom = "Winnica Rubinowa - potwierdzenie wysłania wiadomości";

			$message = "Nadawca: " . $userName .
			"\r\n Adres e-mail nadawcy: " . $userEmail  . 
			"\r\n Wiadomość: " . $userMessage . "\r\n";

			$messageFrom = "Witaj " . $userName .
			"\r\n" .
			"\r\n Otrzymaliśmy od Ciebie wiadomość. Skontaktujemy się z Tobą niedługo." .
			"\r\n Ta wiadomość została wygenerowana automatycznie. Prosimy na nią nie odpowiadać" . 
			"\r\n" .
			"\r\n Z poważaniem," . 
			"\r\n Winnica Rubinowa.";

			$headers = "From: " . $userName . " <" . $userEmail . ">";

			$mailTo = mail($toEmail, $subject, $message, $headers);
			$mailTo = mail($userEmail, $subjectFrom, $messageFrom, "From: Winnica Rubinowa <winnicarubinowa@gmail.com>");

			$successMessage = "Wiadomość została wysłana Potwierdzenie doręczenia wiadomości zostało wysłane na Twój adres e-mail.";
			echo "<script type='text/javascript'>alert('$successMessage');</script>";
		}
		else{
			$failureMessage = "Wiadomość NIE została wysłana. Potwierdź, że nie jesteś robotem";
			echo "<script type='text/javascript'>alert('$failureMessage');</script>";
		}
	}
}
?>