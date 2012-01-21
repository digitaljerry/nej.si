<?php
// Your name
$myname = 'George Johnson';

// Your email
$myemail = 'your@email.com';

// Email subject
$subject = 'Contact Form';

// Success message
$success = 'Your message has been sent!';



// Don't edit the code below unless you know what you are doing
if ((isset($_POST['name'])) && (strlen(trim($_POST['name'])) > 0)) {
	$fromname = stripslashes(strip_tags($_POST['name']));
} else {$fromname = 'No name entered';}
if ((isset($_POST['email'])) && (strlen(trim($_POST['email'])) > 0)) {
	$fromemail = stripslashes(strip_tags($_POST['email']));
} else {$fromemail = 'No email entered';}
if ((isset($_POST['message'])) && (strlen(trim($_POST['message'])) > 0)) {
	$message = stripslashes(strip_tags($_POST['message']));
} else {$message = 'No message entered';}

$body = '<body>
<table width="400" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td style="font-weight:bold; vertical-align:bottom;">From</td>
  </tr>
  <tr>
	<td>' . $fromname . '</td>
  </tr>
  <tr>
    <td style="font-weight:bold; height:30px; vertical-align:bottom;">Email</td>
  </tr>
  <tr>
	<td>' . $fromemail . '</td>
  </tr>
  <tr>
    <td style="font-weight:bold; height:30px; vertical-align:bottom;">Message</td>
  </tr>
  <tr>
	<td>' . $message . '</td>
  </tr>
</table>
</body>';

require_once 'class.phpmailer.php';

$mail = new PHPMailer(true);

try {
  $mail->AddReplyTo($fromemail, $fromname);
  $mail->AddAddress($myemail, $myname);
  $mail->SetFrom($fromemail, $fromname);
  $mail->Subject = $subject;
  $mail->AltBody = 'To view the message, please use an HTML compatible email viewer.';
  $mail->MsgHTML($body);
  $mail->Send();
  echo '<p class="success">' . $success . '</p>';
} catch (phpmailerException $e) {
  echo $e->errorMessage();
} catch (Exception $e) {
  echo $e->getMessage();
}
?>