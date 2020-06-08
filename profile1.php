<?php
include 'classes/Classes.php';

// $myName = strtolower(DB::query('SELECT username from users where id = :user_id', array(':user_id' => Login::isLoggedIn()))[0]['username']);

// echo "Logged in as ", $myName, "</p>";

// $active = DB::query('SELECT active from users where id = :user_id', array(':user_id' => Login::isLoggedIn()))[0]['active'];

$username = "";

if (isset($_GET['username'])) {
    # code...
    if (DB::query('SELECT username from users where username = :username', array(':username' => $_GET['username']))) { //check if username passed in the url is valid
        # code...
        $user_id = DB::query('SELECT id from users where username = :username', array(':username' => $_GET['username']))[0]['id']; //user_id for the user whose profile we are on


        if (isset($_POST['post'])) {
            # code...

            $type = DB::query('SELECT id from post_types where type_name = :type', array(':type' => $_POST['post_type']))[0]['id'];

            if (DB::query('SELECT id from topics where topic_name = :topic_name', array(':topic_name' => $_POST['post_topic']))) {
                # code...
                $topic = DB::query('SELECT id from topics where topic_name = :topic_name', array(':topic_name' => $_POST['post_topic']))[0]['id'];
            } else {
                # code...
                DB::query('INSERT into topics values(\'\', :topic_name)', array(':topic_name' => $_POST['post_topic']));

                $topic = DB::query('SELECT id from topics where topic_name = :topic_name', array(':topic_name' => $_POST['post_topic']))[0]['id'];
            }

            $post_body = htmlspecialchars($_POST['post_body']);

            Post::createPost($post_body, Login::isLoggedIn(), $user_id, $type, $topic);

            $post_id = DB::query('SELECT id from posts where user_id = :user_id order by id desc limit 1', array(':user_id' => Login::isLoggedIn()))[0]['id'];

            //handler for document file uploads
            if (count($_FILES['post_pdf_upload']) > 0) {
                $doc_files_array = re_array_files($_FILES['post_pdf_upload']);

                foreach ($doc_files_array as $file) {
                    # code...
                    if (!$file['error']) {
                        # code...
                        if (($file['type'] == "application/pdf") || ($file['type'] == "application/xls")) {
                            # code...
                            if ($file['size'] <= 10000000) {
                                # code...
                                // $name = $file['name'];

                                $test = explode('.', $file['name']);

                                $extension = end($test);

                                $name = $test[count($test) - 2];

                                $location_dir = 'F:\\Prorgramming Resources\\xampp\\htdocs\\PROJECT_SN\\files\\post\\doc\\' . $name . '' . $post_id . '.' . $extension;

                                move_uploaded_file($file['tmp_name'], $location_dir);

                                // echo "doc saved";

                                $location =  "files\\\\\\\\post\\\\\\\\doc\\\\\\\\" . $name . '' . $post_id . '.' . $extension;

                                DB::query('INSERT into files values (\'\', :file_address, "doc", :post_id)', array(':file_address' => $location, ':post_id' => $post_id));

                                // echo "address saved";
                            } else {
                                # code...
                                //handler for oversize file
                            }
                        } else {
                            # code...
                            //handler for invalid extension
                        }
                    } else {
                        # code...
                        //handler for upload error
                    }
                }
            }

            // //handler for image file uploads
            // if(count($_FILES['post_img_upload']) > 0){
            //     $files_array = re_array_files($_FILES['post_img_upload']);

            //     foreach ($files_array as $file) {
            //         # code...
            //         if (!$file['error']) {
            //             # code...
            //             if (($file['type'] == "image/jpeg") || ($file['type'] == "image/png")) {
            //                 # code...
            //                 if ($file['size'] <= 5000000) {
            //                     # code...
            //                     // $name = $file['name'];

            //                     $test = explode('.', $file['name']);

            //                     $extension = end($test);

            //                     $name = $test[count($test)-2];

            //                     $location_dir = 'F:\\Prorgramming Resources\\xampp\\htdocs\\PROJECT_SN\\files\\post\\img\\'.$name.''.$post_id.'.'.$extension;

            //                     move_uploaded_file($file['tmp_name'], $location_dir);

            //                     // echo "img saved";

            //                     $location =  "files\\\\post\\\\img\\\\".$name.''.$post_id.'.'.$extension;

            //                     DB::query('INSERT into files values (\'\', :file_address, "img", :post_id)', array(':file_address' => $location, ':post_id' => $post_id));

            //                     // echo "address saved";
            //                 } else {
            //                     # code...
            //                     //handler for oversize file
            //                 }

            //             } else {
            //                 # code...
            //                 //handler for invalid extension
            //             }
            //         } else {
            //             # code...
            //             //handler for upload error
            //         }

            //     }
            // }
        }
    } else {
        die('user not found');
    }
}

function re_array_files(&$post_files)
{
    $files_array = array();

    $file_count = count($post_files['name']);

    $file_keys = array_keys($post_files);

    for ($i = 0; $i < $file_count; $i++) {
        # code...
        foreach ($file_keys as $key) {
            # code...
            $files_array[$i][$key] = $post_files[$key][$i];
        }
    }

    return $files_array;
}


?>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title><?php echo $_GET['username'] ?></title>
    <link rel="stylesheet" type="text/css" href="assets/css/styles.css" />
    <link rel="stylesheet" href="assets/css/jquery-ui.css" />
    <!-- <link rel="stylesheet" href="assets/css/jquery.Jcrop.css" /> -->
    <link rel="stylesheet" href="assets/css/jquery-ui.structure.css" />
    <link rel="stylesheet" href="assets/css/jquery-ui.theme.css" />
    <link rel="stylesheet" type="text/css" href="assets/css/profile_styles.css" />
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/fonts/ionicons.min.css">
    <!-- <link rel="stylesheet" href="assets/fonts/iconicss.min.css"> -->
    <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> -->
    <link rel="stylesheet" href="assets/css/Login-Form-Clean-1.css">
    <link rel="stylesheet" href="assets/fonts/font-awesome.min.css">
    <link rel="stylesheet" href="assets/css/Login-Form-Clean.css">
    <link rel="stylesheet" href="assets/css/Navigation-with-Search.css">
</head>

