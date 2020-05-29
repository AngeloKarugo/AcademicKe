<?php
    require_once ('PHPMailer/PHPMailerAutoload.php');

     class Mail{
         public static function send_mail($subject, $body, $address){
            $mail = new PHPMailer();
            $mail-> isSMTP();
            $mail-> SMTPauth = true;
            $mail-> SMTPSecure = 'ssl';
            $mail-> host = 'smtp.gmail.com';
            $mail-> port = '465';
            $mail-> isHTML();
            $mail-> Username = '';
            $mail-> Password = '';
            $mail-> SetFrom('akarugo2@gmail.com');
            $mail-> Subject = $subject;
            $mail-> Body = $body;
            $mail-> AddAddress($address);

            $mail-> Send();
         }
     }

?>