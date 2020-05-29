<?php 
	/**
	 * 
	 */
	class Comment
	{
		public static function createComment($comment_body, $post_id, $user_id){

			if (DB::query('SELECT id from posts where id = :post_id', array(':post_id' => $post_id))) {
					# code...
				DB::query('INSERT into comments values (\'\', :comment, :user_id, unix_timestamp(), :post_id)', array(':comment' => $comment_body, ':user_id' => $user_id, ':post_id' => $post_id));
				}
				
				DB::query('UPDATE posts set comments = comments + 1 where id = :id', array(':id' => $post_id));		
		}

		public static function displayComments($post_id){

			$comments = DB::query('SELECT comments.id, comments.comment, comments.posted_at, users.username from comments, users where post_id = :post_id and comments.user_id = users.id', array(':post_id' => $post_id));

			foreach ($comments as $comment) {
				$rating = DB::query('SELECT AVG(rating) from comment_ratings where comment_id = :comment_id', array(':comment_id' => $comment['id']))[0]['AVG(rating)'];

				echo '<b>'.$comment['username'].'</b><br> ~ '.$comment['comment'].'<hr></p>';

				if ($rating) {
					# code...
					echo '<b>Rating: ~ '.$rating.'<hr></p><b>';
				}
				echo '<form method="post" action = "index4.php?comment_id='.$comment['id'].'">
						<input type = "range" name = "rating" min = "0" max = "10" step = "0.5"></input>
				</form>';
				# code...
			}

		}
	}
?>