<body>
    <div class="container-fluid" id="tl_page_container">

        <div class=" p-0 flex-column " id="page_header">
            <div class="p-0 d-flex flex-fill justify-content-center " id="site_title">
                <h1>AcademiKe.</h1>
            </div>
            <div class="p-1 d-flex flex-fill justify-content-center " id="user_profile_page_top">
                <img id="profile_img_navbar" class="rounded-circle border justify-content-center img-responsive shadow-sm visible" loading=" lazy" />
            </div>

            <div class="p-1 d-flex flex-column ">
                <div class="logged_in_as_page_top justify-content-center d-flex">
                    <span><small>Logged in as:</small></span>
                </div>

                <div class="justify-content-center d-flex">
                    <h3><strong id="username_page_top"></strong></h3>
                </div>
            </div>
        </div>

        <div class="icon-bar flex-row d-flex  fixed-bottom" id="navbar">

            <div class="d-flex p-1  justify-content-around flex-fill">

                <div class="p-1 ">
                    <button class="fa fa-users nav_icon" id="timeline_icon" style="color:grey;">
                    </button>
                </div>

                <div class="p-1 ">
                    <button class="fa fa-bell-o nav_icon" id="notifications_icon" style="font-weight: 1px; color: grey;">
                    </button>
                </div>

                <div class="p-1 ">
                    <button class="fa fa-search nav_icon" id="search_icon" style="font-weight: 1px; color: grey;">
                    </button>
                </div>

                <div class="p-1 ">
                    <button class="fa fa-user nav_icon" id="profile_icon"></button>
                </div>

                <div class="p-0 ">
                    <div class="dropdown p-1 ml-auto ml-left ">
                        <button class="fa fa-power-off nav_icon" type="button" data-toggle="dropdown" id="power_menu_button" aria-haspopup="true" aria-expanded="false" style="font-weight: 1px; color: grey;"></button>

                        <div class="dropdown-menu dropdown-menu-right options_dropdown_menu" aria-labelledby="power_menu_button">
                            <button class="dropdown-item tl_post_options" id="log_out_button">Log out</button>

                            <div class="dropdown-item logout_options">
                                <button class=" tl_post_options logout_option_button" id="log_out_this_button">This
                                    Device</button>

                                <button class=" tl_post_options logout_option_button" id="log_out_all_button">All
                                    Devices</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

        <div id="tl_content_container">


            <div class="tab-content" id="tab_content">
                <div class="sticky-top">
                    <div class="d-flex  p-0" id="user_info_container">
                        <!-- column for the username and the profile photo -->
                        <div class=" p-2 flex-column justify-content-center " id="user_pic_and_name">
                            <div class="p-1 d-flex justify-content-left " id="user_profile_page_image">
                                <img id="profile_img_profile_page" class="profile_image_user_info rounded-circle border img-responsive shadow-sm visible" loading=" lazy" />
                            </div>

                            <div class="p-1 d-flex ">
                                <strong id="user_profile_page_name"></strong>
                            </div>
                        </div>

                        <!-- column for the institution, designation and specialty-->
                        <div class="p-2 flex-column justify-content-center  mr-auto mr-right">
                            <div class="p-1 d-flex ">
                                <span id="user_profile_page_institution"></span>
                            </div>
                            <div class="p-1 d-flex ">
                                <span id="user_profile_page_designation"></span>
                            </div>
                            <div class="p-1 d-flex ">
                                <span id="user_profile_page_specialty"></span>
                            </div>
                            <div class="p-1 d-flex ">
                                <a id="user_email"><span id="user_profile_page_email"></span></a>
                            </div>
                        </div>

                        <!-- column for the follow button, followers and following-->
                        <table class="flex-column  " id="follow_table">
                            <tr class="p-1 d-flex justify-content-center " colspan="2" id="follow_button_row">
                                <td>
                                    <button id="user_profile_page_follow_btn">Follow</button>
                                </td>
                            </tr>

                            <tr class="p-1 d-flex flex-row p-0 " id="user_profile_page_followers_following">
                                <td class="p-1  d-flex ">
                                    <span id="user_profile_page_followers"></span>
                                </td>

                                <td class="p-1 d-flex ">
                                    <span id="user_profile_page_following"></span>
                                </td>

                            </tr>
                        </table>

                    </div>

                    <div class="d-flex justify-content-right  p-1 flex-fill" id="create_post_btn_container">

                    </div>

                    <div id="tab_nav_container ">
                        <ul class="nav nav-tabs nav-justified d-flex flex-row flex-shrink" id="tabs_navigation">
                            <li class="nav-item text-left "><a class="nav-link active text-capitalize text-center" role="tab" data-toggle="tab" href="#tab-1" style="margin-left: 11px;margin-top: 3px;"><strong>All Posts</strong></a>
                            </li>
                            <li class="nav-item"><a class="nav-link text-center" id="tab-inactive" role="tab" data-toggle="tab" href="#tab-2" style="margin-left: 4px;margin-top: 3px;"><strong>Questions</strong></a>
                            </li>
                            <li class="nav-item"><a class="nav-link text-center" id="tab-inactive" role="tab" data-toggle="tab" href="#tab-3" style="margin-left: 4px;margin-top: 3px;"><strong>Discussions</strong></a>
                            </li>
                            <li class="nav-item"><a class="nav-link text-center" id="tab-inactive" role="tab" data-toggle="tab" href="#tab-4" style="margin-left: 4px;margin-top: 3px;"><strong>Publications</strong></a>
                            </li>

                        </ul>
                    </div>
                </div>



                <div class="tab-pane active" id="tab-1">

                    <div style="padding-left: 65px;" id="shared_by">
                        <small>shared by name</small>
                    </div>

                    <div class="conatiner d-flex flex-row " id="timeline_posts" style="scroll-padding-left: 10px;">
                        <div class="p-1 flex-column " id="tl_profile_img_container"> <img class="rounded-circle border img-responsive shadow-sm visible" id="profile_img_tl" loading="lazy"> </div>
                        <div class="p-1 flex-fill ">
                            <div class="d-flex p-0 ">
                                <table>
                                    <tr>
                                        <td colspan="3"><span>username here ∙</span></td>
                                        <td>designation here ∙</td>
                                        <td>Time
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>institution here</td>
                                    </tr>
                                </table>
                                <!-- <div id="tl_post_time" class="p-1  mr-auto"> <small> Time
                                    </small></div> -->
                                <div id="tl_post_options" class="p-1 ml-auto ml-left "><small>...</small>
                                </div>
                            </div>
                            <div class="d-flex p-0 ">
                                <div class="p-1 " id="tl_post_topic"><small>Topic
                                    </small></div>
                                <div class="p-1 " id="tl_post_type"><small>Type</small></div>
                            </div>
                            <div class="p-0 ">
                                <p>post body</p>
                                <div class="d-flex p-2  flex-fill justify-content-around">
                                    <div class="p-2 "><a href="#"><i class="icss-heart post_icon"></i></a><span><small>CONTENT
                                                HERE</small></span></div>
                                    <div class="p-2 "><a href="#"><i class="icss-comment post_icon"></i></a><span><small>CONTENT
                                                HERE</small></span></div>
                                    <div class="p-2 "><a href="#"><i class="icss-share post_icon"></i></a><span><small>CONTENT
                                                HERE</small></span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <div id="tl_user" style="height: 50px;width: 80%;align-content: center;/*background-color: black;*/">
                        <div id="tl_p_pic_container" style="height: 40px;width: 40px;"><img class="rounded-circle img-fluid border shadow-sm visible" id="tl_p_pic" loading="lazy" style="width: 40px;height: 40px;float: left;"></div>
                        <div id="tl_username" style="float: right;margin-left: 50px;height: 40px;/*margin-top: 0px;*/"></div>
                    </div> -->


                </div>
                <div class="tab-pane inactive" role="tabpanel" id="tab-2">
                    <span>questions this user asked</span>
                </div>
                <div class="tab-pane inactive" role="tabpanel" id="tab-3">
                    <span>Discussion posts by this user.</span>
                </div>
                <div class="tab-pane inactive" role="tabpanel" id="tab-4">
                    <span>research publications by this user</span>
                </div>
            </div>

            <!--modal window for comments-->
            <div class="modal fade" id="comment_modal" data-keyboard="true" role="dialog" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header" style="position: sticky-top; width: 100%; background: white;">
                            <h6 class="modal-title">Edit Response</h6><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                        </div>
                        <div class="modal-body" id="modal_comments" style="overflow-y: auto; max-height: 600px;">
                            <p>The content of your modal.</p>
                        </div>

                    </div>
                </div>
            </div>

            <!--modal window for searchbox-->
            <div class="modal fade" id="search_modal" data-keyboard="true" role="dialog" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header" style="position: sticky-top; width: 100%; background: white;">
                            <input class="form-control sbox" type="text" placeholder="Search..." id="search_input" autofocus><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                        </div>
                        <div style="overflow-y: auto; max-height: 600px;" id="search_autocomplete">
                            <ul class="list-group autocomplete" style="position:relative;">

                            </ul>
                        </div>

                    </div>
                </div>
            </div>

            <!--modal window for editing profile-->
            <div class="modal fade" id="edit_profile_modal" data-keyboard="true" role="dialog" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header" style="position: sticky-top; width: 100%; background: white;">
                            <h6 class="modal-title">Edit Profile</h6><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                        </div>
                        <div class="modal-body" style="overflow-y: auto; max-height: 600px;" id="edit_profile">

                        </div>

                    </div>
                </div>
            </div>

            <!--modal window for reporting a post-->
            <div class="modal fade" id="report_modal" data-keyboard="true" role="dialog" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header" style="position: sticky-top; width: 100%; background: white;">
                            <h6 class="modal-title">Report Post</h6><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                        </div>
                        <div class="modal-body" id="modal_report" style="overflow-y: auto; max-height: 600px;">
                            <!-- <p>The content of your modal.</p> -->
                        </div>

                    </div>
                </div>
            </div>

            <!--modal wondow for creating a new post-->
            <div class="modal fade ui-front" id="new_post_modal" data-keyboard="true" role="dialog" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header" style="position: sticky-top; width: 100%; background: white;">
                            <h6 class="modal-title">Create Post</h6><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                        </div>
                        <div class="modal-body" style="overflow-y: auto; max-height: 600px;" id="post_input">

                            <form class="form-horizontal" action="profile1.php?username=<?php echo $_GET['username']; ?>" method="POST" enctype="multipart/form-data">
                                <div class="d-flex flex-fill form-inline">
                                    <div class="form-group ">
                                        <label class="form-control-sm" for="post_types">Type:</label>

                                        <select class="form-control-sm" name='post_type' id="post_types" required>
                                            <option value=''></option>

                                            <?php
                                            $types = DB::query('SELECT type_name from post_types');

                                            foreach ($types as $type) { //lists all the post types that exist in the database table post_types
                                                # code...
                                                echo "<option value =" . $type['type_name'] . ">" . $type['type_name'] . "</option>";
                                            }
                                            ?>

                                        </select>
                                        <div class=form-group>
                                            <label class="form-control-sm" for="post_topic">Subject: </label>
                                            <input class="form-control-sm ui-widget" id="post_topic" name="post_topic" placeholder='e.g. biology, psychology, economics...' required>

                                        </div>
                                    </div>
                                </div>

                                <div class="form-group form-horizontal">
                                    <textarea class="form-control" name="post_body" id="new_post_textarea" rows="2" cols="" placeholder='write post...' required></textarea>
                                </div>
                                <div class="form-group form-inline d-flex justify-content-end">
                                    <!--uploading documents-->
                                    <div class="post_file_wrapper" data-toggle="tooltip" data-placement="top" title="Select Document">
                                        <button class="post_file_icon fa fa-paperclip"></button>
                                        <input class="post_file_upload" id="post_pdf_upload" type="file" name="post_pdf_upload[]" onchange="validate_pdf_upload('doc');" multiple />
                                    </div>

                                    <!--uploading images-->
                                    <!-- <div class = "post_file_wrapper" data-toggle = "tooltip" data-placement = "top" title = "Select Image">
                                    <button class = "post_file_icon fa fa-image"></button>
                                    <input class = "post_file_upload" id = "post_img_upload" type = "file" name = "post_img_upload[]" onchange = "validate_pdf_upload('img');" multiple/>
                                </div> -->
                                </div>

                                <span id="pdf_feedback"></span><br />
                                <!-- <span id = "img_feedback"></span> -->

                                <input class="form-control" type="submit" name="post" value="Post" id="submit_post" />
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="assets/js/jquery.min.js"></script>
    <script src="assets/js/jquery-1.12.4.js"></script>
    <!-- <script src="assets/js/jquery-ui.min.js"></script> -->
    <script src="assets/js/jquery-ui.js"></script>
    <script src="assets/js/jquery.Jcrop.js"></script>
    <script src="assets/bootstrap/js/bootstrap.min.js"></script>
    <script src="assets/js/bs-init.js"></script>
    <script src="assets/js/search.js"></script>
    <script src="assets/js/common_functions.js"></script>
    <!-- <script src="assets/js/script.js"></script> -->
    <script type="text/javascript">
        $('#notifications_icon').click(function() {
            window.location.href = "notifications.html";
        })

        $('#timeline_icon').click(function() {
            window.location.href = 'index.html'
        })

        $(document).on('click', '.options_dropdown_menu', function(e) {
            e.stopPropagation();
        });

        $.ajax({
            method: "GET",
            url: "REST_api/user",
            processData: false,
            contentType: "application/json",
            data: '',
            success: function(r) {
                var details = JSON.parse(r)

                var username = details.Username;

                var user_id = details.UserId;

                var profile_img = details.ProfileImg;

                if (details.Status == "Good") {
                    $('#username_page_top').text(username);

                    $('#profile_icon').click(function() {
                        window.location.href = "profile1.php?username=" + username;
                    });

                    if (profile_img) {
                        $('#profile_img_navbar').attr("src", '' + profile_img + '');
                    }

                    //handler for logout button
                    $('#log_out_button').click(function() {
                        logout();
                    })

                } else if (details.Status == "Deactivated") {
                    alert(details.Status);
                } else if (details.Status == "Not logged in") {
                    // window.location.href = 'login.html';
                    $('#page_header').css('display', 'none');
                } else if (details.Status == "Admin") {
                    // window.location.href = 'admin_dashboard.html';
                }


            },
            error: function(r) {
                console.log(r);

            }
        });

        $(document).ready(function() {

            var username = '<?php echo $_GET['username']; ?>';

            $.ajax({

                method: "GET",
                url: "REST_api/profile?username=" + username,
                processData: false,
                contentType: "application/json",
                data: '',
                success: function(r) {

                    var posts = JSON.parse(r);

                    $('#user_profile_page_name').html(username);

                    $('#user_email').attr('href', 'mailto:' + posts[0].Email + '');

                    $('#user_profile_page_followers').click(function() {
                        window.location.href = "following.html?username=" + username + "#tab-1";
                    })

                    $('#user_profile_page_following').click(function() {
                        window.location.href = "following.html?username=" + username + "#tab-2";
                    })

                    if (posts[0].ProfileImg) {
                        $('#profile_img_profile_page').attr('src', '' + posts[0].ProfileImg + '');
                    }

                    $('#user_profile_page_follow_btn').click(function() {
                        $.ajax({
                            method: "GET",
                            url: "REST_api/user",
                            processData: false,
                            contentType: "application/json",
                            data: '',
                            success: function(r) {
                                var details = JSON.parse(r)

                                if (details.Status == "Good") {

                                    $.ajax({
                                        method: 'POST',
                                        url: 'REST_api/follow',
                                        processData: false,
                                        contentType: 'application/json',
                                        data: '{"UserId" : "' + posts[0].ProfileOwnerId + '", "SubjectId" : "", "SubjectName" : ""}',
                                        success: function(r) {
                                            console.log(r);
                                            var is_following = JSON.parse(r)

                                            posts[0].IsFollowing = is_following.IsFollowing

                                            if (posts[0].IsFollowing) {
                                                document.getElementById('user_profile_page_follow_btn').innerHTML = "Unfollow";
                                            } else {
                                                document.getElementById('user_profile_page_follow_btn').innerHTML = "Follow";
                                            }
                                        }
                                    });

                                } else if (details.Status == "Deactivated") {
                                    alert(details.Status);
                                } else if (details.Status == "Not logged in") {
                                    window.location.href = 'login.html';
                                } else if (details.Status == "Admin") {
                                    // window.location.href = 'admin_dashboard.html';
                                }


                            },
                            error: function(r) {
                                console.log(r);

                            }
                        });
                    })

                    $('#user_profile_page_institution').html(posts[0].Institution);

                    $('#user_profile_page_designation').html(posts[0].Designation);

                    $('#user_profile_page_email').html(posts[0].Email);

                    $('#user_profile_page_specialty').html(posts[0].Specialty);

                    document.getElementById('user_profile_page_followers').innerHTML = posts[0].Followers + " Followers";

                    document.getElementById('user_profile_page_following').innerHTML = posts[0].Following + " Following";

                    if (posts[0].LoggedInId == posts[0].ProfileOwnerId) {
                        document.getElementById('follow_button_row').style.visibility = "hidden";

                        document.getElementById('profile_icon').style.color = "limegreen";

                        $('#create_post_btn_container').html($('#create_post_btn_container').html() + '<button class = \"d-flex ml-auto ml-left\" data-toggle = \"tooltip\" data-placement = \"top\" title = \"Edit profile\" id = \"edit_profile_btn\"><i class=\"fa fa-cogs\" id = \"edit_profile_icon\"></i></button><button class=\"d-flex\" id=\"new_post_button\" onclick =\"create_post_modal()\" data-toggle = \"tooltip\" data-placement = \"top\" title = \"New post\"><i class=\"fa fa-pencil-square-o\"></i></button>');
                    } else {
                        if (posts[0].IsFollowing) {
                            document.getElementById('user_profile_page_follow_btn').innerHTML = "Unfollow";
                        } else {
                            document.getElementById('user_profile_page_follow_btn').innerHTML = "Follow";
                        }

                        document.getElementById('profile_icon').style.color = "grey";

                    }

                    $('#edit_profile_btn').click(function() {

                        $('#edit_profile').html('<div class="d-flex  p-0" id="user_info_container"><!-- column for the username and the profile photo --><div class=" p-2 flex-column justify-content-center " id="user_pic_and_name"><div class="p-1 d-flex justify-content-left image_wrapper" id="user_profile_page_image"><form id = "image_upload_form" name = "image_upload_form"><img id="profile_img_edit_profile_page" ' + display_profile_image(posts[0].ProfileImg) + ' class="profile_image rounded-circle border img-responsive shadow-sm visible" loading=" lazy" /><input type = "file" id = "edit_profile_img" onchange = "show_image(this)" name = "edit_profile_img" style = "opacity:0;"></form> </div> <div class="p-1 d-flex flex-column" > <div class = "flex-row d-flex align-items-top"> <strong class="user_profile_page_name edit_data"></strong><i class="fa fa-pencil  edit_profile_icon" id = "edit_username" style = "margin-left:5px; padding-top:5px;"></i></div> <div class = "flex-row d-flex"><span class = "update_response" id = "username_response"></span></div></div></div><!-- column for the institution, designation and specialty--><div class="p-2 flex-column justify-content-center flex-fill mr-auto mr-right"><div class="p-1 d-flex " ><strong> Institution: </strong><span class="user_profile_page_institution edit_data" style = "margin-left: 5px"></span><i class="fa fa-pencil  edit_profile_icon" style = "margin-left:5px; padding-top:5px;" id = "edit_institution"></i></div><div class="p-1 d-flex " ><strong> Designation: </strong><span class="user_profile_page_designation edit_data" style = "margin-left: 5px"></span><i class="fa fa-pencil  edit_profile_icon" style = "margin-left:5px; padding-top:5px;" id = "edit_designation"></i></div><div class="p-1 d-flex " > <strong>Specialty: </strong><span class="user_profile_page_specialty edit_data" style = "margin-left: 5px"></span><i class="fa fa-pencil  edit_profile_icon" style = "margin-left:5px; padding-top:5px;" id = "edit_specialty"></i> </div> <div class="p-1 d-flex "> <strong class = "d-flex flex-shrink">Change Password </strong><span class=" user_profile_page_password edit_data" style="margin-left: 5px"></span><i class="fa fa-pencil  edit_profile_icon" style="margin-left:5px; padding-top:5px;" id="edit_password"></i> </div> <div class = "p-1 d-flex align-items-end "><button class = "p-1 ml-auto flex-shrink" id = "save_changes">save changes</button></div> </div> </div>');

                        $('#save_changes').css({
                            "visibility": "hidden"
                        });

                        $('#profile_img_edit_profile_page').change(function() {
                            $('#save_changes').css({
                                "visibility": "visible"
                            });
                        })

                        $('.user_profile_page_name').html(username);

                        // $('.user_profile_page_email').html(posts[0].Email);

                        $('.user_profile_page_institution').html(posts[0].Institution);

                        $('.user_profile_page_designation').html(posts[0].Designation);

                        $('.user_profile_page_specialty').html(posts[0].Specialty);


                        $('#edit_profile_modal').modal('show');

                        $('#edit_username').click(function() {
                            $('.user_profile_page_name').html('<input id = "username_update" style = "width:8em;" type = "text" value = "' + username + '" onblur = "show_old_value(\'user_profile_page_name\', this.value)" onchange = "setnewvalue(this.value, \'user_profile_page_name\')">')
                            $('#username_update').focus();

                            $('#username_response').html('');

                        })

                        $('#edit_institution').click(function() {
                            $('.user_profile_page_institution').html('<select class="form-control-sm update_profile_select" id="institution_select" style = "width:8em;" name=\'institution\' required="" onblur = "show_old_value(\'user_profile_page_institution\', this.value)" onchange = "setnewvalue(this.value, \'user_profile_page_institution\')"><option class="form-control-sm" value="" disable selected>' + posts[0].Institution + '</option><option class="form-control-sm" value=\'Pwani University\'>Pwani University</option><option class="form-control-sm" value=\'Jomo Kenyatta University of Agriculture and Technology\'>Jomo Kenyatta University of Agriculture and Technology</option><option class="form-control-sm" value=\'Kenyatta University\'>Kenyatta University</option></select>')
                            $('#institution_select').focus();
                        })

                        $('#edit_designation').click(function() {
                            $('.user_profile_page_designation').html('<select class="form-control-sm update_profile_select" id="designation_select" name=\'designation\'required="" style = "width:8em;" onblur = "show_old_value(\'user_profile_page_designation\', this.value)" onchange = "setnewvalue(this.value, \'user_profile_page_designation\')"><option class="form-control-sm" value="" disable selected>' + posts[0].Designation + '</option><option class="form-control-sm" value=\'Undergraduate Student\'>Undergraduate Student</option><option class="form-control-sm" value=\'Graduate Student\'>Graduate Student</option><option class="form-control-sm" value=\'Lecturer\'>Lecturer/Researcher</option></select>')
                            $('#designation_select').focus();
                        })

                        $('#edit_specialty').click(function() {
                            $('.user_profile_page_specialty').html('<input id = "user_specialty_update" style = "width:8em;" type = "text" value = "' + posts[0].Specialty + '" onblur = "show_old_value(\'user_profile_page_specialty\', this.value)" onchange = "setnewvalue(this.value, \'user_profile_page_specialty\')">')
                            $('#user_specialty_update').focus();
                        })

                        $('#edit_password').click(function() {
                            $('.user_profile_page_password').html('<input class = "d-flex edit_password form-control-sm user_profile_page_password_1" id = "user_password_update_1" style = "width:8em;" placeholder = "enter new password" type = "password" value = "' + posts[0].Password + '" onblur = "show_old_value(\'user_profile_page_password_1\', this.value)" onchange = "setnewvalue(this.value, \'user_profile_page_password_1\')"><input class = "d-flex edit_password form-control-sm user_profile_page_password_2" id = "user_password_update_2" style = "width:8em;" placeholder = "confirm password" type = "password" value = "' + posts[0].Password + '" onblur = "show_old_value(\'user_profile_page_password_2\', this.value)" onchange = "setnewvalue(this.value, \'user_profile_page_password_2\')"><span class = "update_response" id = "password_response"></span>')
                            $('#user_password_update_1').focus();
                        })

                        $('#profile_img_edit_profile_page').on('change', function() {
                            $('.profile_image').css({
                                "width": "600px",
                                "height": "600px"
                            });
                        })

                        $('#save_changes').click(function() {

                            var update = true;

                            if (window.localStorage.getItem('user_profile_page_name')) {
                                var username_update = window.localStorage.getItem('user_profile_page_name');
                                localStorage.removeItem('user_profile_page_name');
                            } else {
                                var username_update = $('.user_profile_page_name').text();
                            }

                            if (window.localStorage.getItem('user_profile_page_institution')) {
                                var institution = window.localStorage.getItem('user_profile_page_institution');
                                localStorage.removeItem('user_profile_page_institution');
                            } else {
                                var institution = $('.user_profile_page_institution').text();
                            }

                            if (window.localStorage.getItem('user_profile_page_designation')) {
                                var designation = window.localStorage.getItem('user_profile_page_designation');
                                localStorage.removeItem('user_profile_page_designation');
                            } else {
                                var designation = $('.user_profile_page_designation').text();
                            }

                            if (window.localStorage.getItem('user_profile_page_password_1')) {

                                if (window.localStorage.getItem('user_profile_page_password_1') != "") {
                                    if (window.localStorage.getItem('user_profile_page_password_2')) {

                                        if (window.localStorage.getItem('user_profile_page_password_1') == window.localStorage.getItem('user_profile_page_password_2')) {
                                            //if entered passwords match
                                            var password = window.localStorage.getItem('user_profile_page_password_1')
                                            localStorage.removeItem('user_profile_page_password_1')
                                            localStorage.removeItem('user_profile_page_password_2')
                                        } else {
                                            //if entered passwords don't match
                                            $('#password_response').html('<i class = "fa fa-times"></i>the passwords dont match.');

                                            var update = false;
                                        }
                                    } else {
                                        //if password confirmation hasn't been entered
                                        $('#password_response').html('<i class = "fa fa-times"></i>enter the confirmation password.');

                                        $('#user_password_update_2').focus();

                                        var update = false;

                                    }
                                } else {
                                    //if entered password is an empty string
                                    $('#password_response').html('<i class = "fa fa-times"></i>password cannot be empty.');

                                    $('#user_password_update_2').focus();

                                    var update = false;
                                }

                            } else {
                                //if password isn't changed
                                var password = posts[0].Password;
                            }

                            if (window.localStorage.getItem('user_profile_page_specialty')) {
                                var specialty = window.localStorage.getItem('user_profile_page_specialty');

                                localStorage.removeItem('user_profile_page_specialty');
                            } else {
                                var specialty = $('.user_profile_page_specialty').text();
                            }


                            if (update) {
                                $.ajax({
                                    method: "POST",
                                    url: "REST_api/update_profile",
                                    processData: false,
                                    contentType: "application/json",
                                    data: '{"username": "' + username_update + '", "institution": "' + institution + '",  "designation": "' + designation + '", "specialty": "' + specialty + '", "password": "' + password + '"}',
                                    success: function(r) {
                                        var status = JSON.parse(r);

                                        if (status.username == "taken") {
                                            //code for if username is taken
                                            $('#username_response').html('<i class = "fa fa-times"></i>sorry, that username is taken.');
                                        } else if (status.user == "updated") {
                                            alert('changes saved')
                                            $('#save_changes').html('');
                                            window.location.href = "profile1.php?username=" + username_update;
                                        }
                                    },
                                    error: function(r) {
                                        console.log(r)
                                    }
                                })
                            }

                            var file_data = $('#edit_profile_img').prop('files')[0];

                            if (file_data) {
                                var form_data = new FormData();
                                form_data.append('file', file_data);
                                alert(form_data)
                                $.ajax({
                                    method: 'POST',
                                    url: 'REST_api/profile_image?id=' + posts[0].ProfileOwnerId,
                                    processData: false,
                                    dataType: 'text',
                                    cache: 'false',
                                    contentType: false,
                                    data: form_data,
                                    success: function(php_script_response) {
                                        alert(php_script_response)
                                    }
                                })
                            }

                        })

                        // $('#user_profile_page_image').click(function () {
                        //     $('#edit_profile_img').click()
                        // })
                    })

                    console.log(r, username);

                    //handler for displaying profile posts
                    for (let index = 1; index < posts.length; index++) {

                        if (posts[index].Shared) {
                            $('#tab-1').html(
                                $('#tab-1').html() + '<div><small id="shared_by" onclick = "window.location.href = \'profile1.php?username=' + username + '\'">' + username + ' rePosted</small></div><div class="conatiner d-flex flex-row " id="timeline_posts"style="scroll-padding-left: 10px;"><div class="p-1 flex-column " id="tl_profile_img_container"> <img ' + display_profile_image(posts[index].PostedByImg) + ' class= "profile_image rounded-circle border img-responsive shadow-sm visible" id = "profile_img_tl' + index + '" loading = "lazy" > </div > <div class="p-1 flex-fill "> <div class="d-flex p-0 "> <table> <tr> <td colspan="2"><span><strong onclick = "window.location.href = \'profile1.php?username=' + posts[index].PostedByName + '\'">' + posts[index].PostedByName + '</strong>  ∙  ' + posts[index].PostedByDesignation + ' ∙ ' + time_conversion(posts[index].PostedAt) + '</tr><tr><td>' + posts[index].PostedByInstitution + '</span></td></tr></table><div class="three_dots ml-auto ml-left"><div class="dropdown p-1  "><button class="fa fa-chevron-down post_options_btn drop" type="button" data-toggle="dropdown"id="dropdownMenuButton" aria-haspopup="true" aria-expanded="false"></button><div class="dropdown-menu dropdown-menu-right options_dropdown_menu" aria-labelledby="dropdownMenuButton" data-shared_post_options = "' + posts[index].PostId + '"></div></div></div></div><div class="d-flex p-0 "><div class="p-1 " id="tl_post_topic"><small> ' + posts[index].PostTopic + ' </small></div><div class="p-1 " id="tl_post_type"><small>' + posts[index].PostType + '</small></div> </div> <div class="p-0 "  id = "' + posts[index].PostId + '"><span>' + posts[index].PostBody + '</span><div data-post_files = "' + posts[index].PostId + '"></div><div class="d-flex p-1  flex-fill justify-content-around"><div class="p-1 "><button class="post_icon" id="like_btn" data-id="' + posts[index].PostId + '"><i class="fa fa-check-square-o"></i><span><small>  ' + posts[index].PostLikes + '</small></span></button></div><div class="p-1 "><button class="post_icon" id="comment_btn" data-post_id="' + posts[index].PostId + '"><i class="fa fa-comment-o"></i><span ><small>  ' + posts[index].PostComments + '</small></span></button></div><div class="p-1 "><button class="post_icon" id="share_btn" data-share_post_id = "' + posts[index].PostId + '"><i class="fa fa-share-alt"></i><span><small>  ' + posts[index].PostShares + '</small></span></button></div></div></div></div></div>'
                            );

                            //handler for the dropdown menu display
                            if (posts[0].LoggedInId == posts[index].PostedById) {
                                $('[data-shared_post_options = "' + posts[index].PostId + '"]').html(
                                    $('[data-shared_post_options = "' + posts[index].PostId + '"]').html() + '<button class="dropdown-item tl_post_options" data-delete_post = "' + posts[index].PostId + '">Delete</button>'
                                )
                            } else {
                                $('[data-shared_post_options = "' + posts[index].PostId + '"]').html(
                                    $('[data-shared_post_options = "' + posts[index].PostId + '"]').html() + '<button class="dropdown-item tl_post_options" data-report_post = "' + posts[index].PostId + '">Report</button>'
                                )
                            }
                        } else {
                            $('#tab-1').html(
                                $('#tab-1').html() + '<div class="conatiner d-flex flex-row " id="timeline_posts"style="scroll-padding-left: 10px;"><div class="p-1 flex-column " id="tl_profile_img_container"> <img ' + display_profile_image(posts[index].PostedByImg) + ' class= "profile_image rounded-circle border img-responsive shadow-sm visible" id = "profile_img_tl' + index + '" loading = "lazy" > </div > <div class="p-1 flex-fill post_body_container"> <div class="d-flex p-0 "> <table> <tr> <td colspan="2"><span><strong onclick = "window.location.href = \'profile1.php?username=' + posts[index].PostedByName + '\'">' + posts[index].PostedByName + '</strong>  ∙  ' + posts[index].PostedByDesignation + ' ∙ ' + time_conversion(posts[index].PostedAt) + '</tr><tr><td>' + posts[index].PostedByInstitution + '</span></td></tr></table><div class="three_dots ml-auto ml-left "><div class="dropdown p-1 "><button class="fa fa-chevron-down post_options_btn drop" type="button" data-toggle="dropdown"id="dropdownMenuButton" aria-haspopup="true" aria-expanded="false"></button><div class="dropdown-menu dropdown-menu-right options_dropdown_menu" aria-labelledby="dropdownMenuButton" data-post_options = "' + posts[index].PostId + '"></div></div></div></div><div class="d-flex p-0 "><div class="p-1 " id="tl_post_topic"><small> ' + posts[index].PostTopic + ' </small></div><div class="p-1 " id="tl_post_type"><small>' + posts[index].PostType + '</small></div> </div> <div class="p-0 "  id = "' + posts[index].PostId + '"><span>' + posts[index].PostBody + '</span><div data-post_files = "' + posts[index].PostId + '"></div><div class="d-flex p-1  flex-fill justify-content-around"><div class="p-1 "><button class="post_icon" id="like_btn" data-id="' + posts[index].PostId + '"><i class="fa fa-check-square-o " ></i><span><small>  ' + posts[index].PostLikes + '</small></span></button></div><div class="p-1 "><button class="post_icon" id="comment_btn" data-post_id="' + posts[index].PostId + '"><i class="fa fa-comment-o " ></i><span><small>  ' + posts[index].PostComments + '</small></span></button></div><div class="p-1 "><button class="post_icon"><button class="post_icon" id="share_btn" data-share_post_id = "' + posts[index].PostId + '"><i class="fa fa-share-alt " ></i><span><small>  ' + posts[index].PostShares + '</small></span></button></div></div></div></div></div>'
                            );

                            //to set the display of the questions tab
                            if (posts[index].PostType == "question") {
                                $('#tab-2').html(
                                    $('#tab-2').html() + '<div class="conatiner d-flex flex-row " id="timeline_posts"style="scroll-padding-left: 10px;"><div class="p-1 flex-column " id="tl_profile_img_container"> <img ' + display_profile_image(posts[index].PostedByImg) + ' class= "profile_image rounded-circle border img-responsive shadow-sm visible" id = "profile_img_tl' + index + '" loading = "lazy" > </div > <div class="p-1 flex-fill post_body_container"> <div class="d-flex p-0 "> <table> <tr> <td colspan="2"><strong onclick = "window.location.href = \'profile1.php?username=' + posts[index].PostedByName + '\'">' + posts[index].PostedByName + '</strong>  ∙  ' + posts[index].PostedByDesignation + ' ∙ ' + time_conversion(posts[index].PostedAt) + '</tr><tr><td>' + posts[index].PostedByInstitution + '</td></tr></table><div class="three_dots ml-auto ml-left "><div class="dropdown p-1 "><button class="fa fa-chevron-down post_options_btn drop" type="button" data-toggle="dropdown"id="dropdownMenuButton" aria-haspopup="true" aria-expanded="false"></button><div class="dropdown-menu dropdown-menu-right options_dropdown_menu" aria-labelledby="dropdownMenuButton" data-post_options = "' + posts[index].PostId + '"></div></div></div></div><div class="d-flex p-0 "><div class="p-1 " id="tl_post_topic"><small> ' + posts[index].PostTopic + ' </small></div><div class="p-1 " id="tl_post_type"><small>' + posts[index].PostType + '</small></div> </div> <div class="p-0 "  id = "' + posts[index].PostId + '"><span>' + posts[index].PostBody + '</span><div data-question_post_files = "' + posts[index].PostId + '"></div><div class="d-flex p-1  flex-fill justify-content-around"><div class="p-1 "><button class="post_icon" id="like_btn" data-id="' + posts[index].PostId + '"><i class="fa fa-check-square-o " ></i><span><small>  ' + posts[index].PostLikes + '</small></span></button></div><div class="p-1 "><button class="post_icon" id="comment_btn" data-post_id="' + posts[index].PostId + '"><i class="fa fa-comment-o " ></i><span><small>  ' + posts[index].PostComments + '</small></span></button></div><div class="p-1 "><button class="post_icon"><button class="post_icon" id="share_btn" data-share_post_id = "' + posts[index].PostId + '"><i class="fa fa-share-alt " ></i><span><small>  ' + posts[index].PostShares + '</small></span></button></div></div></div></div></div>'
                                );

                                //ajax call for files attached to a post
                                file_finder('question_post_files', posts[index].PostId);

                            } else if (posts[index].PostType == "discussion") {
                                $('#tab-3').html(
                                    $('#tab-3').html() + '<div class="conatiner d-flex flex-row " id="timeline_posts"style="scroll-padding-left: 10px;"><div class="p-1 flex-column " id="tl_profile_img_container"> <img ' + display_profile_image(posts[index].PostedByImg) + ' class= "profile_image rounded-circle border img-responsive shadow-sm visible" id = "profile_img_tl' + index + '" loading = "lazy" > </div > <div class="p-1 flex-fill post_body_container"> <div class="d-flex p-0 "> <table> <tr> <td colspan="2"><strong onclick = "window.location.href = \'profile1.php?username=' + posts[index].PostedByName + '\'">' + posts[index].PostedByName + '</strong>  ∙  ' + posts[index].PostedByDesignation + ' ∙ ' + time_conversion(posts[index].PostedAt) + '</tr><tr><td>' + posts[index].PostedByInstitution + '</td></tr></table><div class="three_dots ml-auto ml-left "><div class="dropdown p-1 "><button class="fa fa-chevron-down post_options_btn drop" type="button" data-toggle="dropdown"id="dropdownMenuButton" aria-haspopup="true" aria-expanded="false"></button><div class="dropdown-menu dropdown-menu-right options_dropdown_menu" aria-labelledby="dropdownMenuButton" data-post_options = "' + posts[index].PostId + '"></div></div></div></div><div class="d-flex p-0 "><div class="p-1 " id="tl_post_topic"><small> ' + posts[index].PostTopic + ' </small></div><div class="p-1 " id="tl_post_type"><small>' + posts[index].PostType + '</small></div> </div> <div class="p-0 "  id = "' + posts[index].PostId + '"><span>' + posts[index].PostBody + '</span><div data-discussion_post_files = "' + posts[index].PostId + '"></div><div class="d-flex p-1  flex-fill justify-content-around"><div class="p-1 "><button class="post_icon" id="like_btn" data-id="' + posts[index].PostId + '"><i class="fa fa-check-square-o " ></i><span><small>  ' + posts[index].PostLikes + '</small></span></button></div><div class="p-1 "><button class="post_icon" id="comment_btn" data-post_id="' + posts[index].PostId + '"><i class="fa fa-comment-o " ></i><span><small>  ' + posts[index].PostComments + '</small></span></button></div><div class="p-1 "><button class="post_icon"><button class="post_icon" id="share_btn" data-share_post_id = "' + posts[index].PostId + '"><i class="fa fa-share-alt " ></i><span><small>  ' + posts[index].PostShares + '</small></span></button></div></div></div></div></div>'
                                );

                                //ajax call for files attached to a post
                                file_finder('discussion_post_files', posts[index].PostId);

                            } else if (posts[index].PostType == "publication") {
                                $('#tab-4').html(
                                    $('#tab-4').html() + '<div class="conatiner d-flex flex-row " id="timeline_posts"style="scroll-padding-left: 10px;"><div class="p-1 flex-column " id="tl_profile_img_container"> <img ' + display_profile_image(posts[index].PostedByImg) + ' class= "profile_image rounded-circle border img-responsive shadow-sm visible" id = "profile_img_tl' + index + '" loading = "lazy" > </div > <div class="p-1 flex-fill post_body_container"> <div class="d-flex p-0 "> <table> <tr> <td colspan="2"><strong onclick = "window.location.href = \'profile1.php?username=' + posts[index].PostedByName + '\'">' + posts[index].PostedByName + '</strong>  ∙  ' + posts[index].PostedByDesignation + ' ∙ ' + time_conversion(posts[index].PostedAt) + '</tr><tr><td>' + posts[index].PostedByInstitution + '</td></tr></table><div class="three_dots ml-auto ml-left "><div class="dropdown p-1 "><button class="fa fa-chevron-down post_options_btn drop" type="button" data-toggle="dropdown"id="dropdownMenuButton" aria-haspopup="true" aria-expanded="false"></button><div class="dropdown-menu dropdown-menu-right options_dropdown_menu" aria-labelledby="dropdownMenuButton" data-post_options = "' + posts[index].PostId + '"></div></div></div></div><div class="d-flex p-0 "><div class="p-1 " id="tl_post_topic"><small> ' + posts[index].PostTopic + ' </small></div><div class="p-1 " id="tl_post_type"><small>' + posts[index].PostType + '</small></div> </div> <div class="p-0 "  id = "' + posts[index].PostId + '"><span>' + posts[index].PostBody + '</span><div data-publication_post_files = "' + posts[index].PostId + '"></div><div class="d-flex p-1  flex-fill justify-content-around"><div class="p-1 "><button class="post_icon" id="like_btn" data-id="' + posts[index].PostId + '"><i class="fa fa-check-square-o " ></i><span><small>  ' + posts[index].PostLikes + '</small></span></button></div><div class="p-1 "><button class="post_icon" id="comment_btn" data-post_id="' + posts[index].PostId + '"><i class="fa fa-comment-o " ></i><span><small>  ' + posts[index].PostComments + '</small></span></button></div><div class="p-1 "><button class="post_icon"><button class="post_icon" id="share_btn" data-share_post_id = "' + posts[index].PostId + '"><i class="fa fa-share-alt " ></i><span><small>  ' + posts[index].PostShares + '</small></span></button></div></div></div></div></div>'
                                );

                                //ajax call for files attached to a post
                                file_finder('publication_post_files', posts[index].PostId);
                            }

                            //handler for the dropdown menu display
                            if (posts[0].LoggedInId == posts[index].PostedById) {
                                $('[data-post_options = "' + posts[index].PostId + '"]').html(
                                    $('[data-post_options = "' + posts[index].PostId + '"]').html() + '<button class="dropdown-item tl_post_options" data-delete_post = "' + posts[index].PostId + '">Delete</button>'
                                )
                            } else {
                                $('[data-post_options = "' + posts[index].PostId + '"]').html(
                                    $('[data-post_options = "' + posts[index].PostId + '"]').html() + '<button class="dropdown-item tl_post_options" data-report_post = "' + posts[index].PostId + '">Report</button>'
                                )
                            }
                        }

                        //ajax call for files attached to a post
                        file_finder('post_files', posts[index].PostId);

                        //set the like button to green if the logged in user has liked the post
                        if (posts[index].PostIsLiked) {
                            $("[data-id='" + posts[index].PostId + "']").css("color", "limegreen");
                        }

                        //set the share button to green if the logged in user has liked that post
                        if (posts[index].PostIsShared) {
                            $("[data-share_post_id='" + posts[index].PostId + "']").css("color", "limegreen");
                        }


                    }

                    //handler for deleting posts
                    $('[data-delete_post]').click(function() {

                        var post_id = $(this).attr('data-delete_post');

                        delete_post(post_id);

                    });

                    //handler for reporting a post
                    $('[data-report_post]').click(function() {

                        var post_id = $(this).attr('data-report_post');

                        report_post(post_id);
                    })

                    //ajax handler for displaying comments
                    $('[data-post_id]').click(function() {
                        var button_id = $(this).attr('data-post_id');

                        get_comments(button_id, posts[0].LoggedInId);
                    })

                    // ajax handler for liking
                    $('[data-id]').click(function() {

                        var button_id = $(this).attr('data-id');

                        like_post(button_id);

                    })

                    //ajax handler for sharing a post
                    $('[data-share_post_id]').click(function() {

                        var button_id = $(this).attr('data-share_post_id');

                        rePost_post(button_id);
                    })

                    scrollToAnchor(location.hash);

                    // $(function () {
                    //     $('.list-group-item').click(function () {
                    //         $('#search_modal').modal('hide');
                    //     });
                    // });

                },
                error: function(r_t) {
                    console.log(r_t)
                }

            });
        })

        function create_post_modal() {
            $('#new_post_modal').modal('show');
        }

        $(function() {
            var subjects = [];

            <?php
            $subjects = DB::query('SELECT topic_name from topics');

            foreach ($subjects as $subject) {
                # code...
                echo "subjects = subjects.concat(['" . $subject['topic_name'] . "']);";
            }
            ?>
            $('#post_topic').autocomplete({
                source: subjects
            });
        });
    </script>
</body>

</html>