<?php  

/**
 * 
 */
class Login
{
	
	public static function isLoggedIn(){

		if (isset($_COOKIE['SNID'])) {

			if (DB::query('SELECT user_id from login_tokens where token = :token', array(':token' => sha1($_COOKIE['SNID'])))){

				$user_id = DB::query('SELECT user_id from login_tokens where token = :token', array(':token' => sha1($_COOKIE['SNID'])))[0]['user_id'];

				if (isset($_COOKIE['SNID_'])) {

					return $user_id;
					
				} else {
					$cstrong = True;
					$token = bin2hex(openssl_random_pseudo_bytes(64, $cstrong));
					DB::query('INSERT into login_tokens values (\'\', :token, :user_id)', array(':token' => sha1($token), ':user_id' => $user_id));
					DB::query('DELETE from login_tokens where token = :token', array(':token' => sha1($_COOKIE['SNID'])));

					setcookie("SNID", $token, time() + 60*60*24*7, '/', NULL, NULL, True);

					setcookie("SNID_", 1 , time() + 60*60*24*3, '/', NULL, NULL, True);

					return $user_id;
				}
			

			} 

			return false;
		}

	}
	
}

?>