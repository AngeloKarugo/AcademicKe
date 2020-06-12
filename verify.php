<?php
include_once 'classes/DB.php';

$user_id = $_GET['user_id'];
$code = $_GET['code'];

if (DB::query('SELECT id from verification_tokens where user_id = :user_id and code = :code', array(':user_id' => $user_id, ':code' => $code))) {

    $time_now = $_SERVER['REQUEST_TIME'];

    $time_requested = DB::query('SELECT time from verification_tokens where user_id = :user_id and code = :code', array(':user_id' => $user_id, ':code' => $code))[0]['time'];

    if ((($time_now - $time_requested) / 60) < 5) {
        DB::query('UPDATE users set active = 1 where id = :id', array('id' => $user_id));
        DB::query('DELETE from verification_tokens where user_id = :user_id and code = :code', array(':user_id' => $user_id, ':code' => $code));

        echo "verified successfully. You can close this tab and proceed with setting up your account";
    } else {
        DB::query('DELETE from verification_tokens where user_id = :user_id and code = :code', array(':user_id' => $user_id, ':code' => $code));

        echo "Sorry, that link is expired, please request for a new verification link";
    }
}

echo "<html><script type='text/javascript'>setTimeout(function () {window.close();}, 2000);</script></html>";
