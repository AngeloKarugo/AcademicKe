<?php  

/**
 * 
 */
class Notify {
	
	public static function createNotify($text, $post_id){
		$text = explode(" ", $text); #split the input text into an array individual words 
		$notify = array();

		foreach ($text as $word) { #loops through the array of words in the input string
			# code...
			if (substr($word, 0, 1) == "@" && strlen($word)>1) { #this substr function returns the first letter of the word; if the first character of a word is '@', it will be displayed as a link
				# code...
					
				$notify[substr($word, 1)] = array("type" => 1, "extra" => '{"post_body": "'.htmlentities(implode($text, " ")).'"}');
			} 
		}

		if (count($text) == 1 && $post_id != 0) {
			# code...

			$temp = DB::query('SELECT posts.user_id as receiver, post_likes.user_id as sender from posts, post_likes where posts.id = post_likes.post_id and posts.id = :post_id', array(':post_id' => $post_id));

			$r = $temp[0]["receiver"];
			$s = $temp[0]["sender"];

			DB::query('INSERT into notifications values (\'\', :type, :receiver, :sender, :extra)', array(':type' => 2, ':receiver' => $r, ':sender' => $s, ':extra' => ""));
		}

		return $notify;
	}
}

?>