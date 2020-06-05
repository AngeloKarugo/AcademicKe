$('#timeline_icon').click(function () {
    window.location.href = 'index.html';
});

$('#notifications_icon').click(function () {
    window.location.href = "notifications.html";
});

$(document).on('click', '.options_dropdown_menu', function (e) {
    e.stopPropagation();
});

$.ajax({
    method: "GET",
    url: "REST_api/user",
    processData: false,
    contentType: "application/json",
    data: '',
    success: function (r) {
        var details = JSON.parse(r)

        if (details.Status == "Good") {
            $('#username_page_top').text(details.Username);

            if (details.ProfileImg) {
                $('#profile_img_navbar').attr("src", '' + details.ProfileImg + '');
            }

            var user_id = details.UserId;

            $('#profile_icon').click(function () {
                window.location.href = 'profile1.php?username=' + details.Username + ''
            })

            //handler for logout button
            $('#log_out_button').click(function () {
                logout();
            })

            $(document).ready(function () {
                //ajax handler for displaying timeline posts
                $.ajax({

                    method: "GET",
                    url: "REST_api/timeline",
                    processData: false,
                    contentType: "application/json",
                    data: '',
                    success: function (r) {

                        var posts = JSON.parse(r);

                        // var username = user_idme;

                        // if (user_ideImg) {
                        //     $('#profile_img_navbar').attr('src', '' + user_ideImg + '')
                        // }

                        // document.getElementById('username_page_top').innerHTML = username;



                        // console.log(r, username);

                        if (posts.length > 1) {
                            count_tl = 0;
                            count_tp = 0;

                            $.each(posts, function (index) {

                                // console.log(time_conversion(posts[index].PostedAt));

                                // posts[index].PostedAt = time_conversion(posts[index].PostedAt);

                                // console.log(posts[index].Category);

                                // console.log("log test");



                                if (posts[index].Category == "timeline") {



                                    count_tl++;

                                    if (posts[index].SharedByName.length > 0) {

                                        // console.log("shared: " + posts[index].PostBody + posts[index].SharedByName);

                                        $('#tab-1').html(
                                            $('#tab-1').html() + '<div id="shared_by" onclick = "window.location.href = \'profile1.php?username=' + posts[index].SharedByName + '\'"><small>' + posts[index].SharedByName + ' rePosted</small></div><div class="conatiner d-flex flex-row" id="timeline_posts"style="scroll-padding-left: 10px;"><div class="p-1 flex-column" id="tl_profile_img_container"> <img ' + display_profile_image(posts[index].PostedByImg) + ' class= "profile_image rounded-circle border img-responsive shadow-sm visible" id = "profile_img_tl' + index + '" loading = "lazy" > </div > <div class="p-1 flex-fill post_body_container"> <div class="d-flex p-0"> <table> <tr> <td colspan="2"><strong onclick = "window.location.href = \'profile1.php?username=' + posts[index].PostedByName + '\'">' + posts[index].PostedByName + '</strong>  ∙  ' + posts[index].PostedByDesignation + ' ∙ ' + time_conversion(posts[index].PostedAt) + '</td></tr><tr><td>' + posts[index].PostedByInstitution + '</td></tr></table><div class="three_dots ml-auto ml-left"><div class="dropdown p-1  "><button class="fa fa-chevron-down post_options_btn drop" type="button" data-toggle="dropdown"id="dropdownMenuButton" aria-haspopup="true" aria-expanded="false"></button><div class="dropdown-menu dropdown-menu-right options_dropdown_menu" aria-labelledby="dropdownMenuButton" data-shared_post_options = "' + posts[index].PostId + '"></div></div></div></div><div class="d-flex p-0"><div class="p-1" id="tl_post_topic"><small> ' + posts[index].PostTopic + ' </small></div><div class="p-1" id="tl_post_type"><small>' + posts[index].PostType + '</small></div> </div> <div class="p-0"><span>' + posts[index].PostBody + '</span><div data-post_files = "' + posts[index].PostId + '"></div><div class="d-flex p-1 flex-fill justify-content-around"><div class="p-1"><button class="post_icon" id="like_btn" data-id="' + posts[index].PostId + '"><i class="fa fa-check-square-o"></i><span><small>  ' + posts[index].PostLikes + '</small></span></button></div><div class="p-1"><button class="post_icon" id="comment_btn" data-post_id="' + posts[index].PostId + '"><i class="fa fa-comment-o"></i><span ><small>  ' + posts[index].PostComments + '</small></span></button></div><div class="p-1"><button class="post_icon" id="share_btn" data-share_post_id = "' + posts[index].PostId + '"><i class="fa fa-share-alt"></i><span><small>  ' + posts[index].PostShares + '</small></span></button></div></div></div></div></div>'
                                        )

                                        //handler for the dropdown menu display
                                        if (user_id == posts[index].PostedById) {
                                            $('[data-shared_post_options = "' + posts[index].PostId + '"]').html(
                                                $('[data-shared_post_options = "' + posts[index].PostId + '"]').html() + '<button class="dropdown-item tl_post_options" data-delete_post = "' + posts[index].PostId + '">Delete</button>'
                                            )
                                        } else {
                                            $('[data-shared_post_options = "' + posts[index].PostId + '"]').html(
                                                $('[data-shared_post_options = "' + posts[index].PostId + '"]').html() + '<button class="dropdown-item tl_post_options" data-report_post = "' + posts[index].PostId + '">Report</button>'
                                            )
                                        }

                                    } else {

                                        // console.log("unshared: " + posts[index].PostBody + posts[index].PostedByName);

                                        $('#tab-1').html(
                                            $('#tab-1').html() + '<div class="conatiner d-flex flex-row" id="timeline_posts"style="scroll-padding-left: 10px;" data-post_id_container = "' + posts[index].PostId + '"><div class="p-1 flex-column" id="tl_profile_img_container"> <img ' + display_profile_image(posts[index].PostedByImg) + ' class= "profile_image rounded-circle border img-responsive shadow-sm visible" id = "profile_img_tl' + index + '" loading = "lazy" > </div > <div class="p-1 flex-fill post_body_container"> <div class="d-flex p-0"> <table> <tr> <td colspan="2"><strong onclick = "window.location.href = \'profile1.php?username=' + posts[index].PostedByName + '\'">' + posts[index].PostedByName + '</strong>  ∙  ' + posts[index].PostedByDesignation + ' ∙ ' + time_conversion(posts[index].PostedAt) + '</tr><tr><td>' + posts[index].PostedByInstitution + '</td></tr></table><div class="three_dots ml-auto ml-left "><div class="dropdown p-1 "><button class="fa fa-chevron-down post_options_btn drop" type="button" data-toggle="dropdown"id="dropdownMenuButton" aria-haspopup="true" aria-expanded="false"></button><div class="dropdown-menu dropdown-menu-right options_dropdown_menu" aria-labelledby="dropdownMenuButton" data-post_options = "' + posts[index].PostId + '"></div></div></div></div><div class="d-flex p-0"><div class="p-1" id="tl_post_topic"><small> ' + posts[index].PostTopic + ' </small></div><div class="p-1" id="tl_post_type"><small>' + posts[index].PostType + '</small></div> </div> <div class="p-0"><span>' + posts[index].PostBody + '</span><div data-post_files = "' + posts[index].PostId + '"></div><div class="d-flex p-1 flex-fill justify-content-around"><div class="p-1"><button class="post_icon" id="like_btn" data-id="' + posts[index].PostId + '"><i class="fa fa-check-square-o " ></i><span><small>  ' + posts[index].PostLikes + '</small></span></button></div><div class="p-1"><button class="post_icon" id="comment_btn" data-post_id="' + posts[index].PostId + '"><i class="fa fa-comment-o " ></i><span><small>  ' + posts[index].PostComments + '</small></span></button></div><div class="p-1"><button class="post_icon"><button class="post_icon" id="share_btn" data-share_post_id = "' + posts[index].PostId + '"><i class="fa fa-share-alt " ></i><span><small>  ' + posts[index].PostShares + '</small></span></button></div></div></div></div></div>'
                                        );

                                        //handler for the dropdown menu display
                                        if (user_id == posts[index].PostedById) {
                                            $('[data-post_options = "' + posts[index].PostId + '"]').html(
                                                $('[data-post_options = "' + posts[index].PostId + '"]').html() + '<button class="dropdown-item tl_post_options" data-delete_post = "' + posts[index].PostId + '">Delete</button>'
                                            )
                                        } else {
                                            $('[data-post_options = "' + posts[index].PostId + '"]').html(
                                                $('[data-post_options = "' + posts[index].PostId + '"]').html() + '<button class="dropdown-item tl_post_options" data-report_post = "' + posts[index].PostId + '">Report</button>'
                                            )
                                        }
                                    }
                                    file_finder('post_files', posts[index].PostId);
                                } else {

                                    // console.log("subject in tab 1: " + posts[index].PostBody + posts[index].PostedByName);
                                    count_tp++;

                                    $('#tab-2').html(
                                        $('#tab-2').html() + '<div class="conatiner d-flex flex-row" id="timeline_posts"style="scroll-padding-left: 10px;"><div class="p-1 flex-column" id="tl_profile_img_container"> <img ' + display_profile_image(posts[index].PostedByImg) + ' class= "profile_image rounded-circle border img-responsive shadow-sm visible" id = "profile_img_tl' + index + '" loading = "lazy" > </div > <div class="p-1 flex-fill post_body_container"> <div class="d-flex p-0"> <table> <tr> <td colspan="2"><strong onclick = "window.location.href = \'profile1.php?username=' + posts[index].PostedByName + '\'">' + posts[index].PostedByName + '</strong>  ∙  ' + posts[index].PostedByDesignation + ' ∙ ' + time_conversion(posts[index].PostedAt) + '</tr><tr><td>' + posts[index].PostedByInstitution + '</td></tr></table><div class="three_dots ml-auto ml-left "><div class="dropdown p-1 "><button class="fa fa-chevron-down post_options_btn drop" type="button" data-toggle="dropdown"id="dropdownMenuButton" aria-haspopup="true" aria-expanded="false"></button><div class="dropdown-menu dropdown-menu-right options_dropdown_menu" aria-labelledby="dropdownMenuButton" data-post_options = "' + posts[index].PostId + '"></div></div></div></div><div class="d-flex p-0"><div class="p-1" id="tl_post_topic"><small> ' + posts[index].PostTopic + ' </small></div><div class="p-1" id="tl_post_type"><small>' + posts[index].PostType + '</small></div> </div> <div class="p-0"><span>' + posts[index].PostBody + '</span><div data-topic_post_files = "' + posts[index].PostId + '"></div><div class="d-flex p-1 flex-fill justify-content-around"><div class="p-1"><button class="post_icon" id="like_btn" data-id="' + posts[index].PostId + '"><i class="fa fa-check-square-o " ></i><span><small>  ' + posts[index].PostLikes + '</small></span></button></div><div class="p-1"><button class="post_icon" id="comment_btn" data-post_id="' + posts[index].PostId + '"><i class="fa fa-comment-o " ></i><span><small>  ' + posts[index].PostComments + '</small></span></button></div><div class="p-1"><button class="post_icon"><button class="post_icon" id="share_btn" data-share_post_id = "' + posts[index].PostId + '"><i class="fa fa-share-alt " ></i><span><small>  ' + posts[index].PostShares + '</small></span></button></div></div></div></div></div>'
                                    );

                                    file_finder('topic_post_files', posts[index].PostId);

                                    //handler for the dropdown menu display
                                    if (user_id == posts[index].PostedById) {
                                        $('[data-post_options = "' + posts[index].PostId + '"]').html(
                                            $('[data-post_options = "' + posts[index].PostId + '"]').html() + '<button class="dropdown-item tl_post_options" data-delete_post = "' + posts[index].PostId + '">Delete</button>'
                                        )
                                    } else {
                                        $('[data-post_options = "' + posts[index].PostId + '"]').html(
                                            $('[data-post_options = "' + posts[index].PostId + '"]').html() + '<button class="dropdown-item tl_post_options" data-report_post = "' + posts[index].PostId + '">Report</button>'
                                        )
                                    }
                                }

                                //set the share button to green if the user has liked that post
                                if (posts[index].PostIsShared) {
                                    $("[data-share_post_id='" + posts[index].PostId + "']").css("color", "limegreen");
                                }

                                //set the like button to green if the user has liked that post
                                if (posts[index].PostIsLiked) {
                                    $("[data-id='" + posts[index].PostId + "']").css("color", "limegreen");
                                }

                            })
                        }

                        console.log("timeline: " + count_tl);
                        console.log("topic: " + count_tp);

                        //handler for deleting posts
                        $('[data-delete_post]').click(function () {
                            var post_id = $(this).attr('data-delete_post');

                            delete_post(post_id);
                        })

                        //handler for reporting a post
                        $('[data-report_post]').click(function () {

                            var post_id = $(this).attr('data-report_post');

                            report_post(post_id);
                        })

                        $('[data-post_id_container]').click(function () {
                            var post_id = $(this).attr('data-data-post_id_container');

                            $('[data-post_id]').click();
                        })
                        //ajax handler for displaying comments
                        $('[data-post_id]').click(function () {
                            var button_id = $(this).attr('data-post_id');

                            get_comments(button_id, user_id);
                        })

                        // ajax handler for liking
                        $('[data-id]').click(function () {

                            var button_id = $(this).attr('data-id');

                            like_post(button_id);

                        })

                        //ajax handler for sharing a post
                        $('[data-share_post_id]').click(function () {

                            var button_id = $(this).attr('data-share_post_id');

                            rePost_post(button_id);
                        })
                    },
                    error: function (r) {
                        console.log(r)
                    }

                });



            })

        } else if (details.Status == "Deactivated") {
            alert(details.Status);
        } else if (details.Status == "Not logged in") {
            window.location.href = 'login.html';
        } else if (details.Status == "Admin") {
            window.location.href = 'admin_dashboard.html';
        }


    },
    error: function (r) {
        console.log(r);

    }
})



