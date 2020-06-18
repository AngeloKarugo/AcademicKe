<?php
require_once('PHPMailer/PHPMailerAutoload.php');

class Mail
{
    public static function send_mail($to, $msg, $subject, $from = '')
    {

        //    required headers

        $stkheader = array('Content-Type:application/json', 'Cache-Control:no-cache');

        //    url to post the data

        $url = 'https://oyaa.co.ke/api/sendMail.php';



        # initiating curl

        $curl = curl_init();

        //    set curl url

        curl_setopt($curl, CURLOPT_URL, $url);

        //    set cur headers

        curl_setopt($curl, CURLOPT_HTTPHEADER, $stkheader); //setting custom header



        //    data to be posted to the url

        $curl_post_data = array(

            'message' => $msg,

            'to' => $to,

            'subject' =>  $subject,

            'from' => $from

        );



        //json encode the data

        $data_string = json_encode($curl_post_data);

        //    expect to return value from url

        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

        //    set method to POST

        curl_setopt($curl, CURLOPT_POST, true);

        //    set the data to post

        curl_setopt($curl, CURLOPT_POSTFIELDS, $data_string);

        curl_exec($curl);

        //    print the response

        // print_r();

        // sendMail($to, $msg, $subject, $from = '');
    }
}
