<?php

include_once 'classes/Notify.php';

	class Post
	{
		public static function createPost($post_body, $loggedInUser, $profile_user_id, $type, $topic){

			if ($loggedInUser == $profile_user_id) {//to ensure only the owner of the profile can write posts to the profile

				DB::query('INSERT into posts values (\'\', :post_body, unix_timestamp(), :user_id, 0, 0, 0, \'\', :post_topic, :post_type)', array(':post_body' => $post_body, ':user_id' => $profile_user_id, ':post_type' => $type, ':post_topic' => $topic));

				$post_id = DB::query('SELECT id from posts where user_id = :user_id order by id desc limit 1', array(':user_id' => $profile_user_id))[0]['id'];

				// if (count(Notify::createNotify($post_body, $post_id)) != 0) {
				// 	# code...
				// 		foreach (Notify::createNotify($post_body, $post_id) as $key => $n) {
				// 		# code...

				// 		$r = DB::query('SELECT id from users where username = :username', array(':username' => $key))[0]['id'];

				// 		if ($r != 0) {
				// 			# code...
				// 			DB::query('INSERT into notifications values (\'\', :type, :receiver, :sender, :extra)', array(':type' => $n["type"], ':receiver' => $r, ':sender' => $loggedInUser, ':extra' => $n["extra"]));				
				// 		}

				// 	}
				// }
							# code...
				
			} else {
				die(' you cannot post on another user\'s profile');
			}
		}

		public static function likePost($post_id, $likerId){
			if (!DB::query('SELECT user_id from post_likes where post_id = :post_id and user_id = :user_id', array(':post_id' => $post_id, ':user_id' => $likerId))) {
				# code...
				DB::query('UPDATE posts set likes = likes + 1 where id = :post_id', array(':post_id' => $post_id));

				DB::query('INSERT into post_likes values (\'\', :post_id, :user_id)', array(':post_id' =>$post_id, ':user_id' => $likerId));

				$user_id = DB::query('SELECT user_id from posts where id = :post_id',array(':post_id' => $post_id))[0]['user_id'];

				if ($likerId != $user_id) {
					Notify::createNotify("", $post_id);
					# code...
				}


			} else {
				DB::query('UPDATE posts set likes = likes - 1 where id = :post_id', array(':post_id' => $post_id));

				DB::query('DELETE from post_likes where post_id = :post_id and user_id = :user_id', array(':post_id' =>$post_id, ':user_id' => $likerId));
			}
		}

		public static function mentions($text){

			$text = explode(" ", $text); #split the input text into an array individual words 
			$new_string = "";

			foreach ($text as $word) { #loops through the array of words in the input string
				# code...
				if (substr($word, 0, 1) == "@" && strlen($word)>1) { #this substr function returns the first letter of the word; if the first character of a word is '@', it will be displayed as a link
					# code...
					$new_string .= "<a href = 'profile.php?username=".substr($word, 1)."'>".htmlspecialchars($word)." </a>"; //making the word preceded by @ sign to be a link pointing to the profile of the username mentioned
				} else {

				$new_string .= htmlspecialchars($word)." ";

				}
			}

			return $new_string;

		}

		public static function displayPosts($user_id, $username, $logged_in_user_id){
			$dbposts = DB::query('SELECT posts.id, posts.body, posts.likes, posts.shares, posts.user_id, posts.posted_at FROM posts where posts.user_id = :user_id
			/* posts by the owner of the profile */ 
			UNION ALL 
			SELECT shared_posts.post_id as id, posts.body, posts.likes, posts.shares, shared_posts.user_id, shared_posts.date_shared AS posted_at from posts, shared_posts where shared_posts.user_id = :user_id and shared_posts.post_id = posts.id 
			/* posts shared by the owner of the profile */
			ORDER BY `posted_at` DESC', array(':user_id' => $user_id)); //selects all the user's posts plus other users' posts that they have shared

			$posts = "";

			foreach ($dbposts as $p) {

				$post_owner_id = DB::query('SELECT users.id from users, posts where posts.user_id = users.id and posts.id = :post_id', array(':post_id' => $p['id']))[0]['id'];

				$post_owner_name = DB::query('SELECT username from users where id = :user_id', array(':user_id' => $post_owner_id))[0]['username'];


				if (DB::query('SELECT id from shared_posts where post_id = :post_id /* and user_id = :user_id */', array(':post_id' => $p['id']/* , ':user_id' => $user_id */)) && $user_id != $post_owner_id) {
					# code...
					// posts shared by the owner of the profile

					$shared_by_id = DB::query('SELECT users.id from users, shared_posts where shared_posts.user_id = users.id and shared_posts.post_id = :post_id', array(':post_id' => $p['id']))[0]['id'];

					if ($p['body'] == "This post has been removed due to abuse of site policies.") {
						# code...
						$posts .= $posts.= $username." shared ".$post_owner_name."'s post: <br><br>";
						$posts .= "<strong>".$post_owner_name."</strong><br>";
						$posts .= $p['body'];
					} else {						
						$posts.= $username." shared ".$post_owner_name."'s post: <br><br>";
						$posts .= "<strong>".$post_owner_name."</strong><br>";
						$posts .= self::mentions($p['body'])."
						<form action='profile.php?username=$username&post_id=
						".$p['id']."'method = 'post'><br>";

						if (!DB::query('SELECT post_id from post_likes where post_id = :post_id and user_id = :user_id', array(':post_id' => $p['id'], ':user_id' => $logged_in_user_id))) {
							# code...
								$posts .= "<input type='submit' name='like' value ='Like'>";
								
						} else {
							# code...
							$posts .= "<input type='submit' name='unlike' value ='Unlike'>";

						}
						$posts .= "<span> ".$p['likes']." likes </span>";

						if (!DB::query('SELECT id from shared_posts where post_id = :post_id and user_id = :user_id', array(':post_id' => $p['id'], ':user_id' => $logged_in_user_id))) {
							# code...
							$posts .= "<input type = 'submit' name = 'share_post' value = 'Share'>";
						} else {
							# code...
							$posts .= "<input type = 'submit' name = 'unshare' value = 'Undo share'>";
						}

						$posts.="<span> ".$p['shares']." reposts </span>";

						$posts.="<hr><br>
						</form>";
					}
		
				} else {

					if ($p['body'] == "This post has been removed due to abuse of site policies.") {
						# code...
						$posts .= "<strong>".$post_owner_name."</strong><br>";
						$posts .= $p['body']."<br><hr>";
					} else {
						$posts .= "<strong>".$post_owner_name."</strong><br>";
						$posts .= self::mentions($p['body'])."
						<form action='profile.php?username=$username&post_id=
						".$p['id']."'method = 'post'><br>";
						if (!DB::query('SELECT post_id from post_likes where post_id = :post_id and user_id = :user_id', array(':post_id' => $p['id'], ':user_id' => $logged_in_user_id))) {
							
							# code...
								$posts .= "<input type='submit' name='like' value ='Like'>";
						} else {
							# code...
							$posts .= "<input type='submit' name='unlike' value ='Unlike'>";
						}
						$posts .= "<span> ".$p['likes']." likes </span>";

						if (!DB::query('SELECT id from shared_posts where post_id = :post_id and user_id = :user_id', array(':post_id' => $p['id'], ':user_id' => $logged_in_user_id))) {
							# code...
							$posts .= "<input type = 'submit' name = 'share_post' value = 'Share'>";
						} else {
							# code...
							$posts .= "<input type = 'submit' name = 'unshare' value = 'Undo share'>";
						}

						$posts.="<span> ".$p['shares']." reposts</span>";
		
						$posts .= "<input type = 'submit' name = 'delete_post' value = 'Delete'>";		
						$posts.="<hr><br>
						</form>";							
					}
					
				}
			}
			
			return $posts;
			
		}

		public static function sharePost($post_id, $user_id){

			if(!DB::query('SELECT id from shared_posts where user_id = :user_id and post_id = :post_id', array(':user_id' => $user_id, ':post_id' => $post_id))){

				DB::query('UPDATE posts set shares = shares + 1 where id = :post_id', array(':post_id' => $post_id));
				
				DB::query('INSERT into shared_posts values(\'\', unix_timestamp(), :post_id, :user_id)', array(':post_id' => $post_id, ':user_id' => $user_id));
			} else {
				DB::query('UPDATE posts set shares = shares - 1 where id = :post_id', array(':post_id' => $post_id));

				DB::query('DELETE from shared_posts where post_id = :post_id and user_id = :user_id', array(':post_id' =>$post_id, ':user_id' => $user_id));
			}


		}

		public static function reportPost($post_id, $user_id, $r_statement){

			DB::query('INSERT into reports values(\'\', :r_statement, unix_timestamp(), :post_id, :user_id)', array(':post_id' => $post_id, ':user_id' => $user_id, ':r_statement' => $r_statement));
		}

	}

?>