<?php

require_once "DB.php";
require_once "Mail.php";


$db = new DB("127.0.0.1", "socialnetwork", "root", "");

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    # code...
    if ($_GET['url'] == 'auth') {
        # code...
    } elseif ($_GET['url'] == 'user') {
        # code...

        //for providing details about the currently logged in user
        if (isset($_COOKIE['SNID'])) {
            $token = $_COOKIE['SNID'];

            $user_id = $db->query('SELECT user_id from login_tokens where token = :token', array(':token' => sha1($token)))[0]['user_id'];

            if ($user_id) {

                if ($user_id != 11) {

                    $username = $db->query('SELECT username from users where id = :id', array(':id' => $user_id))[0]['username'];

                    $profile_img = $db->query('SELECT profileimg from users where id = :id', array(':id' => $user_id))[0]['profileimg'];

                    $response = "{";
                    $response .= '"Status":"Good",';
                    $response .= '"UserId":"' . $user_id . '",';
                    $response .= '"Username":"' . $username . '",';
                    $response .= '"ProfileImg":"' . $profile_img . '"';
                    $response .= "}";

                    $active = $db->query('SELECT active from users where id = :id', array(':id' => $user_id))[0]['active'];

                    if ($active != 1) {
                        $response = '{"Status" : "Deactivated"}';
                    }
                } else {
                    $response = '{"Status" : "Admin"}';
                }
            }
        } else {
            $response = '{"Status" : "Not logged in"}';
        }

        echo $response;
    } elseif ($_GET['url'] == 'comments' && isset($_GET['post_id'])) {
        # code...
        if (isset($_COOKIE['SNID'])) {
            //case for when the user is logged in
            $token = $_COOKIE['SNID'];

            $user_id = $db->query('SELECT user_id from login_tokens where token = :token', array(':token' => sha1($token)))[0]['user_id'];

            $output = "";


            $posted_by_id = $db->query('SELECT user_id from posts where id = :post_id', array(':post_id' => $_GET['post_id']))[0]['user_id'];

            $posted_by_name = $db->query('SELECT username from users where id = :post_id', array(':post_id' => $posted_by_id))[0]['username'];

            $posted_by_img = $db->query('SELECT profileimg from users where id = :id', array(':id' => $posted_by_id))[0]['profileimg'];

            $posted_by_designation = $db->query('SELECT designation_name from users, designations where users.id = :id and users.designation_id = designations.id', array(':id' => $posted_by_id))[0]['designation_name'];

            $posted_at = $db->query('SELECT posted_at from posts where id = :id', array(':id' => $_GET['post_id']))[0]['posted_at'];

            $posted_by_institution = $db->query('SELECT institution_name from users, institutions where users.institution_id = institutions.id and users.id = :user_id', array(':user_id' => $posted_by_id))[0]['institution_name'];

            $post_topic = $db->query('SELECT topic_name from topics, posts where topics.id = posts.topic_id and posts.id = :post_id', array(':post_id' => $_GET['post_id']))[0]['topic_name'];

            $post_type = $db->query('SELECT type_name from post_types, posts where post_types.id = posts.type_id and posts.id = :post_id', array(':post_id' => $_GET['post_id']))[0]['type_name'];

            $post_body = $db->query('SELECT body from posts where id = :id', array(':id' => $_GET['post_id']))[0]['body'];

            $post_likes = $db->query('SELECT likes from posts where id = :id', array(':id' => $_GET['post_id']))[0]['likes'];

            $post_comments = $db->query('SELECT comments from posts where id = :id', array(':id' => $_GET['post_id']))[0]['comments'];

            $post_shares = $db->query('SELECT shares from posts where id = :id', array(':id' => $_GET['post_id']))[0]['shares'];

            $is_liked = false;

            $is_shared = false;

            if ($db->query('SELECT id from post_likes where post_id = :post_id and user_id = :user_id', array(':post_id' => $_GET['post_id'], ':user_id' => $user_id))) {
                # code...
                $is_liked = TRUE;
            }

            if ($db->query('SELECT id from shared_posts where post_id = :post_id and user_id = :user_id', array(':post_id' => $_GET['post_id'], ':user_id' => $user_id))) {
                # code...
                $is_shared = TRUE;
            }

            $output .= "[{";
            $output .= '"PostedById" : "' . $posted_by_id . '",';
            $output .= '"PostedByName" : "' . $posted_by_name . '",';
            $output .= '"PostedByImg" : "' . $posted_by_img . '",';
            $output .= '"PostedByDesignation" : "' . $posted_by_designation . '",';
            $output .= '"PostedAt" : "' . $posted_at . '",';
            $output .= '"PostedByInstitution" : "' . $posted_by_institution . '",';
            $output .= '"PostTopic" : "' . $post_topic . '",';
            $output .= '"PostIsLiked" : "' . $is_liked . '",';
            $output .= '"PostIsShared" : "' . $is_shared . '",';
            $output .= '"PostType" : "' . $post_type . '",';
            $output .= '"PostBody" : "' . $post_body . '",';
            $output .= '"PostId" : "' . $_GET['post_id'] . '",';
            $output .= '"PostLikes" : "' . $post_likes . '",';
            $output .= '"PostComments" : "' . $post_comments . '",';
            $output .= '"PostShares" : "' . $post_shares . '"},';

            $comments = $db->query('SELECT comments.id, comments.comment, comments.user_id, comments.posted_at, users.username, users.profileimg from comments, users where comments.post_id = :post_id and comments.user_id = users.id order by comments.posted_at desc', array(':post_id' => $_GET['post_id']));

            foreach ($comments as $comment) {
                # code...
                $is_rated = false;

                if ($db->query('SELECT id from comment_ratings where comment_id = :comment_id and user_id = :user_id', array(':comment_id' => $comment['id'], ':user_id' => $user_id))) {
                    # code...
                    $is_rated = true;
                }

                $rating = round($db->query('SELECT AVG(rating) from comment_ratings where comment_id = :comment_id', array(':comment_id' => $comment['id']))[0]['AVG(rating)'], 1);

                $output .= "{";

                if ($rating) {
                    # code...
                    $output .= '"CommentRating" : "' . $rating . '",';
                } else {
                    # code...
                    $output .= '"CommentRating" : "",';
                }

                $output .= '"CommentID" : "' . $comment['id'] . '",';
                $output .= '"CommentBody" : "' . $comment['comment'] . '",';
                $output .= '"CommentedById" : "' . $comment['user_id'] . '",';
                $output .= '"CommentedBy" : "' . $comment['username'] . '",';
                $output .= '"CommentedByImg" : "' . $comment['profileimg'] . '",';
                $output .= '"CommentedAt" : "' . $comment['posted_at'] . '",';
                $output .= '"CommentIsRated" : "' . $is_rated . '"';
                $output .= "},";
            }

            $output = substr($output, 0, strlen($output) - 1);
            $output .= "]";
        } else {
            //case for when the user isnt logged in
            $output = "";


            $posted_by_id = $db->query('SELECT user_id from posts where id = :post_id', array(':post_id' => $_GET['post_id']))[0]['user_id'];

            $posted_by_name = $db->query('SELECT username from users where id = :post_id', array(':post_id' => $posted_by_id))[0]['username'];

            $posted_by_img = $db->query('SELECT profileimg from users where id = :id', array(':id' => $posted_by_id))[0]['profileimg'];

            $posted_by_designation = $db->query('SELECT designation_name from users, designations where users.id = :id and users.designation_id = designations.id', array(':id' => $posted_by_id))[0]['designation_name'];

            $posted_at = $db->query('SELECT posted_at from posts where id = :id', array(':id' => $_GET['post_id']))[0]['posted_at'];

            $posted_by_institution = $db->query('SELECT institution_name from users, institutions where users.institution_id = institutions.id and users.id = :user_id', array(':user_id' => $posted_by_id))[0]['institution_name'];

            $post_topic = $db->query('SELECT topic_name from topics, posts where topics.id = posts.topic_id and posts.id = :post_id', array(':post_id' => $_GET['post_id']))[0]['topic_name'];

            $post_type = $db->query('SELECT type_name from post_types, posts where post_types.id = posts.type_id and posts.id = :post_id', array(':post_id' => $_GET['post_id']))[0]['type_name'];

            $post_body = $db->query('SELECT body from posts where id = :id', array(':id' => $_GET['post_id']))[0]['body'];

            $post_likes = $db->query('SELECT likes from posts where id = :id', array(':id' => $_GET['post_id']))[0]['likes'];

            $post_comments = $db->query('SELECT comments from posts where id = :id', array(':id' => $_GET['post_id']))[0]['comments'];

            $post_shares = $db->query('SELECT shares from posts where id = :id', array(':id' => $_GET['post_id']))[0]['shares'];

            $output .= "[{";
            $output .= '"PostedById" : "' . $posted_by_id . '",';
            $output .= '"PostedByName" : "' . $posted_by_name . '",';
            $output .= '"PostedByImg" : "' . $posted_by_img . '",';
            $output .= '"PostedByDesignation" : "' . $posted_by_designation . '",';
            $output .= '"PostedAt" : "' . $posted_at . '",';
            $output .= '"PostedByInstitution" : "' . $posted_by_institution . '",';
            $output .= '"PostTopic" : "' . $post_topic . '",';
            $output .= '"PostType" : "' . $post_type . '",';
            $output .= '"PostBody" : "' . $post_body . '",';
            $output .= '"PostId" : "' . $_GET['post_id'] . '",';
            $output .= '"PostLikes" : "' . $post_likes . '",';
            $output .= '"PostComments" : "' . $post_comments . '",';
            $output .= '"PostShares" : "' . $post_shares . '"},';

            $comments = $db->query('SELECT comments.id, comments.comment, comments.user_id, comments.posted_at, users.username, users.profileimg from comments, users where comments.post_id = :post_id and comments.user_id = users.id order by comments.posted_at desc', array(':post_id' => $_GET['post_id']));

            foreach ($comments as $comment) {
                # code...
                $is_rated = false;

                $rating = round($db->query('SELECT AVG(rating) from comment_ratings where comment_id = :comment_id', array(':comment_id' => $comment['id']))[0]['AVG(rating)'], 1);

                $output .= "{";

                if ($rating) {
                    # code...
                    $output .= '"CommentRating" : "' . $rating . '",';
                } else {
                    # code...
                    $output .= '"CommentRating" : "",';
                }

                $output .= '"CommentID" : "' . $comment['id'] . '",';
                $output .= '"CommentBody" : "' . $comment['comment'] . '",';
                $output .= '"CommentedById" : "' . $comment['user_id'] . '",';
                $output .= '"CommentedBy" : "' . $comment['username'] . '",';
                $output .= '"CommentedByImg" : "' . $comment['profileimg'] . '",';
                $output .= '"CommentedAt" : "' . $comment['posted_at'] . '",';
                $output .= '"CommentIsRated" : "' . $is_rated . '"';
                $output .= "},";
            }

            $output = substr($output, 0, strlen($output) - 1);
            $output .= "]";
        }


        echo $output;
    } elseif ($_GET['url'] == 'timeline') {
        # code...
        $token = $_COOKIE['SNID'];

        $user_id = $db->query('SELECT user_id from login_tokens where token = :token', array(':token' => sha1($token)))[0]['user_id'];

        $username = $db->query('SELECT username from users where id = :id', array(':id' => $user_id))[0]['username'];

        $profile_img = $db->query('SELECT profileimg from users where id = :id', array(':id' => $user_id))[0]['profileimg'];

        $following_posts = $db->query('SELECT posts.id, posts.body, posts.likes, posts.comments, posts.shares, posts.user_id, posts.posted_at, users.username, topics.topic_name, post_types.type_name from posts, topics, post_types, users, followers where posts.user_id = followers.user_id and followers.follower_id = :user_id and posts.user_id = users.id and posts.type_id = post_types.id and posts.topic_id = topics.id
        /* posts by users who the logged in user follows */ 
        union ALL
        /* posts shared by users who the logged in user follows */ 
        SELECT shared_posts.post_id as id, posts.body, posts.likes, posts.comments, posts.shares, shared_posts.user_id, posts.posted_at, users.username, topics.topic_name, post_types.type_name from posts, topics, post_types, users, shared_posts, followers where shared_posts.user_id = followers.user_id and followers.follower_id = :user_id and shared_posts.post_id = posts.id and shared_posts.user_id = users.id and posts.type_id = post_types.id and posts.topic_id = topics.id
        UNION ALL
        /* posts by the logged in user */ 
        SELECT posts.id, posts.body, posts.likes, posts.comments, posts.shares, posts.user_id, posts.posted_at, users.username, topics.topic_name, post_types.type_name from posts, topics, post_types, users WHERE posts.user_id = users.id and users.id = :user_id and posts.type_id = post_types.id and posts.topic_id = topics.id
        UNION ALL
        /* posts shared by the logged in user */
        SELECT shared_posts.post_id as id, posts.body, posts.likes, posts.comments, posts.shares, shared_posts.user_id, posts.posted_at, users.username, topics.topic_name, post_types.type_name from posts, topics, post_types, users, shared_posts where shared_posts.user_id = :user_id and shared_posts.post_id = posts.id and shared_posts.user_id = users.id and posts.type_id = post_types.id and posts.topic_id = topics.id
        ORDER BY posted_at desc', array(':user_id' => $user_id));

        $response = "[";

        if ($following_posts) {
            # code...
            foreach ($following_posts as $post) {
                $post_owner_id = $db->query('SELECT user_id from posts where id = :post_id', array(':post_id' => $post['id']))[0]['user_id'];

                $post_owner_name = $db->query('SELECT username from users where id = :id', array(':id' => $post_owner_id))[0]['username'];

                $post_owner_designation = $db->query('SELECT designations.designation_name from designations, users where users.designation_id = designations.id and users.id = :user_id', array(':user_id' => $post_owner_id))[0]['designation_name'];

                $post_owner_institution = $db->query('SELECT institutions.institution_name from institutions, users where users.institution_id = institutions.id and users.id = :user_id', array(':user_id' => $post_owner_id))[0]['institution_name'];

                $post_owner_img = $db->query('SELECT profileimg from users where id = :id', array(':id' => $post_owner_id))[0]['profileimg'];

                $is_liked = FALSE;

                $is_commented = FALSE;

                $is_shared = FALSE;

                $escaped = array("\r\n", "\n", "\r");

                $break = '<br/>';

                $post['body'] = str_replace($escaped, $break, $post['body']);

                $response .= "{";
                $response .= '"UserId": "' . $user_id . '",';
                $response .= '"Username": "' . $username . '",';
                $response .= '"ProfileImg": "' . $profile_img . '",';
                $response .= '"Category": "timeline",';

                // post written by the user that has not been shared by anyone
                if (($post_owner_id == $user_id) && ($post['user_id'] == $user_id)) {

                    if ($db->query('SELECT id from post_likes where post_id = :post_id and user_id = :user_id', array(':post_id' => $post['id'], ':user_id' => $user_id))) {
                        # code...
                        $is_liked = TRUE;
                    }

                    if ($db->query('SELECT id from comments where post_id = :post_id and user_id = :user_id', array(':post_id' => $post['id'], ':user_id' => $user_id))) {
                        # code...
                        $is_commented = TRUE;
                    }

                    if ($db->query('SELECT id from shared_posts where post_id = :post_id and user_id = :user_id', array(':post_id' => $post['id'], ':user_id' => $user_id))) {
                        # code...
                        $is_shared = TRUE;
                    }

                    $response .= '"PostId": ' . $post['id'] . ',';
                    $response .= '"PostBody": "' . $post['body'] . '",';
                    $response .= '"PostIsLiked": "' . $is_liked . '",';
                    $response .= '"PostIsCommented": "' . $is_commented . '",';
                    $response .= '"PostIsShared": "' . $is_shared . '",';
                    $response .= '"PostLikes": ' . $post['likes'] . ',';
                    $response .= '"PostShares": ' . $post['shares'] . ',';
                    $response .= '"PostComments": ' . $post['comments'] . ',';
                    $response .= '"PostTopic": "' . $post['topic_name'] . '",';
                    $response .= '"PostType": "' . $post['type_name'] . '",';
                    $response .= '"PostedById": ' . $post_owner_id . ',';
                    $response .= '"PostedByName": "' . $post_owner_name . '",';
                    $response .= '"PostedByImg": "' . $post_owner_img . '",';
                    $response .= '"SharedByName": "",';
                    $response .= '"SharedById": "",';
                    $response .= '"PostedByDesignation": "' . $post_owner_designation . '",';
                    $response .= '"PostedByInstitution": "' . $post_owner_institution . '",';
                    $response .= '"PostedAt": ' . $post['posted_at'] . '';
                    $response .= "}";
                    $response .= ",";
                }

                //posts written by a user the user is following that has not been picked from the shared posts table    
                if (($post_owner_id != $user_id) && !($db->query('SELECT id from shared_posts where post_id = :post_id and user_id = :user_id', array('post_id' => $post['id'], ':user_id' => $post['user_id'])))) {

                    if ($db->query('SELECT id from post_likes where post_id = :post_id and user_id = :user_id', array(':post_id' => $post['id'], ':user_id' => $user_id))) {
                        # code...
                        $is_liked = TRUE;
                    }

                    if ($db->query('SELECT id from comments where post_id = :post_id and user_id = :user_id', array(':post_id' => $post['id'], ':user_id' => $user_id))) {
                        # code...
                        $is_commented = TRUE;
                    }

                    if ($db->query('SELECT id from shared_posts where post_id = :post_id and user_id = :user_id', array(':post_id' => $post['id'], ':user_id' => $user_id))) {
                        # code...
                        $is_shared = TRUE;
                    }

                    // $response .= "{";
                    // $response .= '"Username ": "'.$username.'",';
                    $response .= '"PostId": ' . $post['id'] . ',';
                    $response .= '"PostBody": "' . $post['body'] . '",';
                    $response .= '"PostIsLiked": "' . $is_liked . '",';
                    $response .= '"PostIsCommented": "' . $is_commented . '",';
                    $response .= '"PostIsShared": "' . $is_shared . '",';
                    $response .= '"PostLikes": ' . $post['likes'] . ',';
                    $response .= '"PostShares": ' . $post['shares'] . ',';
                    $response .= '"PostComments": ' . $post['comments'] . ',';
                    $response .= '"PostTopic": "' . $post['topic_name'] . '",';
                    $response .= '"PostType": "' . $post['type_name'] . '",';
                    $response .= '"PostedById": ' . $post_owner_id . ',';
                    $response .= '"PostedByName": "' . $post_owner_name . '",';
                    $response .= '"PostedByImg": "' . $post_owner_img . '",';
                    $response .= '"SharedByName": "",';
                    $response .= '"SharedById": "",';
                    $response .= '"PostedByDesignation": "' . $post_owner_designation . '",';
                    $response .= '"PostedByInstitution": "' . $post_owner_institution . '",';
                    $response .= '"PostedAt": ' . $post['posted_at'] . '';
                    $response .= "}";
                    $response .= ",";
                }

                // //posts that the user has shared
                // if (($post_owner_id != $user_id) && ($post['user_id'] == $user_id)) {

                //     if ($db->query('SELECT id from post_likes where post_id = :post_id and user_id = :user_id', array(':post_id' => $post['id'], ':user_id' => $user_id))) {
                //         # code...
                //         $is_liked = TRUE;
                //     }

                //     if ($db->query('SELECT id from comments where post_id = :post_id and user_id = :user_id', array(':post_id' => $post['id'], ':user_id' => $user_id))) {
                //         # code...
                //         $is_commented = TRUE;
                //     }

                //     if ($db->query('SELECT id from shared_posts where post_id = :post_id and user_id = :user_id', array(':post_id' => $post['id'], ':user_id' => $user_id))) {
                //         # code...
                //         $is_shared = TRUE;
                //     }

                //     // $response .= "{";
                //     // $response .= '"Username ": "'.$username.'",';
                //     $response .= '"PostId": ' . $post['id'] . ',';
                //     $response .= '"PostBody": "' . $post['body'] . '",';
                //     $response .= '"PostIsLiked": "' . $is_liked . '",';
                //     $response .= '"PostIsCommented": "' . $is_commented . '",';
                //     $response .= '"PostIsShared": "' . $is_shared . '",';
                //     $response .= '"PostLikes": ' . $post['likes'] . ',';
                //     $response .= '"PostShares": ' . $post['shares'] . ',';
                //     $response .= '"PostComments": ' . $post['comments'] . ',';
                //     $response .= '"PostTopic": "' . $post['topic_name'] . '",';
                //     $response .= '"PostType": "' . $post['type_name'] . '",';
                //     $response .= '"PostedById": ' . $post_owner_id . ',';
                //     $response .= '"PostedByName": "' . $post_owner_name . '",';
                //     $response .= '"PostedByImg": "' . $post_owner_img . '",';
                //     $response .= '"SharedByName": "You",';
                //     $response .= '"SharedById": "' . $user_id . '",';
                //     $response .= '"PostedByDesignation": "' . $post_owner_designation . '",';
                //     $response .= '"PostedByInstitution": "' . $post_owner_institution . '",';
                //     $response .= '"PostedAt": ' . $post['posted_at'] . '';
                //     $response .= "}";
                //     $response .= ",";
                // }

                // posts shared by a user the user is following
                else if (($post_owner_id != $user_id) && ($post_owner_id != $post['user_id'])) {

                    if ($db->query('SELECT id from post_likes where post_id = :post_id and user_id = :user_id', array(':post_id' => $post['id'], ':user_id' => $user_id))) {
                        # code...
                        $is_liked = TRUE;
                    }

                    if ($db->query('SELECT id from comments where post_id = :post_id and user_id = :user_id', array(':post_id' => $post['id'], ':user_id' => $user_id))) {
                        # code...
                        $is_commented = TRUE;
                    }

                    if ($db->query('SELECT id from shared_posts where post_id = :post_id and user_id = :user_id', array(':post_id' => $post['id'], ':user_id' => $user_id))) {
                        # code...
                        $is_shared = TRUE;
                    }

                    // $response .= "{";
                    // $response .= '"Username ": "'.$username.'",';
                    $response .= '"PostId": ' . $post['id'] . ',';
                    $response .= '"PostBody": "' . $post['body'] . '",';
                    $response .= '"PostIsLiked": "' . $is_liked . '",';
                    $response .= '"PostIsCommented": "' . $is_commented . '",';
                    $response .= '"PostIsShared": "' . $is_shared . '",';
                    $response .= '"PostLikes": ' . $post['likes'] . ',';
                    $response .= '"PostShares": ' . $post['shares'] . ',';
                    $response .= '"PostComments": ' . $post['comments'] . ',';
                    $response .= '"PostTopic": "' . $post['topic_name'] . '",';
                    $response .= '"PostType": "' . $post['type_name'] . '",';
                    $response .= '"PostedById": ' . $post_owner_id . ',';
                    $response .= '"PostedByName": "' . $post_owner_name . '",';
                    $response .= '"PostedByImg": "' . $post_owner_img . '",';
                    $response .= '"SharedByName": "' . $post['username'] . '",';
                    $response .= '"SharedById": "' . $post['user_id'] . '",';
                    $response .= '"PostedByDesignation": "' . $post_owner_designation . '",';
                    $response .= '"PostedByInstitution": "' . $post_owner_institution . '",';
                    $response .= '"PostedAt": ' . $post['posted_at'] . '';
                    $response .= "}";
                    $response .= ",";
                }

                //user's posts that other users have shared
                if (($post_owner_id == $user_id) && ($post['user_id'] != $user_id)) {

                    if ($db->query('SELECT id from post_likes where post_id = :post_id and user_id = :user_id', array(':post_id' => $post['id'], ':user_id' => $user_id))) {
                        # code...
                        $is_liked = TRUE;
                    }

                    if ($db->query('SELECT id from comments where post_id = :post_id and user_id = :user_id', array(':post_id' => $post['id'], ':user_id' => $user_id))) {
                        # code...
                        $is_commented = TRUE;
                    }

                    if ($db->query('SELECT id from shared_posts where post_id = :post_id and user_id = :user_id', array(':post_id' => $post['id'], ':user_id' => $user_id))) {
                        # code...
                        $is_shared = TRUE;
                    }

                    // $response .= "{";
                    // $response .= '"Username ": "'.$username.'",';
                    $response .= '"PostId": ' . $post['id'] . ',';
                    $response .= '"PostBody": "' . $post['body'] . '",';
                    $response .= '"PostIsLiked": "' . $is_liked . '",';
                    $response .= '"PostIsCommented": "' . $is_commented . '",';
                    $response .= '"PostIsShared": "' . $is_shared . '",';
                    $response .= '"PostLikes": ' . $post['likes'] . ',';
                    $response .= '"PostShares": ' . $post['shares'] . ',';
                    $response .= '"PostComments": ' . $post['comments'] . ',';
                    $response .= '"PostTopic": "' . $post['topic_name'] . '",';
                    $response .= '"PostType": "' . $post['type_name'] . '",';
                    $response .= '"PostedById": ' . $post_owner_id . ',';
                    $response .= '"PostedByName": "' . $post_owner_name . '",';
                    $response .= '"PostedByImg": "' . $post_owner_img . '",';
                    $response .= '"SharedByName": "' . $post['username'] . '",';
                    $response .= '"SharedById": "' . $post['user_id'] . '",';
                    $response .= '"PostedByDesignation": "' . $post_owner_designation . '",';
                    $response .= '"PostedByInstitution": "' . $post_owner_institution . '",';
                    $response .= '"PostedAt": ' . $post['posted_at'] . '';
                    $response .= "}";
                    $response .= ",";
                }
            }
        } else {
            # code...
            $response .= "{";
            $response .= '"UserId": "' . $user_id . '",';
            $response .= '"Username": "' . $username . '",';
            $response .= '"ProfileImg": "' . $profile_img . '"},';
        }

        $topic_posts = $db->query('SELECT posts.id, posts.body, posts.likes, posts.comments, posts.shares, posts.user_id, users.username, posts.posted_at, topics.topic_name, post_types.type_name from topics, post_types, posts, following_topics, users where posts.type_id = post_types.id and posts.topic_id = topics.id and following_topics.topic_id = topics.id and users.id = following_topics.user_id and users.id = :user_id order by posts.posted_at desc', array(':user_id' => $user_id));

        if ($topic_posts) {
            foreach ($topic_posts as $t_post) {
                # code...
                $post_owner_id = $db->query('SELECT user_id from posts where id = :post_id', array(':post_id' => $t_post['id']))[0]['user_id'];

                $post_owner_name = $db->query('SELECT username from users where id = :id', array(':id' => $post_owner_id))[0]['username'];

                $post_owner_designation = $db->query('SELECT designations.designation_name from designations, users where users.designation_id = designations.id and users.id = :user_id', array(':user_id' => $post_owner_id))[0]['designation_name'];

                $post_owner_institution = $db->query('SELECT institutions.institution_name from institutions, users where users.institution_id = institutions.id and users.id = :user_id', array(':user_id' => $post_owner_id))[0]['institution_name'];

                $post_owner_profile_img = $db->query('SELECT profileimg from users where id = :id', array('id' => $post_owner_id))[0]['profileimg'];

                $is_liked = FALSE;

                $is_commented = FALSE;

                $is_shared = FALSE;

                if ($db->query('SELECT id from post_likes where post_id = :post_id and user_id = :user_id', array(':post_id' => $t_post['id'], ':user_id' => $user_id))) {
                    # code...
                    $is_liked = TRUE;
                }

                if ($db->query('SELECT id from comments where post_id = :post_id and user_id = :user_id', array(':post_id' => $t_post['id'], ':user_id' => $user_id))) {
                    # code...
                    $is_commented = TRUE;
                }

                if ($db->query('SELECT id from shared_posts where post_id = :post_id and user_id = :user_id', array(':post_id' => $t_post['id'], ':user_id' => $user_id))) {
                    # code...
                    $is_shared = TRUE;
                }

                $response .= "{";
                $response .= '"PostId": ' . $t_post['id'] . ',';
                $response .= '"PostBody": "' . $t_post['body'] . '",';
                $response .= '"PostIsLiked": "' . $is_liked . '",';
                $response .= '"PostIsCommented": "' . $is_commented . '",';
                $response .= '"PostIsShared": "' . $is_shared . '",';
                $response .= '"PostLikes": ' . $t_post['likes'] . ',';
                $response .= '"PostShares": ' . $t_post['shares'] . ',';
                $response .= '"PostComments": ' . $t_post['comments'] . ',';
                $response .= '"PostTopic": "' . $t_post['topic_name'] . '",';
                $response .= '"PostType": "' . $t_post['type_name'] . '",';
                $response .= '"PostedById": ' . $post_owner_id . ',';
                $response .= '"PostedByName": "' . $post_owner_name . '",';
                $response .= '"PostedByImg": "' . $post_owner_profile_img . '",';
                $response .= '"PostedByDesignation": "' . $post_owner_designation . '",';
                $response .= '"PostedByInstitution": "' . $post_owner_institution . '",';
                $response .= '"PostedAt": ' . $t_post['posted_at'] . ',';
                $response .= '"Category": "topic"';
                $response .= "}";
                $response .= ",";
            }
        }

        $response = substr($response, 0, strlen($response) - 1);
        $response .= "]";

        echo $response;
    } elseif ($_GET['url'] == 'profile' && isset($_GET['username'])) {
        # code...
        if (isset($_COOKIE['SNID'])) {
            //case for when the profile viewer is logged in
            $token = $_COOKIE['SNID'];

            //id for the currently logged in user
            $user_id = $db->query('SELECT user_id from login_tokens where token = :token', array(':token' => sha1($token)))[0]['user_id'];

            $username = $db->query('SELECT username from users where id = :id', array(':id' => $user_id))[0]['username'];

            $user_img = $db->query('SELECT profileimg from users where id = :id', array(':id' => $user_id))[0]['profileimg'];

            //id for the user whose profile we're on
            $profile_owner_id = $db->query('SELECT id from users where username = :username', array(':username' => $_GET['username']))[0]['id'];

            if ($db->query('SELECT id from followers where user_id = :user_id and follower_id = :follower_id', array(':user_id' => $profile_owner_id, ':follower_id' => $user_id))) {
                # code...
                $is_following = true;
            } else {
                $is_following = false;
            }

            $profile_owner = $db->query('SELECT institutions.institution_name, designations.designation_name, users.specialty, users.profileimg, users.password, users.email from institutions, users, designations where users.institution_id = institutions.id and users.designation_id = designations.id and users.id = :user_id', array(':user_id' => $profile_owner_id))[0];

            // $profile_owner_designation = $db -> query('SELECT designations.designation_name from designations, users where users.designation_id = designations.id and users.id = :user_id', array(':user_id' => $profile_owner_id))[0]['designation_name'];

            // $profile_owner_specialty = $db -> query('SELECT specialty from users where id = :user_id', array(':user_id' => $profile_owner_id))[0]['specialty'];

            // $profile_owner_img = $db -> query('SELECT profileimg from users where id = :id', array(':id' => $profile_owner_id))[0]['profileimg'];

            // $profile_owner_email = $db -> query('SELECT email from users where id = :id', array(':id' => $profile_owner_id))[0]['profileimg'];

            $followers = $db->query('SELECT COUNT(follower_id) from followers where user_id = :user_id', array(':user_id' => $profile_owner_id))[0]['COUNT(follower_id)'];

            $following = $db->query('SELECT COUNT(user_id) from followers where follower_id = :follower_id', array(':follower_id' => $profile_owner_id))[0]['COUNT(user_id)'];

            $dbposts = $db->query('SELECT posts.id, posts.body, posts.likes, posts.comments, posts.shares, posts.user_id, posts.posted_at, post_types.type_name, topics.topic_name FROM topics, post_types, posts where posts.user_id = :user_id and posts.type_id = post_types.id and posts.topic_id = topics.id
                /* posts by the owner of the profile */ 
                UNION ALL 
                SELECT shared_posts.post_id as id, posts.body, posts.likes, posts.comments, posts.shares, shared_posts.user_id, shared_posts.date_shared AS posted_at, post_types.type_name, topics.topic_name FROM topics, post_types, posts, shared_posts where shared_posts.user_id = :user_id and shared_posts.post_id = posts.id and posts.type_id = post_types.id and posts.topic_id = topics.id
                /* posts shared by the owner of the profile */
                ORDER BY `posted_at` DESC', array(':user_id' => $profile_owner_id));
            //selects all the user's posts plus other users' posts that they have shared

            $response = "[";
            $response .= "{";
            $response .= '"Username" : "' . $username . '",';
            $response .= '"UserImg" : "' . $user_img . '",';
            $response .= '"ProfileImg" : "' . $profile_owner['profileimg'] . '",';
            $response .= '"Email" : "' . $profile_owner['email'] . '",';
            $response .= '"Password" : "' . $profile_owner['password'] . '",';
            $response .= '"Institution" : "' . $profile_owner['institution_name'] . '",';
            $response .= '"Designation" : "' . $profile_owner['designation_name'] . '",';
            $response .= '"Specialty" : "' . $profile_owner['specialty'] . '",';
            $response .= '"Followers" : "' . $followers . '",';
            $response .= '"Following" : "' . $following . '",';
            $response .= '"IsFollowing" : "' . $is_following  . '",';
            $response .= '"LoggedInId" : "' . $user_id  . '",';
            $response .= '"ProfileOwnerId" : "' . $profile_owner_id  . '"';
            $response .= "},";

            foreach ($dbposts as $p) {

                $post_owner_id = $db->query('SELECT users.id from users, posts where posts.user_id = users.id and posts.id = :post_id', array(':post_id' => $p['id']))[0]['id'];

                $post_owner = $db->query('SELECT users.username, users.profileimg, designations.designation_name, institutions.institution_name from designations, institutions, users where users.designation_id = designations.id and users.institution_id = institutions.id and users.id = :user_id', array(':user_id' => $post_owner_id))[0];

                $is_liked = FALSE;

                $is_commented = FALSE;

                $is_shared = FALSE;

                if ($db->query('SELECT id from post_likes where post_id = :post_id and user_id = :user_id', array(':post_id' => $p['id'], ':user_id' => $user_id))) {
                    # code...
                    $is_liked = TRUE;
                }

                if ($db->query('SELECT id from comments where post_id = :post_id and user_id = :user_id', array(':post_id' => $p['id'], ':user_id' => $user_id))) {
                    # code...
                    $is_commented = TRUE;
                }

                if ($db->query('SELECT id from shared_posts where post_id = :post_id and user_id = :user_id', array(':post_id' => $p['id'], ':user_id' => $user_id))) {
                    # code...
                    $is_shared = TRUE;
                }

                $shared = false;

                $escaped = array("\r\n", "\n", "\r");

                $break = '<br/>';

                $p['body'] = str_replace($escaped, $break, $p['body']);

                if ($p['user_id'] != $post_owner_id) {
                    # code...
                    // posts shared by the owner of the profile
                    $shared = true;

                    $response .= "{";
                    $response .= '"PostId": ' . $p['id'] . ',';
                    $response .= '"PostBody": "' . $p['body'] . '",';
                    $response .= '"PostIsLiked": "' . $is_liked . '",';
                    $response .= '"PostIsCommented": "' . $is_commented . '",';
                    $response .= '"PostIsShared": "' . $is_shared . '",';
                    $response .= '"PostLikes": ' . $p['likes'] . ',';
                    $response .= '"PostShares": ' . $p['shares'] . ',';
                    $response .= '"PostComments": ' . $p['comments'] . ',';
                    $response .= '"PostTopic": "' . $p['topic_name'] . '",';
                    $response .= '"PostType": "' . $p['type_name'] . '",';
                    $response .= '"PostedById": ' . $post_owner_id . ',';
                    $response .= '"PostedByName": "' . $post_owner['username'] . '",';
                    $response .= '"PostedByImg": "' . $post_owner['profileimg'] . '",';
                    $response .= '"Shared": "' . $shared . '",';
                    $response .= '"PostedByDesignation": "' . $post_owner['designation_name'] . '",';
                    $response .= '"PostedByInstitution": "' . $post_owner['institution_name'] . '",';
                    $response .= '"PostedAt": ' . $p['posted_at'] . '';
                    $response .= "},";
                } else {
                    $response .= "{";
                    $response .= '"PostId": ' . $p['id'] . ',';
                    $response .= '"PostBody": "' . $p['body'] . '",';
                    $response .= '"PostIsLiked": "' . $is_liked . '",';
                    $response .= '"PostIsCommented": "' . $is_commented . '",';
                    $response .= '"PostIsShared": "' . $is_shared . '",';
                    $response .= '"PostLikes": ' . $p['likes'] . ',';
                    $response .= '"PostShares": ' . $p['shares'] . ',';
                    $response .= '"PostComments": ' . $p['comments'] . ',';
                    $response .= '"PostTopic": "' . $p['topic_name'] . '",';
                    $response .= '"PostType": "' . $p['type_name'] . '",';
                    $response .= '"PostedById": ' . $post_owner_id . ',';
                    $response .= '"PostedByName": "' . $post_owner['username'] . '",';
                    $response .= '"PostedByImg": "' . $post_owner['profileimg'] . '",';
                    $response .= '"Shared": "' . $shared . '",';
                    $response .= '"PostedByDesignation": "' . $post_owner['designation_name'] . '",';
                    $response .= '"PostedByInstitution": "' . $post_owner['institution_name'] . '",';
                    $response .= '"PostedAt": ' . $p['posted_at'] . '';
                    $response .= "},";
                }
            }

            $response = substr($response, 0, strlen($response) - 1);
            $response .= "]";
        } else {
            //case for when the profile viewer isn't logged in

            //id for the user whose profile we're on
            $profile_owner_id = $db->query('SELECT id from users where username = :username', array(':username' => $_GET['username']))[0]['id'];

            $profile_owner = $db->query('SELECT institutions.institution_name, designations.designation_name, users.specialty, users.profileimg, users.email from institutions, users, designations where users.institution_id = institutions.id and users.designation_id = designations.id and users.id = :user_id', array(':user_id' => $profile_owner_id))[0];

            $followers = $db->query('SELECT COUNT(follower_id) from followers where user_id = :user_id', array(':user_id' => $profile_owner_id))[0]['COUNT(follower_id)'];

            $following = $db->query('SELECT COUNT(user_id) from followers where follower_id = :follower_id', array(':follower_id' => $profile_owner_id))[0]['COUNT(user_id)'];

            $dbposts = $db->query('SELECT posts.id, posts.body, posts.likes, posts.comments, posts.shares, posts.user_id, posts.posted_at, post_types.type_name, topics.topic_name FROM topics, post_types, posts where posts.user_id = :user_id and posts.type_id = post_types.id and posts.topic_id = topics.id
                /* posts by the owner of the profile */ 
                UNION ALL 
                SELECT shared_posts.post_id as id, posts.body, posts.likes, posts.comments, posts.shares, shared_posts.user_id, shared_posts.date_shared AS posted_at, post_types.type_name, topics.topic_name FROM topics, post_types, posts, shared_posts where shared_posts.user_id = :user_id and shared_posts.post_id = posts.id and posts.type_id = post_types.id and posts.topic_id = topics.id
                /* posts shared by the owner of the profile */
                ORDER BY `posted_at` DESC', array(':user_id' => $profile_owner_id));
            //selects all the user's posts plus other users' posts that they have 

            $response = "[";
            $response .= "{";
            $response .= '"ProfileImg" : "' . $profile_owner['profileimg'] . '",';
            $response .= '"Email" : "' . $profile_owner['email'] . '",';
            $response .= '"Institution" : "' . $profile_owner['institution_name'] . '",';
            $response .= '"Designation" : "' . $profile_owner['designation_name'] . '",';
            $response .= '"Specialty" : "' . $profile_owner['specialty'] . '",';
            $response .= '"Followers" : "' . $followers . '",';
            $response .= '"Following" : "' . $following . '",';
            $response .= '"ProfileOwnerId" : "' . $profile_owner_id  . '"';
            $response .= "},";

            foreach ($dbposts as $p) {

                $post_owner_id = $db->query('SELECT users.id from users, posts where posts.user_id = users.id and posts.id = :post_id', array(':post_id' => $p['id']))[0]['id'];

                $post_owner = $db->query('SELECT users.username, users.profileimg, designations.designation_name, institutions.institution_name from designations, institutions, users where users.designation_id = designations.id and users.institution_id = institutions.id and users.id = :user_id', array(':user_id' => $post_owner_id))[0];

                // $post_owner_designation = $db -> query('SELECT designations.designation_name from designations, users where users.designation_id = designations.id and users.id = :user_id', array(':user_id' => $post_owner_id))[0]['designation_name'];

                // $post_owner_institution = $db -> query('SELECT institutions.institution_name from institutions, users where users.institution_id = institutions.id and users.id = :user_id', array(':user_id' => $post_owner_id))[0]['institution_name'];

                // $post_owner_img = $db -> query('SELECT profileimg from users where id = :id', array(':id' => $post_owner_id))[0]['profileimg'];

                $shared = false;

                $escaped = array("\r\n", "\n", "\r");

                $break = '<br/>';

                $p['body'] = str_replace($escaped, $break, $p['body']);

                if ($p['user_id'] != $post_owner_id) {
                    # code...
                    // posts shared by the owner of the profile
                    $shared = true;

                    $response .= "{";
                    $response .= '"PostId": ' . $p['id'] . ',';
                    $response .= '"PostBody": "' . $p['body'] . '",';
                    $response .= '"PostLikes": ' . $p['likes'] . ',';
                    $response .= '"PostShares": ' . $p['shares'] . ',';
                    $response .= '"PostComments": ' . $p['comments'] . ',';
                    $response .= '"PostTopic": "' . $p['topic_name'] . '",';
                    $response .= '"PostType": "' . $p['type_name'] . '",';
                    $response .= '"PostedById": ' . $post_owner_id . ',';
                    $response .= '"PostedByName": "' . $post_owner['username'] . '",';
                    $response .= '"PostedByImg": "' . $post_owner['profileimg'] . '",';
                    $response .= '"Shared": "' . $shared . '",';
                    $response .= '"PostedByDesignation": "' . $post_owner['designation_name'] . '",';
                    $response .= '"PostedByInstitution": "' . $post_owner['institution_name'] . '",';
                    $response .= '"PostedAt": ' . $p['posted_at'] . '';
                    $response .= "},";
                } else {
                    $response .= "{";
                    $response .= '"PostId": ' . $p['id'] . ',';
                    $response .= '"PostBody": "' . $p['body'] . '",';
                    $response .= '"PostLikes": ' . $p['likes'] . ',';
                    $response .= '"PostShares": ' . $p['shares'] . ',';
                    $response .= '"PostComments": ' . $p['comments'] . ',';
                    $response .= '"PostTopic": "' . $p['topic_name'] . '",';
                    $response .= '"PostType": "' . $p['type_name'] . '",';
                    $response .= '"PostedById": ' . $post_owner_id . ',';
                    $response .= '"PostedByName": "' . $post_owner['username'] . '",';
                    $response .= '"PostedByImg": "' . $post_owner['profileimg'] . '",';
                    $response .= '"Shared": "' . $shared . '",';
                    $response .= '"PostedByDesignation": "' . $post_owner['designation_name'] . '",';
                    $response .= '"PostedByInstitution": "' . $post_owner['institution_name'] . '",';
                    $response .= '"PostedAt": ' . $p['posted_at'] . '';
                    $response .= "},";
                }
            }

            $response = substr($response, 0, strlen($response) - 1);
            $response .= "]";
        }

        echo $response;
    } elseif ($_GET['url'] == 'search') {
        # code...

        if (isset($_COOKIE['SNID'])) {
            //case when the viewer is logged in

            $token = $_COOKIE['SNID'];

            //id for the currently logged in user
            $user_id = $db->query('SELECT user_id from login_tokens where token = :token', array(':token' => sha1($token)))[0]['user_id'];

            $users = $db->query('SELECT users.id, users.username, institutions.institution_name, designations.designation_name from users, institutions, designations where users.id != :user_id and users.institution_id = institutions.id and users.designation_id = designations.id and users.username like :username', array(':username' => "%" . $_GET['query'] . "%", ':user_id' => $user_id));

            $posts = $db->query('SELECT posts.id, posts.body, posts.posted_at, users.username, topics.topic_name, post_types.type_name from posts, users, topics, post_types where posts.type_id = post_types.id and posts.topic_id = topics.id and posts.user_id = users.id and posts.body like :postbody', array(':postbody' => "%" . $_GET['query'] . "%"));

            $topic_posts = $db->query('SELECT posts.id, posts.body, topics.topic_name, posts.posted_at, users.username, post_types.type_name from posts, users, topics, post_types where posts.type_id = post_types.id and posts.topic_id = topics.id and posts.user_id = users.id and topics.topic_name like :topic_name', array(':topic_name' => '%' . $_GET['query'] . '%'));

            $comments = $db->query('SELECT comments.comment, users.username, comments.posted_at, posts.body, topics.topic_name, post_types.type_name, posts.id, posts.user_id as post_owner_id from comments, posts, users, topics, post_types where posts.topic_id = topics.id and posts.type_id = post_types.id and comments.post_id = posts.id and comments.user_id = users.id and comments.comment like :comment', array(':comment' => '%' . $_GET['query'] . '%'));

            $subjects = $db->query('SELECT topic_name, id from topics where topic_name like :topic_name', array(':topic_name' => '%' . $_GET['query'] . '%'));

            $response = "[";

            foreach ($subjects as $subject) {
                # code...

                if ($db->query('SELECT id from following_topics where user_id = :user_id and topic_id = :topic_id', array(':user_id' => $user_id, ':topic_id' => $subject['id']))) {
                    $is_following = True;
                } else {
                    $is_following = False;
                }

                $response .= "{";
                $response .= '"Code" : "topic",';
                $response .= '"SubjectName" : "' . $subject['topic_name'] . '",';
                $response .= '"SubjectId" : "' . $subject['id'] . '",';
                $response .= '"UserId" : "' . $user_id . '",';
                $response .= '"IsFollowing" : "' . $is_following . '"';
                $response .= "},";
            }

            foreach ($users as $user) {
                # code...
                if ($db->query('SELECT id from followers where user_id = :user_id and follower_id = :follower_id', array(':user_id' => $user['id'], ':follower_id' => $user_id))) {
                    $is_following = True;
                } else {
                    $is_following = False;
                }

                $response .= "{";
                $response .= '"Code" : "users",';
                $response .= '"Username" : "' . $user['username'] . '",';
                $response .= '"UserId" : "' . $user['id'] . '",';
                $response .= '"IsFollowingUser" : "' . $is_following . '",';
                $response .= '"Institution" : "' . $user['institution_name'] . '",';
                $response .= '"Designation" : "' . $user['designation_name'] . '"';
                $response .= "},";
            }

            foreach ($posts as $post) {
                # code...
                $escaped = array("\r\n", "\n", "\r");

                $break = '<br/>';

                $post['body'] = str_replace($escaped, $break, $post['body']);

                $response .= "{";
                $response .= '"Code" : "posts",';
                $response .= '"Username" : "' . $post['username'] . '",';
                $response .= '"Body" : "' . $post['body'] . '",';
                $response .= '"PostId" : "' . $post['id'] . '",';
                $response .= '"Topic" : "' . $post['topic_name'] . '",';
                $response .= '"Type" : "' . $post['type_name'] . '",';
                $response .= '"PostedAt" : "' . $post['posted_at'] . '"';
                $response .= "},";
            }

            foreach ($topic_posts as $topic_post) {
                # code...
                $escaped = array("\r\n", "\n", "\r");

                $break = '<br/>';

                $topic_post['body'] = str_replace($escaped, $break, $topic_post['body']);

                $response .= "{";
                $response .= '"Code" : "topic_posts",';
                $response .= '"Username" : "' . $topic_post['username'] . '",';
                $response .= '"Body" : "' . $topic_post['body'] . '",';
                $response .= '"PostId" : "' . $topic_post['id'] . '",';
                $response .= '"Topic" : "' . $topic_post['topic_name'] . '",';
                $response .= '"Type" : "' . $topic_post['type_name'] . '",';
                $response .= '"PostedAt" : "' . $topic_post['posted_at'] . '"';
                $response .= "},";
            }

            foreach ($comments as $comment) {
                # code...
                $post_owner_name = $db->query('SELECT username from users where id = :id', array(':id' => $comment['post_owner_id']))[0]['username'];

                $response .= "{";
                $response .= '"Code" : "comments",';
                $response .= '"Username" : "' . $comment['username'] . '",';
                $response .= '"Comment" : "' . $comment['comment'] . '",';
                $response .= '"PostedAt" : "' . $comment['posted_at'] . '",';
                $response .= '"PostBody" : "' . $comment['body'] . '",';
                $response .= '"PostId" : "' . $comment['id'] . '",';
                $response .= '"PostOwner" : "' . $post_owner_name . '",';
                $response .= '"PostTopic" : "' . $comment['topic_name'] . '",';
                $response .= '"PostType" : "' . $comment['type_name'] . '"';
                $response .= "},";
            }

            $response = substr($response, 0, strlen($response) - 1);
            $response .= ']';
        } else {
            //case when the user isnt logged in
            $users = $db->query('SELECT users.id, users.username, institutions.institution_name, designations.designation_name from users, institutions, designations where users.id != :user_id and users.institution_id = institutions.id and users.designation_id = designations.id and users.username like :username', array(':username' => "%" . $_GET['query'] . "%", ':user_id' => $user_id));

            $posts = $db->query('SELECT posts.id, posts.body, posts.posted_at, users.username, topics.topic_name, post_types.type_name from posts, users, topics, post_types where posts.type_id = post_types.id and posts.topic_id = topics.id and posts.user_id = users.id and posts.body like :postbody', array(':postbody' => "%" . $_GET['query'] . "%"));

            $topic_posts = $db->query('SELECT posts.id, posts.body, topics.topic_name, posts.posted_at, users.username, post_types.type_name from posts, users, topics, post_types where posts.type_id = post_types.id and posts.topic_id = topics.id and posts.user_id = users.id and topics.topic_name like :topic_name', array(':topic_name' => '%' . $_GET['query'] . '%'));

            $comments = $db->query('SELECT comments.comment, users.username, comments.posted_at, posts.body, topics.topic_name, post_types.type_name, posts.id, posts.user_id as post_owner_id from comments, posts, users, topics, post_types where posts.topic_id = topics.id and posts.type_id = post_types.id and comments.post_id = posts.id and comments.user_id = users.id and comments.comment like :comment', array(':comment' => '%' . $_GET['query'] . '%'));

            $subjects = $db->query('SELECT topic_name, id from topics where topic_name like :topic_name', array(':topic_name' => '%' . $_GET['query'] . '%'));

            $response = "[";

            foreach ($subjects as $subject) {
                # code...

                $response .= "{";
                $response .= '"Code" : "topic",';
                $response .= '"SubjectName" : "' . $subject['topic_name'] . '",';
                $response .= '"SubjectId" : "' . $subject['id'] . '",';
                $response .= '"UserId" : "' . $user_id . '",';
                $response .= "},";
            }

            foreach ($users as $user) {
                # code...

                $response .= "{";
                $response .= '"Code" : "users",';
                $response .= '"Username" : "' . $user['username'] . '",';
                $response .= '"UserId" : "' . $user['id'] . '",';
                $response .= '"Institution" : "' . $user['institution_name'] . '",';
                $response .= '"Designation" : "' . $user['designation_name'] . '"';
                $response .= "},";
            }

            foreach ($posts as $post) {
                # code...
                $escaped = array("\r\n", "\n", "\r");

                $break = '<br/>';

                $post['body'] = str_replace($escaped, $break, $post['body']);

                $response .= "{";
                $response .= '"Code" : "posts",';
                $response .= '"Username" : "' . $post['username'] . '",';
                $response .= '"Body" : "' . $post['body'] . '",';
                $response .= '"PostId" : "' . $post['id'] . '",';
                $response .= '"Topic" : "' . $post['topic_name'] . '",';
                $response .= '"Type" : "' . $post['type_name'] . '",';
                $response .= '"PostedAt" : "' . $post['posted_at'] . '"';
                $response .= "},";
            }

            foreach ($topic_posts as $topic_post) {
                # code...
                $escaped = array("\r\n", "\n", "\r");

                $break = '<br/>';

                $topic_post['body'] = str_replace($escaped, $break, $topic_post['body']);

                $response .= "{";
                $response .= '"Code" : "topic_posts",';
                $response .= '"Username" : "' . $topic_post['username'] . '",';
                $response .= '"Body" : "' . $topic_post['body'] . '",';
                $response .= '"PostId" : "' . $topic_post['id'] . '",';
                $response .= '"Topic" : "' . $topic_post['topic_name'] . '",';
                $response .= '"Type" : "' . $topic_post['type_name'] . '",';
                $response .= '"PostedAt" : "' . $topic_post['posted_at'] . '"';
                $response .= "},";
            }

            foreach ($comments as $comment) {
                # code...
                $post_owner_name = $db->query('SELECT username from users where id = :id', array(':id' => $comment['post_owner_id']))[0]['username'];

                $response .= "{";
                $response .= '"Code" : "comments",';
                $response .= '"Username" : "' . $comment['username'] . '",';
                $response .= '"Comment" : "' . $comment['comment'] . '",';
                $response .= '"PostedAt" : "' . $comment['posted_at'] . '",';
                $response .= '"PostBody" : "' . $comment['body'] . '",';
                $response .= '"PostId" : "' . $comment['id'] . '",';
                $response .= '"PostOwner" : "' . $post_owner_name . '",';
                $response .= '"PostTopic" : "' . $comment['topic_name'] . '",';
                $response .= '"PostType" : "' . $comment['type_name'] . '"';
                $response .= "},";
            }

            $response = substr($response, 0, strlen($response) - 1);
            $response .= ']';
        }

        echo $response;
    } elseif ($_GET['url'] == 'subject' && isset($_GET['subject'])) {
        # code...
        if (isset($_COOKIE['SNID'])) {
            $token = $_COOKIE['SNID'];

            //id for the currently logged in user
            $user_id = $db->query('SELECT user_id from login_tokens where token = :token', array(':token' => sha1($token)))[0]['user_id'];

            $username = $db->query('SELECT username from users where id = :id', array(':id' => $user_id))[0]['username'];

            $user_img = $db->query('SELECT profileimg from users where id = :id', array(':id' => $user_id))[0]['profileimg'];

            //id for the user whose profile we're on
            $subject_id = $db->query('SELECT id from topics where topic_name = :topic_name', array(':topic_name' => $_GET['subject']))[0]['id'];

            if ($db->query('SELECT id from following_topics where user_id = :user_id and topic_id = :topic_id', array(':user_id' => $user_id, ':topic_id' => $subject_id))) {
                # code...
                $is_following = true;
            } else {
                $is_following = false;
            }

            $followers = $db->query('SELECT COUNT(user_id) from following_topics where topic_id = :topic_id', array(':topic_id' => $subject_id))[0]['COUNT(user_id)'];

            $subject_posts = $db->query('SELECT posts.id, posts.posted_at, posts.body, posts.likes, posts.comments, posts.shares, users.username, post_types.type_name, topics.topic_name from posts, users, topics, post_types where posts.topic_id = topics.id and posts.type_id = post_types.id and posts.user_id = users.id and posts.topic_id = :topic_id order by posts.posted_at desc', array(':topic_id' => $subject_id));

            $response = "[";
            $response .= "{";
            $response .= '"Subject" : "' . $_GET['subject'] . '",';
            $response .= '"UserImg" : "' . $user_img . '",';
            $response .= '"UserName" : "' . $username . '",';
            $response .= '"IsFollowing" : "' . $is_following . '",';
            $response .= '"Followers" : "' . $followers . '",';
            $response .= '"LoggedInId" : "' . $user_id  . '"';
            $response .= "},";

            foreach ($subject_posts as $p) {
                $escaped = array("\r\n", "\n", "\r");

                $break = '<br/>';

                $p['body'] = str_replace($escaped, $break, $p['body']);

                $post_owner_id = $db->query('SELECT users.id from users, posts where posts.user_id = users.id and posts.id = :post_id', array(':post_id' => $p['id']))[0]['id'];

                $post_owner_name = $db->query('SELECT username from users where id = :user_id', array(':user_id' => $post_owner_id))[0]['username'];

                $post_owner_designation = $db->query('SELECT designations.designation_name from designations, users where users.designation_id = designations.id and users.id = :user_id', array(':user_id' => $post_owner_id))[0]['designation_name'];

                $post_owner_institution = $db->query('SELECT institutions.institution_name from institutions, users where users.institution_id = institutions.id and users.id = :user_id', array(':user_id' => $post_owner_id))[0]['institution_name'];

                $post_owner_img = $db->query('SELECT profileimg from users where id = :id', array(':id' => $post_owner_id))[0]['profileimg'];

                $is_liked = FALSE;

                $is_commented = FALSE;

                $is_shared = FALSE;

                if ($db->query('SELECT id from post_likes where post_id = :post_id and user_id = :user_id', array(':post_id' => $p['id'], ':user_id' => $user_id))) {
                    # code...
                    $is_liked = TRUE;
                }

                if ($db->query('SELECT id from comments where post_id = :post_id and user_id = :user_id', array(':post_id' => $p['id'], ':user_id' => $user_id))) {
                    # code...
                    $is_commented = TRUE;
                }

                if ($db->query('SELECT id from shared_posts where post_id = :post_id and user_id = :user_id', array(':post_id' => $p['id'], ':user_id' => $user_id))) {
                    # code...
                    $is_shared = TRUE;
                }

                $response .= "{";
                $response .= '"PostId": ' . $p['id'] . ',';
                $response .= '"PostBody": "' . $p['body'] . '",';
                $response .= '"PostIsLiked": "' . $is_liked . '",';
                $response .= '"PostIsCommented": "' . $is_commented . '",';
                $response .= '"PostIsShared": "' . $is_shared . '",';
                $response .= '"PostLikes": ' . $p['likes'] . ',';
                $response .= '"PostShares": ' . $p['shares'] . ',';
                $response .= '"PostComments": ' . $p['comments'] . ',';
                $response .= '"PostTopic": "' . $p['topic_name'] . '",';
                $response .= '"PostType": "' . $p['type_name'] . '",';
                $response .= '"PostedById": ' . $post_owner_id . ',';
                $response .= '"PostedByName": "' . $post_owner_name . '",';
                $response .= '"PostedByImg": "' . $post_owner_img . '",';
                $response .= '"PostedByDesignation": "' . $post_owner_designation . '",';
                $response .= '"PostedByInstitution": "' . $post_owner_institution . '",';
                $response .= '"PostedAt": ' . $p['posted_at'] . '';
                $response .= "},";
            }

            $response = substr($response, 0, strlen($response) - 1);
            $response .= "]";
        } else {
            //case where the user isn't logged in

            //id for the subject whose profile we're on
            $subject_id = $db->query('SELECT id from topics where topic_name = :topic_name', array(':topic_name' => $_GET['subject']))[0]['id'];

            $followers = $db->query('SELECT COUNT(user_id) from following_topics where topic_id = :topic_id', array(':topic_id' => $subject_id))[0]['COUNT(user_id)'];

            $subject_posts = $db->query('SELECT posts.id, posts.posted_at, posts.body, posts.likes, posts.comments, posts.shares, users.username, post_types.type_name, topics.topic_name from posts, users, topics, post_types where posts.topic_id = topics.id and posts.type_id = post_types.id and posts.user_id = users.id and posts.topic_id = :topic_id order by posts.posted_at desc', array(':topic_id' => $subject_id));

            $response = "[";
            $response .= "{";
            $response .= '"Subject" : "' . $_GET['subject'] . '",';
            $response .= '"Followers" : "' . $followers . '"';
            $response .= "},";

            foreach ($subject_posts as $p) {
                $escaped = array("\r\n", "\n", "\r");

                $break = '<br/>';

                $p['body'] = str_replace($escaped, $break, $p['body']);

                $post_owner_id = $db->query('SELECT users.id from users, posts where posts.user_id = users.id and posts.id = :post_id', array(':post_id' => $p['id']))[0]['id'];

                $post_owner_name = $db->query('SELECT username from users where id = :user_id', array(':user_id' => $post_owner_id))[0]['username'];

                $post_owner_designation = $db->query('SELECT designations.designation_name from designations, users where users.designation_id = designations.id and users.id = :user_id', array(':user_id' => $post_owner_id))[0]['designation_name'];

                $post_owner_institution = $db->query('SELECT institutions.institution_name from institutions, users where users.institution_id = institutions.id and users.id = :user_id', array(':user_id' => $post_owner_id))[0]['institution_name'];

                $post_owner_img = $db->query('SELECT profileimg from users where id = :id', array(':id' => $post_owner_id))[0]['profileimg'];

                $response .= "{";
                $response .= '"PostId": ' . $p['id'] . ',';
                $response .= '"PostBody": "' . $p['body'] . '",';
                $response .= '"PostLikes": ' . $p['likes'] . ',';
                $response .= '"PostShares": ' . $p['shares'] . ',';
                $response .= '"PostComments": ' . $p['comments'] . ',';
                $response .= '"PostTopic": "' . $p['topic_name'] . '",';
                $response .= '"PostType": "' . $p['type_name'] . '",';
                $response .= '"PostedById": ' . $post_owner_id . ',';
                $response .= '"PostedByName": "' . $post_owner_name . '",';
                $response .= '"PostedByImg": "' . $post_owner_img . '",';
                $response .= '"PostedByDesignation": "' . $post_owner_designation . '",';
                $response .= '"PostedByInstitution": "' . $post_owner_institution . '",';
                $response .= '"PostedAt": ' . $p['posted_at'] . '';
                $response .= "},";
            }

            $response = substr($response, 0, strlen($response) - 1);
            $response .= "]";
        }

        echo $response;
    } elseif ($_GET['url'] == 'files' && isset($_GET['post_id'])) {
        # code...
        $post_files = $db->query('SELECT id, file_address, file_type from files where post_id = :post_id', array(':post_id' => $_GET['post_id']));

        if ($post_files) {

            $response = "[";

            foreach ($post_files as $file) {
                # code...
                $filename = explode("\\\\", $file['file_address']);

                $filename = end($filename);

                $response .= "{";
                $response .= '"FileAddress" : "' . $file['file_address'] . '",';
                $response .= '"FileType" : "' . $file['file_type'] . '",';
                $response .= '"FileName" : "' . $filename . '"';
                $response .= "},";
            }

            $response = substr($response, 0, strlen($response) - 1);
            $response .= "]";
            echo $response;
        }
    } elseif ($_GET['url'] == 'notifications') {
        #code...
        $token = $_COOKIE['SNID'];

        //id for the currently logged in user
        $user_id = $db->query('SELECT user_id from login_tokens where token = :token', array(':token' => sha1($token)))[0]['user_id'];

        $notifications = $db->query('SELECT notifications.id, notifications.sender_id, notifications.receiver_id, notifications.seen, notifications.post_id, notifications.created_at, notification_types.notification_type from notifications, notification_types where notifications.type = notification_types.id and notifications.receiver_id = :receiver_id', array(':receiver_id' => $user_id));

        $response = "[";

        if ($notifications) {
            #code...
            foreach ($notifications as $notification) {
                # code...
                $sender_name = $db->query('SELECT username from users where id = :id', array(':id' => $notification['sender_id']))[0]['username'];

                if ($notification['post_id']) {
                    $post_body = $db->query('SELECT body from posts where id = :id', array(':id' => $notification['post_id']))[0]['body'];

                    $post_type = $db->query('SELECT type_name from post_types, posts where posts.type_id = post_types.id and posts.id = :post_id', array(':post_id' => $notification['post_id']))[0]['type_name'];

                    $post_subject = $db->query('SELECT topic_name from topics, posts where posts.topic_id = topics.id and posts.id = :post_id', array(':post_id' => $notification['post_id']))[0]['topic_name'];

                    $response .= "{";
                    $response .= '"Sender" : "' . $sender_name . '",';
                    $response .= '"NotificationId" : "' . $notification['id'] . '",';
                    $response .= '"NotificationType" : "' . $notification['notification_type'] . '",';
                    $response .= '"PostId" : "' . $notification['post_id'] . '",';
                    $response .= '"PostBody" : "' . $post_body . '",';
                    $response .= '"PostType" : "' . $post_type . '",';
                    $response .= '"PostSubject" : "' . $post_subject . '",';
                    $response .= '"Seen" : "' . $notification['seen'] . '"';
                    $response .= "},";
                } else {
                    #code...
                    $sender_profile_img = $db->query('SELECT profileimg from users where id = :id', array(':id' => $notification['sender_id']))[0]['profileimg'];

                    $response .= "{";
                    $response .= '"NotificationId" : "' . $notification['id'] . '",';
                    $response .= '"Sender" : "' . $sender_name . '",';
                    $response .= '"ProfileImg" : "' . $sender_profile_img . '",';
                    $response .= '"NotificationType" : "' . $notification['notification_type'] . '",';
                    $response .= '"Seen" : "' . $notification['seen'] . '"';
                    $response .= "},";
                }

                $db->query('UPDATE notifications set seen = 1 where id = :id', array(':id' => $notification['id']));
            }

            $response = substr($response, 0, strlen($response) - 1);
        }

        $response .= "]";

        echo $response;
    } elseif ($_GET['url'] == 'followers' & isset($_GET['username'])) {

        if (isset($_COOKIE['SNID'])) {
            //case when the viewer is logged in
            $token = $_COOKIE['SNID'];

            $user_id = $db->query('SELECT user_id from login_tokens where token = :token', array(':token' => sha1($token)))[0]['user_id'];

            $profile_owner_id = $db->query('SELECT id from users where username = :username', array(':username' => $_GET['username']))[0]['id'];


            //query for the users following the user whose profile we're on
            $followers = $db->query('SELECT followers.id, followers.follower_id, users.username, users.profileimg from followers, users where followers.follower_id = users.id and followers.user_id = :user_id order by users.username', array(':user_id' => $profile_owner_id));

            if ($followers) {
                $response = "[";

                foreach ($followers as $follower) {
                    $is_following = false;

                    //chacks if the logged in user follows the follower listed
                    if ($db->query('SELECT id from followers where user_id = :user_id and follower_id = :follower_id', array(':user_id' => $follower['follower_id'], ':follower_id' => $user_id))) {
                        $is_following = true;
                    }

                    $response .= "{";
                    $response .= '"IsFollowing" : "' . $is_following . '",';
                    $response .= '"FollowerId" : "' . $follower['follower_id'] . '",';
                    $response .= '"FollowerName" : "' . $follower['username'] . '",';
                    $response .= '"FollowerProfileImg" : "' . $follower['profileimg'] . '"';
                    $response .= "},";
                }

                $response = substr($response, 0, strlen($response) - 1);
                $response .= "]";
            } else {
                $response = '{}';
            }
        } else {
            //case when the viewer isn't logged in
            $profile_owner_id = $db->query('SELECT id from users where username = :username', array(':username' => $_GET['username']))[0]['id'];


            //query for the users following the user whose profile we're on
            $followers = $db->query('SELECT followers.id, followers.follower_id, users.username, users.profileimg from followers, users where followers.follower_id = users.id and followers.user_id = :user_id order by users.username', array(':user_id' => $profile_owner_id));

            if ($followers) {
                $response = "[";

                foreach ($followers as $follower) {

                    $response .= "{";
                    $response .= '"FollowerId" : "' . $follower['follower_id'] . '",';
                    $response .= '"FollowerName" : "' . $follower['username'] . '",';
                    $response .= '"FollowerProfileImg" : "' . $follower['profileimg'] . '"';
                    $response .= "},";
                }

                $response = substr($response, 0, strlen($response) - 1);
                $response .= "]";
            } else {
                $response = '{}';
            }
        }

        echo $response;
    } elseif ($_GET['url'] == 'following' & isset($_GET['username'])) {
        $token = $_COOKIE['SNID'];

        $user_id = $db->query('SELECT user_id from login_tokens where token = :token', array(':token' => sha1($token)))[0]['user_id'];

        $profile_owner_id = $db->query('SELECT id from users where username = :username', array(':username' => $_GET['username']))[0]['id'];


        //query for the users followed by the user whose profile we're on
        $followings = $db->query('SELECT followers.id, followers.user_id, users.username, users.profileimg from followers, users where followers.user_id = users.id and followers.follower_id = :user_id order by users.username', array(':user_id' => $profile_owner_id));

        if ($followings) {
            $response = "[";

            foreach ($followings as $following) {
                $is_following = false;

                //checks if the logged in user follows the follower listed
                if ($db->query('SELECT id from followers where user_id = :user_id and follower_id = :follower_id', array(':user_id' => $following['user_id'], ':follower_id' => $user_id))) {
                    $is_following = true;
                }

                $response .= "{";
                $response .= '"IsFollowing" : "' . $is_following . '",';
                $response .= '"FollowerId" : "' . $following['user_id'] . '",';
                $response .= '"FollowerName" : "' . $following['username'] . '",';
                $response .= '"FollowerProfileImg" : "' . $following['profileimg'] . '"';
                $response .= "},";
            }

            $response = substr($response, 0, strlen($response) - 1);
            $response .= "]";
        } else {
            $response = '{}';
        }

        echo $response;
    } elseif ($_GET['url'] == 'following_subjects' && isset($_GET['username'])) {
        $token = $_COOKIE['SNID'];

        $user_id = $db->query('SELECT user_id from login_tokens where token = :token', array(':token' => sha1($token)))[0]['user_id'];

        $profile_owner_id = $db->query('SELECT id from users where username = :username', array(':username' => $_GET['username']))[0]['id'];


        //query for the subjects followed by the user whose profile we're on
        $following_subjects = $db->query('SELECT following_topics.id, following_topics.topic_id, topics.topic_name from following_topics, topics where following_topics.topic_id = topics.id and following_topics.user_id = :user_id', array(':user_id' => $profile_owner_id));

        if ($following_subjects) {
            $response = "[";

            foreach ($following_subjects as $following_subject) {
                $is_following = false;

                //checks if the logged in user follows the subject listed
                if ($db->query('SELECT id from following_topics where user_id = :user_id and topic_id = :topic_id', array(':user_id' => $user_id, ':topic_id' => $following_subject['topic_id']))) {
                    $is_following = true;
                }

                $response .= "{";
                $response .= '"IsFollowing" : "' . $is_following . '",';
                $response .= '"SubjectId" : "' . $following_subject['topic_id'] . '",';
                $response .= '"SubjectName" : "' . $following_subject['topic_name'] . '"';
                $response .= "},";
            }

            $response = substr($response, 0, strlen($response) - 1);
            $response .= "]";
        } else {
            $response = '{}';
        }

        echo $response;
    } elseif ($_GET['url'] == 'users') {

        $token = $_COOKIE['SNID'];

        $user_id = $db->query('SELECT user_id from login_tokens where token = :token', array(':token' => sha1($token)))[0]['user_id'];

        //list all users

        $users = $db->query('SELECT users.id, users.username, users.profileimg, designations.designation_name, institutions.institution_name from users, designations, institutions where users.designation_id = designations.id and users.institution_id = institutions.id and users.active = 1 and users.id != :user_id order by username limit 100', array(':user_id' => $user_id));

        $response = "[";
        foreach ($users as $user) {
            $response .= "{";
            $response .= '"UserId" : "' . $user['id'] . '",';
            $response .= '"UserName" : "' . $user['username'] . '",';
            $response .= '"ProfileImg" : "' . $user['profileimg'] . '",';
            $response .= '"Designation" : "' . $user['designation_name'] . '",';
            $response .= '"Institution" : "' . $user['institution_name'] . '"';
            $response .= "},";
        }

        $response = substr($response, 0, strlen($response) - 1);
        $response .= "]";

        echo $response;
    } elseif ($_GET['url'] == 'subjects') {

        $token = $_COOKIE['SNID'];

        $user_id = $db->query('SELECT user_id from login_tokens where token = :token', array(':token' => sha1($token)))[0]['user_id'];

        //list all users

        $subejcts = $db->query('SELECT id, topic_name from topics order by topic_name limit 100', array(':user_id' => $user_id));

        $response = "[";
        foreach ($subejcts as $subject) {
            $response .= "{";
            $response .= '"SubjectId" : "' . $subject['id'] . '",';
            $response .= '"SubjectName" : "' . $subject['topic_name'] . '"';
            $response .= "},";
        }

        $response = substr($response, 0, strlen($response) - 1);
        $response .= "]";

        echo $response;
    } elseif ($_GET['url'] == 'post_data') {

        $post_id = $_GET['post_id'];

        $token = $_COOKIE['SNID'];

        $user_id = $db->query('SELECT user_id from login_tokens where token = :token', array(':token' => sha1($token)))[0]['user_id'];

        $post = $db->query('SELECT posts.user_id, users.username, users.profileimg, posts.posted_at, topics.topic_name, post_types.type_name, posts.body from posts, users, post_types, topics where posts.user_id = users.id and posts.topic_id = topics.id and posts.type_id = post_types.id and posts.id = :post_id', array(':post_id' => $post_id))[0];

        $output = "{";
        $output .= '"PostedById" : "' . $post['user_id'] . '",';
        $output .= '"PostedByName" : "' . $post['username'] . '",';
        $output .= '"PostedByImg" : "' . $post['profileimg'] . '",';
        $output .= '"PostedAt" : "' . $post['posted_at'] . '",';
        $output .= '"PostTopic" : "' . $post['topic_name'] . '",';
        $output .= '"PostType" : "' . $post['type_name'] . '",';
        $output .= '"PostBody" : "' . $post['body'] . '",';
        $output .= '"PostId" : "' . $post_id . '"';
        $output .= "}";

        echo $output;
    } elseif ($_GET['url'] == 'reports') {
        $reports = $db->query('SELECT reports.id, reports.report_statement, reports.user_id, reports.post_id, reports.date, reports.action, reports.date_resolved, users.username, users.profileimg, institutions.institution_name, designations.designation_name, posts.user_id as post_owner_id, posts.posted_at, posts.body, posts.likes, posts.comments, posts.shares, topics.topic_name, post_types.type_name from reports, users, posts, institutions, designations, topics, post_types where reports.user_id = users.id and reports.post_id = posts.id and users.institution_id = institutions.id and users.designation_id = designations.id and posts.topic_id = topics.id and posts.type_id = post_types.id order by reports.date');

        $response = "[";

        if ($reports) {
            foreach ($reports as $report) {
                $post_owner_institution = $db->query('SELECT institutions.institution_name from users, institutions where users.institution_id = institutions.id and users.id = :user_id', array(':user_id' => $report['post_owner_id']))[0]['institution_name'];

                $post_owner_designation = $db->query('SELECT designations.designation_name from users, designations where users.designation_id = designations.id and users.id = :user_id', array(':user_id' => $report['post_owner_id']))[0]['designation_name'];

                $post_owner_name = $db->query('SELECT username from users where id = :id', array(':id' => $report['post_owner_id']))[0]['username'];

                $response .= "{";
                $response .= '"ReportId" : "' . $report['id'] . '",';
                $response .= '"PostId" : "' . $report['post_id'] . '",';
                $response .= '"ReporterId" : "' . $report['user_id'] . '",';
                $response .= '"ReporterName" : "' . $report['username'] . '",';
                $response .= '"ReporterImg" : "' . $report['profileimg'] . '",';
                $response .= '"ReporterInstitution" : "' . $report['institution_name'] . '",';
                $response .= '"ReporterDesignation" : "' . $report['designation_name'] . '",';
                $response .= '"ReportStatement" : "' . $report['report_statement'] . '",';
                $response .= '"ReportAction" : "' . $report['action'] . '",';
                $response .= '"DateResolved" : "' . $report['date_resolved'] . '",';
                $response .= '"TimeReported" : "' . $report['date'] . '",';
                $response .= '"PostOwnerId" : "' . $report['post_owner_id'] . '",';
                $response .= '"PostOwnerName" : "' . $post_owner_name . '",';
                $response .= '"PostOwnerInstitution" : "' . $post_owner_institution . '",';
                $response .= '"PostOwnerDesignation" : "' . $post_owner_designation . '",';
                $response .= '"PostedAt" : "' . $report['posted_at'] . '",';
                $response .= '"PostBody" : "' . $report['body'] . '",';
                $response .= '"PostTopic" : "' . $report['topic_name'] . '",';
                $response .= '"PostType" : "' . $report['type_name'] . '",';
                $response .= '"PostLikes" : "' . $report['likes'] . '",';
                $response .= '"PostComments" : "' . $report['comments'] . '",';
                $response .= '"PostShares" : "' . $report['shares'] . '"';
                $response .= "},";
            }

            $response = substr($response, 0, strlen($response) - 1);

            $response .= "]";
        } else {
            $response = "{}";
        }

        echo $response;
    } elseif ($_GET['url'] == 'emails' && isset($_GET['email'])) {

        if ($db->query('SELECT id from users where email = :email', array(':email' => $_GET['email']))) {
            echo "email in use";
        } else {
            echo "email available";
        }
    } elseif ($_GET['url'] == 'usernames' && isset($_GET['username'])) {

        if ($db->query('SELECT id from users where username = :username', array(':username' => $_GET['username']))) {
            echo "username unavailable";
        } else {
            echo "username available";
        }
    }
} elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {
    # code...
    if ($_GET['url'] == 'auth') {
        # code...
        $post_body = file_get_contents("php://input");
        $post_body = json_decode($post_body);

        $username = $post_body->username;
        $password = $post_body->password;

        if ($db->query('SELECT username from users where username = :username', array(':username' => $username))) {
            # code...
            if (password_verify($password, $db->query('SELECT password from users where username = :username', array(':username' => $username))[0]['password'])) {
                # code...
                $cstrong = True;
                $token = bin2hex(openssl_random_pseudo_bytes(64, $cstrong));
                $user_id = $db->query('SELECT id from users where username = :username', array(':username' => $username))[0]['id'];

                $db->query('INSERT into login_tokens values (\'\', :token, :user_id)', array(':token' => sha1($token), ':user_id' => $user_id));

                setcookie("SNID", $token, time() + 60 * 60 * 24 * 7, '/', NULL, NULL, True);

                setcookie("SNID_", 1, time() + 60 * 60 * 24 * 3, '/', NULL, NULL, True);

                // echo '{"Token": "'.$token.'"}';

            } else {
                # code...
                echo '{"Error": "Invalid username or password"}';
                http_response_code(401);
            }
        } else {
            # code...
            echo '{"Error": "Invalid username or password"}';
            http_response_code(401);
        }
    } elseif ($_GET['url'] == 'profile_image' && isset($_GET['id'])) {
        # code...
        if (0 < $_FILES['file']['error']) {
            # code...
            echo 'Error: ' . $_FILES['file']['error'] . '<br>';
        } else {
            # code...
            $test = explode('.', $_FILES['file']['name']);
            $extension = end($test);

            $name = 'prof' . $_GET['id'] . '.' . $extension;
            $location = 'F:\\Prorgramming Resources\\xampp\\htdocs\\PROJECT_SN\\files\\profile\\img\\' . $name;

            move_uploaded_file($_FILES['file']['tmp_name'], $location);

            $location_name = "files\\\\profile\\\\img\\\\" . $name;

            echo 'image saved';

            $db->query('UPDATE users set profileimg = :profileimg where id = :id', array(':profileimg' => $location_name, ':id' => $_GET['id']));
        }
    } elseif ($_GET['url'] == 'users') {
        # code...
        $post_body = file_get_contents("php://input");
        $post_body = json_decode($post_body);

        $username = $post_body->username;
        $password1 = $post_body->password1;
        $password2 = $post_body->password2;
        $email = $post_body->email;
        $institution = $post_body->institution;
        $designation = $post_body->designation;
        $specialty = $post_body->specialty;

        if ($db->query('SELECT id from institutions where institution_name = :institution_name', array(':institution_name' => $institution))) {
            $institution = $db->query('SELECT id from institutions where institution_name = :institution_name', array(':institution_name' => $institution))[0]['id'];
        } else {
            $db->query('INSERT into institutions values (\'\', :institution_name)', array(':institution_name' => $institution));

            $institution = $db->query('SELECT id from institutions where institution_name = :institution_name', array(':institution_name' => $institution))[0]['id'];
        }

        $designation = $db->query('SELECT id from designations where designation_name = :designation_name', array(':designation_name' => $designation))[0]['id'];

        $db->query('INSERT INTO users VALUES (\'\',:username, :password, :email, 1, \'\', \'\', :institution, :designation, unix_timestamp(), :specialty)', array(':username' => $username, ':password' => password_hash($password1, PASSWORD_BCRYPT), ':email' => $email, ':institution' => $institution, ':designation' => $designation, ':specialty' => $specialty)); //query  to insert the user input into the database, if all validation constraints pass

        // Mail::send_mail("Welcome to Kenya Scholars", "Your account was created successfuly!", $email);

        $new_user_id = $db->query('SELECT id from users order by joined_date desc limit 1')[0]['id'];

        echo '{"Id":"' . $new_user_id . '"}';
        http_response_code(200);

        //assign a login token to the new user
        $cstrong = True;
        $token = bin2hex(openssl_random_pseudo_bytes(64, $cstrong));

        $db->query('INSERT into login_tokens values (\'\', :token, :user_id)', array(':token' => sha1($token), ':user_id' => $new_user_id));

        setcookie("SNID", $token, time() + 60 * 60 * 24 * 7, '/', NULL, NULL, True);

        setcookie("SNID_", 1, time() + 60 * 60 * 24 * 3, '/', NULL, NULL, True);
    } elseif ($_GET['url'] == 'likes') {
        # code...

        $token = $_COOKIE['SNID'];

        $liker_id = $db->query('SELECT user_id from login_tokens where token = :token', array(':token' => sha1($token)))[0]['user_id'];

        $is_liked = FALSE;

        $post_id = $_GET['post_id'];

        $post_owner_id = $db->query('SELECT user_id from posts where id = :id', array(':id' => $post_id))[0]['user_id'];

        if (!$db->query('SELECT id from post_likes where post_id = :post_id and user_id = :user_id', array(':post_id' => $post_id, ':user_id' => $liker_id))) {
            # code...
            $db->query('UPDATE posts set likes = likes + 1 where id = :post_id', array(':post_id' => $post_id));

            $db->query('INSERT into post_likes values (\'\', :post_id, :user_id)', array(':post_id' => $post_id, ':user_id' => $liker_id));

            //creating a notification
            if ($liker_id != $post_owner_id) {

                $db->query('INSERT into notifications values (\'\', 1, :receiver, :sender, :post_id, null, 0, unix_timestamp())', array(':receiver' => $post_owner_id, ':sender' => $liker_id, ':post_id' => $post_id));
            }

            $is_liked = TRUE;

            // if ($liker_id != $user_id) {
            // 	Notify::createNotify("", $post_id);
            // 	# code...
            //  


        } else {
            $db->query('UPDATE posts set likes = likes - 1 where id = :post_id', array(':post_id' => $post_id));

            $db->query('DELETE from post_likes where post_id = :post_id and user_id = :user_id', array(':post_id' => $post_id, ':user_id' => $liker_id));

            $db->query('DELETE from notifications where type = 1 and sender_id = :sender and receiver_id = :receiver and post_id = :post_id', array(':sender' => $liker_id, ':receiver' => $post_owner_id, ':post_id' => $post_id));

            $is_liked = FALSE;
        }

        echo "{";
        echo '"PostLikes" :';
        echo $db->query('SELECT likes from posts where id = :post_id', array('post_id' => $post_id))[0]['likes'] . ",";
        echo '"PostIsLiked" :';
        echo '"' . $is_liked . '"';
        echo "}";
    } elseif ($_GET['url'] == 'rate_comment') {
        $token = $_COOKIE['SNID'];

        $user_id = $db->query('SELECT user_id from login_tokens where token = :token', array(':token' => sha1($token)))[0]['user_id'];

        $post_body = file_get_contents("php://input");
        $post_body = json_decode($post_body);

        $rating = $post_body->rating;

        $is_rated = FALSE;

        if (!$db->query('SELECT id from comment_ratings where user_id = :user_id and comment_id = :comment_id', array(':user_id' => $user_id, ':comment_id' => $_GET['comment_id']))) {
            $db->query('INSERT into comment_ratings values (\'\', :comment_id, :user_id, :rating)', array(':comment_id' => $_GET['comment_id'], ':user_id' => $user_id, ':rating' => $rating));

            $is_rated = TRUE;
        } else {
            # code...
            $db->query('UPDATE comment_ratings set rating = :rating where comment_id = :comment_id and user_id = :user_id', array(':rating' => $rating, ':comment_id' => $_GET['comment_id'], ':user_id' => $user_id));

            $is_rated = TRUE;
        }

        $rating = round($db->query('SELECT AVG(rating) from comment_ratings where comment_id = :comment_id', array(':comment_id' => $_GET['comment_id']))[0]['AVG(rating)'], 1);

        echo "{";
        echo '"Rating" : "' . $rating . '",';
        echo '"Comment_id" : "' . $_GET['comment_id'] . '"';
        echo "}";
    } elseif ($_GET['url'] == 'update_profile') {
        # code...
        $token = $_COOKIE['SNID'];

        $user_id = $db->query('SELECT user_id from login_tokens where token = :token', array(':token' => sha1($token)))[0]['user_id'];

        $old_username = $db->query('SELECT username from users where id = :id', array(':id' => $user_id))[0]['username'];

        $password = $db->query('SELECT password from users where id = :id', array(':id' => $user_id))[0]['password'];

        $request = file_get_contents("php://input");
        $request = json_decode($request);

        $username = $request->username;
        $institution = $request->institution;
        $designation = $request->designation;
        $specialty = $request->specialty;
        $new_password = $request->password;

        if ($username && $institution && $designation && $specialty) {
            if ($old_username != $username) {
                //if username has been changed
                if ($db->query('SELECT id from users where username = :username', array(':username' => $username))) {
                    # code...
                    echo '{"username":"taken", "user": "not_updated"}';
                    // $username = $_GET['username'];
                }
            } else {

                $institution_id = $db->query('SELECT id from institutions where institution_name = :institution', array(':institution' => $institution))[0]['id'];

                $designation_id = $db->query('SELECT id from designations where designation_name = :designation', array(':designation' => $designation))[0]['id'];

                if ($password != $new_password) {
                    $new_password = password_hash($new_password, PASSWORD_BCRYPT);

                    $db->query('UPDATE users set username = :username, institution_id = :institution, password = :password, designation_id = :designation, specialty = :specialty where id = :id', array(':username' => $username, ':institution' => $institution_id, ':password' => $new_password, ':designation' => $designation_id, ':specialty' => $specialty, ':id' => $user_id));

                    echo '{"user": "updated"}';
                } else {
                    $db->query('UPDATE users set username = :username, institution_id = :institution, designation_id = :designation, specialty = :specialty where id = :id', array(':username' => $username, ':institution' => $institution_id, ':designation' => $designation_id, ':specialty' => $specialty, ':id' => $user_id));

                    echo '{"user": "updated"}';
                }
            }
        } else {
            echo '{"status": "something went wrong"}';
        }


        // echo $username . '' . $institution . '' . $designation . '' . $specialty;
    } elseif ($_GET['url'] == 'follow') {
        # code...

        $token = $_COOKIE['SNID'];

        //id for the currently logged in user
        $follower_id = $db->query('SELECT user_id from login_tokens where token = :token', array(':token' => sha1($token)))[0]['user_id'];

        //id for the owner of the profile being followed
        $request = file_get_contents("php://input");
        $request = json_decode($request);

        $user_id = $request->UserId;
        $subject_id = $request->SubjectId;
        $subject_name = $request->SubjectName;

        $isFollowing = False;

        if ($subject_id) {
            # code...

            if (!$db->query('SELECT id from following_topics where user_id = :user_id and topic_id = :subject_id', array(':user_id' => $follower_id, ':subject_id' => $subject_id))) { //check whether the logged in user follows the user whose profile they are on
                # code...

                $db->query('INSERT into following_topics values(\'\', :user_id, :subject_id)', array(':user_id' => $follower_id, ':subject_id' => $subject_id));

                $isFollowing = True;
            } else {

                $db->query('DELETE from following_topics where user_id = :user_id and topic_id = :subject_id', array(':user_id' => $follower_id, ':subject_id' => $subject_id));
                $isFollowing = False;
            }
        } elseif ($user_id) {
            # code...
            if ($user_id != $follower_id) { //to prevent a user from following themselves
                # code...
                if (!$db->query('SELECT follower_id from followers where user_id = :user_id and follower_id = :follower_id', array(':user_id' => $user_id, ':follower_id' => $follower_id))) { //check whether the logged in user follows the user whose profile they are on
                    # code...
                    $db->query('INSERT into followers values(\'\', :user_id, :follower_id)', array(':user_id' => $user_id, ':follower_id' => $follower_id));

                    $db->query('INSERT into notifications values (\'\', 7, :receiver, :sender, \'\', null, 0, unix_timestamp())', array(':receiver' => $user_id, ':sender' => $follower_id));

                    $isFollowing = True;
                } else {

                    $db->query('DELETE from followers where user_id = :user_id and follower_id = :follower_id', array(':user_id' => $user_id, ':follower_id' => $follower_id));

                    $db->query('DELETE from notifications where type = 7 and sender_id = :sender and receiver_id = :receiver', array(':sender' => $follower_id, ':receiver' => $user_id));

                    $isFollowing = False;
                }
            } else {
                $isFollowing = "error";
            }
        } elseif ($subject_name) {
            $subject_id = $db->query('SELECT id from topics where topic_name = :subject_name', array(':subject_name' => $subject_name))[0]['id'];

            if (!$db->query('SELECT id from following_topics where user_id = :user_id and topic_id = :subject_id', array(':user_id' => $follower_id, ':subject_id' => $subject_id))) { //check whether the logged in user follows the user whose profile they are on
                # code...

                $db->query('INSERT into following_topics values(\'\', :user_id, :subject_id)', array(':user_id' => $follower_id, ':subject_id' => $subject_id));

                $isFollowing = True;
            } else {

                $db->query('DELETE from following_topics where user_id = :user_id and topic_id = :subject_id', array(':user_id' => $follower_id, ':subject_id' => $subject_id));
                $isFollowing = False;
            }
        }

        echo '{"IsFollowing":"' . $isFollowing . '"}';
    } elseif ($_GET['url'] == 'share') {
        # code...
        $token = $_COOKIE['SNID'];

        $user_id = $db->query('SELECT user_id from login_tokens where token = :token', array(':token' => sha1($token)))[0]['user_id'];

        // $is_shared = FALSE;

        $post_id = $_GET['post_id'];

        $is_shared = False;

        $post_owner_id = $db->query('SELECT user_id from posts where id = :id', array(':id' => $post_id))[0]['user_id'];

        if ($post_owner_id != $user_id) {

            if (!$db->query('SELECT id from shared_posts where user_id = :user_id and post_id = :post_id', array(':user_id' => $user_id, ':post_id' => $post_id))) {

                $db->query('UPDATE posts set shares = shares + 1 where id = :post_id', array(':post_id' => $post_id));

                $db->query('INSERT into shared_posts values(\'\', unix_timestamp(), :post_id, :user_id)', array(':post_id' => $post_id, ':user_id' => $user_id));

                //creating a notification
                if ($user_id != $post_owner_id) {

                    $db->query('INSERT into notifications values (\'\', 3, :receiver, :sender, :post_id, null, 0, unix_timestamp())', array(':receiver' => $post_owner_id, ':sender' => $user_id, ':post_id' => $post_id));
                }

                $is_shared = True;
            } else {
                $db->query('UPDATE posts set shares = shares - 1 where id = :post_id', array(':post_id' => $post_id));

                $db->query('DELETE from shared_posts where post_id = :post_id and user_id = :user_id', array(':post_id' => $post_id, ':user_id' => $user_id));

                $db->query('DELETE from notifications where type = 3 and sender_id = :sender and receiver_id = :receiver and post_id = :post_id', array(':sender' => $user_id, ':receiver' => $post_owner_id, ':post_id' => $post_id));
            }
        }


        echo "{";
        echo '"PostShares" :';
        echo $db->query('SELECT shares from posts where id = :post_id', array('post_id' => $post_id))[0]['shares'] . ",";
        echo '"PostIsShared" :';
        echo '"' . $is_shared . '"';
        echo "}";
    } elseif ($_GET['url'] == 'comment') {

        $token = $_COOKIE['SNID'];

        $user_id = $db->query('SELECT user_id from login_tokens where token = :token', array(':token' => sha1($token)))[0]['user_id'];

        $request = file_get_contents("php://input");
        $request = json_decode($request);

        $comment_body = $request->CommentBody;

        // $comment_body = htmlspecialchars($comment_body);

        $post_id = $_GET['post_id'];

        $post_owner_id = $db->query('SELECT user_id from posts where id = :id', array(':id' => $post_id))[0]['user_id'];

        if ($db->query('SELECT id from posts where id = :post_id', array(':post_id' => $post_id))) {
            # code...
            $db->query('INSERT into comments values (\'\', :comment, :user_id, unix_timestamp(), :post_id)', array(':comment' => $comment_body, ':user_id' => $user_id, ':post_id' => $post_id));

            //create a notification
            if ($user_id != $post_owner_id) {

                $comment_id = $db->query('SELECT id from comments where user_id = :user_id order by id desc LIMIT 1', array(':user_id' => $user_id))[0]['id'];

                $db->query('INSERT into notifications values (\'\', 2, :receiver, :sender, :post_id, :comment_id, 0, unix_timestamp())', array(':receiver' => $post_owner_id, ':sender' => $user_id, ':post_id' => $post_id, ':comment_id' => $comment_id));
            }

            echo 'Comment posted: ' . $comment_body;
        }

        $db->query('UPDATE posts set comments = comments + 1 where id = :id', array(':id' => $post_id));
    } elseif ($_GET['url'] == 'report' && isset($_GET['post_id'])) {
        $request = file_get_contents("php://input");
        $request = json_decode($request);

        $report_body = $request->ReportBody;

        $token = $_COOKIE['SNID'];

        $user_id = $db->query('SELECT user_id from login_tokens where token = :token', array(':token' => sha1($token)))[0]['user_id'];

        if (!$db->query('SELECT id from reports where post_id = :post_id and user_id = :user_id', array(':post_id' => $_GET['post_id'], ':user_id' => $user_id))) {

            $db->query('INSERT into reports values(\'\', :r_statement, unix_timestamp(), :post_id, :user_id, null, null)', array(':post_id' => $_GET['post_id'], ':user_id' => $user_id, ':r_statement' => $report_body));

            echo "report posted";
        } else {

            $db->query('UPDATE reports set report_statement = :report, action = null, date_resolved = null where post_id = :post_id and user_id = :user_id', array(':post_id' => $_GET['post_id'], ':user_id' => $user_id, ':report' => $report_body));

            echo 'report updated';
        }
    } elseif ($_GET['url'] == 'report_action' && isset($_GET['report_id'])) {
        $post_body = file_get_contents("php://input");
        $post_body = json_decode($post_body);

        $action = $post_body->Action;
        $post_id = $post_body->PostId;

        if ($action == "delete") {

            $db->query('UPDATE posts set body = "This post has been removed due to abuse of site policies." where id = :post_id', array(':post_id' => $post_id));

            $db->query('UPDATE reports set action = "deleted", date_resolved = unix_timestamp() where id = :id', array(':id' => $_GET['report_id']));

            echo "post deleted";
        } elseif ($action == "deactivate") {
            $user_id = $db->query('SELECT user_id from posts where id = :id', array(':id' => $post_id))[0]['user_id'];

            $db->query('UPDATE users set active = 0 where id = :user_id', array(':user_id' => $user_id));

            $db->query('UPDATE reports set action = "deactivated", date_resolved = unix_timestamp() where id = :id', array(':id' => $_GET['report_id']));

            echo "user deactivated";
        } elseif ($action == "reactivate") {
            $user_id = $db->query('SELECT user_id from posts where id = :id', array(':id' => $post_id))[0]['user_id'];

            $db->query('UPDATE users set active = 1 where id = :user_id', array(':user_id' => $user_id));

            $db->query('UPDATE reports set action = "reactivated", date_resolved = unix_timestamp() where id = :id', array(':id' => $_GET['report_id']));

            echo "user reactivated";
        } elseif ($action = "resolve") {
            $db->query('UPDATE reports set action = "resolved", date_resolved = unix_timestamp() where id = :id', array(':id' => $_GET['report_id']));

            echo "report resolved";
        }
    }
} elseif ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    # code...
    if ($_GET['url'] == 'auth') {
        # code...

        $token = $_COOKIE['SNID'];

        $user_id = $db->query('SELECT user_id from login_tokens where token = :token', array(':token' => sha1($token)))[0]['user_id'];

        if ($token) {
            $db->query('DELETE from login_tokens where token = :token', array(':token' => sha1($token)));

            setcookie('SNID', '1', time() - 3600, '/', NULL, NULL, True);
            setcookie('SNID_', '1', time() - 3600, '/', NULL, NULL, True);

            echo "cookie expired";
        }

        if (isset($_GET['all'])) {
            $db->query('DELETE from login_tokens where user_id = :user_id', array(':user_id' => $user_id));

            echo "all cookies deleted";
        }
    } elseif ($_GET['url'] == 'users') {
        # code...

    } elseif ($_GET['url'] == 'post' && isset($_GET['post_id'])) {
        # code...
        $token = $_COOKIE['SNID'];

        $user_id = $db->query('SELECT user_id from login_tokens where token = :token', array(':token' => sha1($token)))[0]['user_id'];

        $db->query('DELETE from posts where id = :post_id and user_id = :user_id', array(':post_id' => $_GET['post_id'], ':user_id' => $user_id));
        $db->query('DELETE from post_likes where post_id = :post_id', array(':post_id' => $_GET['post_id']));

        $db->query('DELETE from shared_posts where post_id = :post_id', array(':post_id' => $_GET['post_id']));

        $db->query('DELETE from reports where post_id = :post_id', array(':post_id' => $_GET['post_id']));

        $comments = $db->query('SELECT id from comments where post_id = :post_id', array(':post_id' => $_GET['post_id']));

        foreach ($comments as $comment) {
            $db->query('DELETE from comment_ratings where comment_id = :comment_id', array(':comment_id' => $comment['id']));
        }

        $db->query('DELETE from comments where post_id = :post_id', array(':post_id' => $_GET['post_id']));

        $files = $db->query('SELECT file_address from files where post_id = :post_id', array(':post_id' => $_GET['post_id']));

        foreach ($files as $file) {

            $address = str_replace('\\\\\\\\', '\\', $file['file_address']);
            unlink('F:\\Prorgramming Resources\\xampp\\htdocs\\PROJECT_SN\\' . $address . '');
        }

        $db->query('DELETE from files where post_id = :post_id', array(':post_id' => $_GET['post_id']));

        echo "Post deleted.";
    } elseif ($_GET['url'] == 'comment' && isset($_GET['comment_id'])) {
        $post_id = $db->query('SELECT post_id from comments where id = :id', array(':id' => $_GET['comment_id']))[0]['post_id'];

        $db->query('DELETE from comments where id = :id', array(':id' => $_GET['comment_id']));

        $db->query('DELETE from comment_ratings where comment_id = :id', array(':id' => $_GET['comment_id']));

        $db->query('UPDATE posts set comments = comments - 1 where id = :id', array(':id' => $post_id));

        $db->query('DELETE from notifications where comment_id = :comment_id', array(':comment_id' => $_GET['comment_id']));

        echo 'comment deleted';
    }
} else {
    # code...
    http_response_code(405);
}
