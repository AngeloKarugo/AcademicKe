$(document).ready(function () {

    var subject = new Array;

    var subject = location.search.replace('?', '').split('=');

    subject = subject[1]

    subject = subject.replace('%20', ' ');

    console.log(subject);


    $('#subject_name').text(subject);

    $.ajax({
        method: "GET",
        url: "REST_api/user",
        processData: false,
        contentType: "application/json",
        data: '',
        success: function (r) {
            var details = JSON.parse(r);

            if (details.Status == "Good" || details.Status == "Deactivated") {

                //handler for logout button
                $('#log_out_button').click(function () {
                    logout();
                });

            } else if (details.Status == "Not logged in") {
                // window.location.href = 'login.html';
            } else if (details.Status == "Admin") {
                // window.location.href = 'admin_dashboard.html';
            }


        },
        error: function (r) {
            console.log(r);

        }
    });

    $.ajax({

        method: "GET",
        url: "REST_api/subject?subject=" + subject,
        processData: false,
        contentType: "application/json",
        data: '',
        success: function (r_t) {

            var posts = JSON.parse(r_t);

            // document.getElementById('username_page_top').innerHTML = r.Username;

            console.log(r_t);

            var username = posts[0].UserName;

            if (posts[0].UserImg) {
                $('#profile_img_navbar').attr('src', '' + posts[0].UserImg + '')
            }

            document.getElementById('username_page_top').innerHTML = username;

            $('#profile_icon').click(function () {
                window.location.href = 'profile1.php?username=' + username + ''
            })

            $('#timeline_icon').click(function () {
                window.location.href = 'index.html';
            })

            $('#notifications_icon').click(function () {
                window.location.href = "notifications.html";
            })

            if (posts[0].IsFollowing) {
                document.getElementById('subject_page_follow_btn').innerHTML = "Unfollow";
            } else {
                document.getElementById('subject_page_follow_btn').innerHTML = "Follow";
            }

            $('#subject_page_follow_btn').click(function () {
                $.ajax({
                    method: "GET",
                    url: "REST_api/user",
                    processData: false,
                    contentType: "application/json",
                    data: '',
                    success: function (r) {
                        var details = JSON.parse(r)

                        if (details.Status == "Good") {
                            $.ajax({
                                method: 'POST',
                                url: 'REST_api/follow',
                                processData: false,
                                contentType: 'application/json',
                                data: '{"UserId" : "", "SubjectId" : "", "SubjectName" : "' + subject + '"}',
                                success: function (r) {
                                    console.log(r);
                                    var is_following = JSON.parse(r)

                                    posts[0].IsFollowing = is_following.IsFollowing

                                    if (posts[0].IsFollowing) {
                                        document.getElementById('subject_page_follow_btn').innerHTML = "Unfollow";
                                    } else {
                                        document.getElementById('subject_page_follow_btn').innerHTML = "Follow";
                                    }
                                }
                            });

                        } else if (details.Status == "Deactivated") {
                            alert('Sorry, you are restricted from performing that action. Your account is deactivated. Contact site administration for more details.');
                        } else if (details.Status == "Not logged in") {
                            window.location.href = 'login.html';
                        } else if (details.Status == "Admin") {
                            // window.location.href = 'admin_dashboard.html';
                        }


                    },
                    error: function (r) {
                        console.log(r);

                    }
                });

            })

            //displaying posts on the selected subject
            for (let index = 1; index < posts.length; index++) {

                $('#tab-1').html(
                    $('#tab-1').html() + '<div class="conatiner d-flex flex-row " id="timeline_posts"style="scroll-padding-left: 10px;"><div class="p-1 flex-column " id="tl_profile_img_container"> <img ' + display_profile_image(posts[index].PostedByImg) + ' class= "profile_image rounded-circle border img-responsive shadow-sm visible" id = "profile_img_tl' + index + '" loading = "lazy" > </div > <div class="p-1 flex-fill post_body_container"> <div class="d-flex p-0 "> <table> <tr> <td colspan="2"><strong onclick = "window.location.href = \'profile1.php?username=' + posts[index].PostedByName + '\'">' + posts[index].PostedByName + '</strong>  ∙  ' + posts[index].PostedByDesignation + ' ∙ ' + time_conversion(posts[index].PostedAt) + '</tr><tr><td>' + posts[index].PostedByInstitution + '</td></tr></table><div class="three_dots ml-auto ml-left "><div class="dropdown p-1 "><button class="fa fa-chevron-down post_options_btn drop" type="button" data-toggle="dropdown"id="dropdownMenuButton" aria-haspopup="true" aria-expanded="false"></button><div class="dropdown-menu dropdown-menu-right options_dropdown_menu" aria-labelledby="dropdownMenuButton" data-post_options = "' + posts[index].PostId + '"></div></div></div></div><div class="d-flex p-0 "><div class="p-1 " id="tl_post_topic"><small> ' + posts[index].PostTopic + ' </small></div><div class="p-1 " id="tl_post_type"><small>' + posts[index].PostType + '</small></div> </div> <div class="p-0 "  id = "' + posts[index].PostId + '"><span>' + posts[index].PostBody + '</span><div data-post_files = "' + posts[index].PostId + '"></div><div class="d-flex p-1  flex-fill justify-content-around"><div class="p-1 "><button class="post_icon" id="like_btn" data-id="' + posts[index].PostId + '"><i class="fa fa-check-square-o " ></i><span><small>  ' + posts[index].PostLikes + '</small></span></button></div><div class="p-1 "><button class="post_icon" id="comment_btn" data-post_id="' + posts[index].PostId + '"><i class="fa fa-comment-o " ></i><span><small>  ' + posts[index].PostComments + '</small></span></button></div><div class="p-1 "><button class="post_icon"><button class="post_icon" id="share_btn" data-share_post_id = "' + posts[index].PostId + '"><i class="fa fa-share-alt " ></i><span><small>  ' + posts[index].PostShares + '</small></span></button></div></div></div></div></div>'
                );

                file_finder('post_files', posts[index].PostId);

                if (posts[index].PostType == "question") {
                    $('#tab-2').html(
                        $('#tab-2').html() + '<div class="conatiner d-flex flex-row " id="timeline_posts"style="scroll-padding-left: 10px;"><div class="p-1 flex-column " id="tl_profile_img_container"> <img ' + display_profile_image(posts[index].PostedByImg) + ' class= "profile_image rounded-circle border img-responsive shadow-sm visible" id = "profile_img_tl' + index + '" loading = "lazy" > </div > <div class="p-1 flex-fill post_body_container"> <div class="d-flex p-0 "> <table> <tr> <td colspan="2"><strong onclick = "window.location.href = \'profile1.php?username=' + posts[index].PostedByName + '\'">' + posts[index].PostedByName + '</strong>  ∙  ' + posts[index].PostedByDesignation + ' ∙ ' + time_conversion(posts[index].PostedAt) + '</tr><tr><td>' + posts[index].PostedByInstitution + '</td></tr></table><div class="three_dots ml-auto ml-left "><div class="dropdown p-1 "><button class="fa fa-chevron-down post_options_btn drop" type="button" data-toggle="dropdown"id="dropdownMenuButton" aria-haspopup="true" aria-expanded="false"></button><div class="dropdown-menu dropdown-menu-right options_dropdown_menu" aria-labelledby="dropdownMenuButton" data-post_options = "' + posts[index].PostId + '"></div></div></div></div><div class="d-flex p-0 "><div class="p-1 " id="tl_post_topic"><small> ' + posts[index].PostTopic + ' </small></div><div class="p-1 " id="tl_post_type"><small>' + posts[index].PostType + '</small></div> </div> <div class="p-0 "  id = "' + posts[index].PostId + '"><span>' + posts[index].PostBody + '</span><div data-question_post_files = "' + posts[index].PostId + '"></div><div class="d-flex p-1  flex-fill justify-content-around"><div class="p-1 "><button class="post_icon" id="like_btn" data-id="' + posts[index].PostId + '"><i class="fa fa-check-square-o " ></i><span><small>  ' + posts[index].PostLikes + '</small></span></button></div><div class="p-1 "><button class="post_icon" id="comment_btn" data-post_id="' + posts[index].PostId + '"><i class="fa fa-comment-o " ></i><span><small>  ' + posts[index].PostComments + '</small></span></button></div><div class="p-1 "><button class="post_icon"><button class="post_icon" id="share_btn" data-share_post_id = "' + posts[index].PostId + '"><i class="fa fa-share-alt " ></i><span><small>  ' + posts[index].PostShares + '</small></span></button></div></div></div></div></div>'
                    );

                    file_finder('question_post_files', posts[index].PostId);

                } else if (posts[index].PostType == "discussion") {
                    $('#tab-3').html(
                        $('#tab-3').html() + '<div class="conatiner d-flex flex-row " id="timeline_posts"style="scroll-padding-left: 10px;"><div class="p-1 flex-column " id="tl_profile_img_container"> <img ' + display_profile_image(posts[index].PostedByImg) + ' class= "profile_image rounded-circle border img-responsive shadow-sm visible" id = "profile_img_tl' + index + '" loading = "lazy" > </div > <div class="p-1 flex-fill post_body_container"> <div class="d-flex p-0 "> <table> <tr> <td colspan="2"><strong onclick = "window.location.href = \'profile1.php?username=' + posts[index].PostedByName + '\'">' + posts[index].PostedByName + '</strong>  ∙  ' + posts[index].PostedByDesignation + ' ∙ ' + time_conversion(posts[index].PostedAt) + '</tr><tr><td>' + posts[index].PostedByInstitution + '</td></tr></table><div class="three_dots ml-auto ml-left "><div class="dropdown p-1 "><button class="fa fa-chevron-down post_options_btn drop" type="button" data-toggle="dropdown"id="dropdownMenuButton" aria-haspopup="true" aria-expanded="false"></button><div class="dropdown-menu dropdown-menu-right options_dropdown_menu" aria-labelledby="dropdownMenuButton" data-post_options = "' + posts[index].PostId + '"></div></div></div></div><div class="d-flex p-0 "><div class="p-1 " id="tl_post_topic"><small> ' + posts[index].PostTopic + ' </small></div><div class="p-1 " id="tl_post_type"><small>' + posts[index].PostType + '</small></div> </div> <div class="p-0 "  id = "' + posts[index].PostId + '"><span>' + posts[index].PostBody + '</span><div data-discussion_post_files = "' + posts[index].PostId + '"></div><div class="d-flex p-1  flex-fill justify-content-around"><div class="p-1 "><button class="post_icon" id="like_btn" data-id="' + posts[index].PostId + '"><i class="fa fa-check-square-o " ></i><span><small>  ' + posts[index].PostLikes + '</small></span></button></div><div class="p-1 "><button class="post_icon" id="comment_btn" data-post_id="' + posts[index].PostId + '"><i class="fa fa-comment-o " ></i><span><small>  ' + posts[index].PostComments + '</small></span></button></div><div class="p-1 "><button class="post_icon"><button class="post_icon" id="share_btn" data-share_post_id = "' + posts[index].PostId + '"><i class="fa fa-share-alt " ></i><span><small>  ' + posts[index].PostShares + '</small></span></button></div></div></div></div></div>'
                    );

                    file_finder('discussion_post_files', posts[index].PostId);

                } else if (posts[index].PostType == "test") {
                    $('#tab-4').html(
                        $('#tab-4').html() + '<div class="conatiner d-flex flex-row " id="timeline_posts"style="scroll-padding-left: 10px;"><div class="p-1 flex-column " id="tl_profile_img_container"> <img ' + display_profile_image(posts[index].PostedByImg) + ' class= "profile_image rounded-circle border img-responsive shadow-sm visible" id = "profile_img_tl' + index + '" loading = "lazy" > </div > <div class="p-1 flex-fill post_body_container"> <div class="d-flex p-0 "> <table> <tr> <td colspan="2"><strong onclick = "window.location.href = \'profile1.php?username=' + posts[index].PostedByName + '\'">' + posts[index].PostedByName + '</strong>  ∙  ' + posts[index].PostedByDesignation + ' ∙ ' + time_conversion(posts[index].PostedAt) + '</tr><tr><td>' + posts[index].PostedByInstitution + '</td></tr></table><div class="three_dots ml-auto ml-left "><div class="dropdown p-1 "><button class="fa fa-chevron-down post_options_btn drop" type="button" data-toggle="dropdown"id="dropdownMenuButton" aria-haspopup="true" aria-expanded="false"></button><div class="dropdown-menu dropdown-menu-right options_dropdown_menu" aria-labelledby="dropdownMenuButton" data-post_options = "' + posts[index].PostId + '"></div></div></div></div><div class="d-flex p-0 "><div class="p-1 " id="tl_post_topic"><small> ' + posts[index].PostTopic + ' </small></div><div class="p-1 " id="tl_post_type"><small>' + posts[index].PostType + '</small></div> </div> <div class="p-0 "  id = "' + posts[index].PostId + '"><span>' + posts[index].PostBody + '</span><div data-test_post_files = "' + posts[index].PostId + '"></div><div class="d-flex p-1  flex-fill justify-content-around"><div class="p-1 "><button class="post_icon" id="like_btn" data-id="' + posts[index].PostId + '"><i class="fa fa-check-square-o " ></i><span><small>  ' + posts[index].PostLikes + '</small></span></button></div><div class="p-1 "><button class="post_icon" id="comment_btn" data-post_id="' + posts[index].PostId + '"><i class="fa fa-comment-o " ></i><span><small>  ' + posts[index].PostComments + '</small></span></button></div><div class="p-1 "><button class="post_icon"><button class="post_icon" id="share_btn" data-share_post_id = "' + posts[index].PostId + '"><i class="fa fa-share-alt " ></i><span><small>  ' + posts[index].PostShares + '</small></span></button></div></div></div></div></div>'
                    );

                    file_finder('test_post_files', posts[index].PostId);

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

                if (posts[index].PostIsLiked) {
                    $("[data-id='" + posts[index].PostId + "']").css("color", "limegreen");
                }
                //set the share button to green if the user has liked that post
                if (posts[index].PostIsShared) {
                    $("[data-share_post_id='" + posts[index].PostId + "']").css("color", "limegreen");
                }

                file_finder(posts[index].PostId);
            }

            //handler for deleting posts
            $('[data-delete_post]').click(function () {
                var post_id = $(this).attr('data-delete_post');

                delete_post(post_id);
            });

            //handler for reporting a post
            $('[data-report_post]').click(function () {

                var post_id = $(this).attr('data-report_post');

                report_post(post_id);

            })

            //ajax handler for displaying comments
            $('[data-post_id]').click(function () {

                var button_id = $(this).attr('data-post_id');

                get_comments(button_id, posts[0].LoggedInId);
            })

            // ajax handler for liking
            $('[data-id]').click(function () {

                var button_id = $(this).attr('data-id');

                like_post(button_id);

            });

            //ajax handler for sharing a post
            $('[data-share_post_id]').click(function () {

                var button_id = $(this).attr('data-share_post_id');

                rePost_post(button_id);

            });

            scrollToAnchor(location.hash);

        },
        error: function (r_t) {
            console.log(r_t);
        }

    });

})