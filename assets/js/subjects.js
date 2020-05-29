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

            if (details.Status == "Good") {

                //handler for logout button
                $('#log_out_button').click(function () {

                    $('.logout_option_button').css('display', 'inline-block');

                    $('#log_out_this_button').click(function () {
                        $.ajax({
                            method: "DELETE",
                            url: "REST_api/auth",
                            processData: false,
                            contentType: "application/json",
                            data: '',
                            success: function (r) {
                                console.log(r);

                                window.location.href = "login.html";
                            },
                            error: function (r) {
                                console.log(r);
                            }
                        });
                    });

                    $('#log_out_all_button').click(function () {
                        $.ajax({
                            method: "DELETE",
                            url: "REST_api/auth?all=1",
                            processData: false,
                            contentType: "application/json",
                            data: '',
                            success: function (r) {
                                console.log(r);

                                window.location.href = "login.html";
                            },
                            error: function (r) {
                                console.log(r);
                            }
                        });
                    });
                });

            } else if (details.Status == "Deactivated") {
                alert(details.Status);
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
                            alert(details.Status);
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
                                method: "DELETE",
                                url: "REST_api/post?post_id=" + post_id,
                                processData: false,
                                contentType: "application/json",
                                data: '',
                                success: function (r) {
                                    console.log(r);
                                },

                                error: function (r) {
                                    console.log(r);
                                }
                            })

                        } else if (details.Status == "Deactivated") {
                            alert(details.Status);
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
            });

            //handler for reporting a post
            $('[data-report_post]').click(function () {

                var post_id = $(this).attr('data-report_post');

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
                                method: "GET",
                                url: "REST_api/post_data?post_id=" + post_id,
                                processData: false,
                                contentType: "application/json",
                                data: '{"PostId" : "' + post_id + '"}',
                                success: function (r) {

                                    var post = JSON.parse(r);

                                    $('#modal_report').html(
                                        '<div class="conatiner d-flex flex-row" id="timeline_posts"style="scroll-padding-left: 10px;"><div class="p-1 flex-column" id="tl_profile_img_container"> <img ' + display_profile_image(post.PostedByImg) + ' class= "profile_image rounded-circle border img-responsive shadow-sm visible" id = "profile_img_tl_comments" loading = "lazy" > </div > <div class="p-1 flex-fill"> <div class="d-flex p-0"> <table> <tr> <td colspan="2"><strong onclick = "window.location.href = \'profile1.php?username=' + post.PostedByName + '\'">' + post.PostedByName + '</strong>  ∙  ' + time_conversion(post.PostedAt) + '</tr><tr></tr></table></div><div class="d-flex p-0"><div class="p-1" id="tl_post_topic"><small> ' + post.PostTopic + ' </small></div><div class="p-1" id="tl_post_type"><small>' + post.PostType + '</small></div> </div> <div class="p-0"><p>' + post.PostBody + '</p></div></div></div><div class="p-1 d-flex flex-fill ">  <textarea class = "p-1 form_control" rows = "3" id = "report_input" placeholder = "Write reason for reporting this post..." style = "width: 90%; margin: auto;border-radius: 5px;"></textarea> </div> <div> <button class="btn btn-default d-flex ml-auto ml-left" id = "post_report_btn" data-report_post_id = "' + post.PostId + '"><small>Report</small></button> </div><hr>'
                                    );

                                    $('#report_modal').modal('show');

                                    $('[data-report_post_id]').click(function () {

                                        var post_id = $(this).attr('data-report_post_id');

                                        if ($('#report_input').val() && $('#report_input').val() != ' ') {

                                            var report_body = $('#report_input').val();

                                            report_body = encodeURIComponent(report_body);

                                            $.ajax({
                                                method: "POST",
                                                url: "REST_api/report?post_id=" + post_id,
                                                processData: false,
                                                contentType: "application/json",
                                                data: '{"ReportBody" : "' + report_body + '"}',
                                                success: function (r) {
                                                    // var res = JSON.parse(r)

                                                    console.log(r);
                                                },

                                                error: function () {
                                                    console.log('error');
                                                }
                                            })

                                            $('#report_input').val("");
                                        }
                                    })
                                },

                                error: function (r) {
                                    console.log(r);
                                }
                            })

                        } else if (details.Status == "Deactivated") {
                            alert(details.Status);
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

            //ajax handler for displaying comments
            $('[data-post_id]').click(function () {
                var button_id = $(this).attr('data-post_id');

                $.ajax({
                    method: "GET",
                    url: "REST_api/comments?post_id=" + $(this).attr('data-post_id'),
                    processData: false,
                    contentType: "application/json",
                    data: '',
                    success: function (r) {

                        var comment = JSON.parse(r || "{}");

                        $.each(comment, function (index) {

                            $('#comment_modal').modal('show');

                            var output = '<div class="conatiner d-flex flex-row " id="timeline_posts"style="scroll-padding-left: 10px;"><div class="p-1 flex-column " id="tl_profile_img_container"> <img ' + display_profile_image(comment[0].PostedByImg) + ' class= "profile_image rounded-circle border img-responsive shadow-sm visible" id = "profile_img_tl_comments" loading = "lazy" > </div > <div class="p-1 flex-fill "> <div class="d-flex p-0 "> <table> <tr> <td colspan="2"><strong onclick = "window.location.href = \'profile1.php?username=' + comment[0].PostedByName + '\'">' + comment[0].PostedByName + '</strong>  ∙  ' + comment[0].PostedByDesignation + ' ∙ ' + time_conversion(comment[0].PostedAt) + '</tr><tr><td>' + comment[0].PostedByInstitution + '</td></tr></table><div class="three_dots ml-auto ml-left"><div class="dropdown p-1 "><button class="fa fa-chevron-down post_options_btn drop" type="button" data-toggle="dropdown"id="dropdownMenuButton" aria-haspopup="true" aria-expanded="false"></button><div class="dropdown-menu dropdown-menu-right options_dropdown_menu" aria-labelledby="dropdownMenuButton" data-comment_post_options = "' + comment[0].PostId + '"></div></div></div></div><div class="d-flex p-0 "><div class="p-1 " id="tl_post_topic"><small> ' + comment[0].PostTopic + ' </small></div><div class="p-1 " id="tl_post_type"><small>' + comment[0].PostType + '</small></div> </div> <div class="p-0 "><p>' + comment[0].PostBody + '</p><div class="d-flex p-2  flex-fill justify-content-around"><div class="p-2 "><button class="post_icon" id="like_btn" data-id_comment="' + comment[0].PostId + '"><i class="fa fa-check-square-o " style = "color: grey"></i><span><small>  ' + comment[0].PostLikes + '</small></span><!--</button>--!></div><div class="p-2 "><!--<button class="post_icon" id="comment_btn" data-post_id="' + comment[0].PostId + '">--!><i class="fa fa-comment-o " style = "color: grey"></i><span><small>  ' + comment[0].PostComments + '</small></span><!--</button>--!></div><div class="p-2 "><button class="post_icon" id="share_btn" data-share_post_id="' + comment[index].PostId + '"><i class="fa fa-share-alt " style = "color: grey"></i><span><small>  ' + comment[0].PostShares + '</small></span></button></div></div></div></div></div><div class="p-1 d-flex flex-fill  justify-content-center">  <textarea class = "p-1  form_control" rows = "3" id = "comment_input" placeholder = "Write your response..."></textarea> </div> <div> <button class="btn btn-default d-flex ml-auto ml-left" id = "post_comment_btn" data-comment_post_id = "' + comment[0].PostId + '"><small>Respond</small></button> </div><hr><div class="p-2  d-flex flex-fill"><strong>Responses:</strong></div>';

                            if (comment.length > 1) {

                                for (var i = 1; i < comment.length; i++) {

                                    if (comment[i].CommentRating.length > 0) {
                                        comment[i].CommentBody = decodeURIComponent(comment[i].CommentBody);
                                        comment[i].CommentBody = comment[i].CommentBody.replace("<", "&lt;");
                                        comment[i].CommentBody = comment[i].CommentBody.replace(">", "&gt;>");
                                        comment[i].CommentBody = comment[i].CommentBody.replace("%2F", "\\/");

                                        output += '<div class="conatiner d-flex flex-row " id="comments_modal" style="scroll-padding-left: 10px;"> <div class="p-1 flex-column " id="tl_profile_img_container"> <img ' + display_profile_image(comment[i].CommentedByImg) + ' class="profile_image_comments rounded-circle border img-responsive shadow-sm visible" id="profile_img_comments' + i + '"  loading="lazy"> </div> <div class="p-1 flex-fill "> <div class="d-flex p-0 "> <table> <tr> <td colspan="3"><strong onclick = "window.location.href = \'profile1.php?username=' + comment[i].CommentedBy + '\'">' + comment[i].CommentedBy + '</strong>  ∙  ' + time_conversion(comment[i].CommentedAt) + '</td> </tr> <tr> </tr> </table> <div class="three_dots ml-auto ml-left"><div class="dropdown p-1 "><button class="fa fa-chevron-down post_options_btn drop" type="button" data-toggle="dropdown"id="dropdownMenuButton" aria-haspopup="true" aria-expanded="false"></button><div class="dropdown-menu dropdown-menu-right options_dropdown_menu" aria-labelledby="dropdownMenuButton">' + get_comment_owner(comment[i].CommentedById, posts[0].LoggedInId, comment[i].CommentID) + '</div></div></div> </div> <div class="p-0 "> <span>' + decodeURIComponent(comment[i].CommentBody) + '</span> <!-- <div class="d-flex p-2  flex-fill justify-content-around"> <div class="p-2 "><a href="#"><i class="fa fa-check-square-o post_icon"></i></a><span><small></small></span></div> <div class="p-2 "><a href="#"><i class="fa fa-comment-o post_icon"></i></a><span><small></small></span></div> <div class="p-2 "><a href="#"><i class="fa fa-share-alt post_icon"></i></a><span><small></small></span></div> </div> --!><div class = "p-0  d-flex justify-content-end flex-fill"><span> Rating: ' + comment[i].CommentRating + '</span></div> <label for = "comment_rating"><small>Rate this response</small></label> <div class="d-flex p-0 "><input class = "custom-range" type = "range" data-range_comment_rating = "' + comment[i].CommentID + '" id = "comment_rating_range' + i + '" onmouseup = "rating_system(this.value, ' + comment[i].CommentID + ')" ontouchend = "rating_system(this.value, ' + comment[i].CommentID + ')" min="0" max = "10" step = "0.5" name = "comment_rating" oninput = "comment_rating_range_output' + i + '.value = this.value"></input><input class = "input_range" type="text" id = "comment_rating_range_output' + i + '" value="0" disabled></input></div> <hr></div></div> </div> </div>';
                                    } else {
                                        comment[i].CommentBody = decodeURIComponent(comment[i].CommentBody);
                                        comment[i].CommentBody = comment[i].CommentBody.replace("<", "&lt;");
                                        comment[i].CommentBody = comment[i].CommentBody.replace(">", "&gt;>");
                                        comment[i].CommentBody = comment[i].CommentBody.replace("%2F", "\\/");

                                        output += '<div class="conatiner d-flex flex-row " id="comments_modal" style="scroll-padding-left: 10px;"> <div class="p-1 flex-column " id="tl_profile_img_container"> <img ' + display_profile_image(comment[i].CommentedByImg) + ' class="profile_image_comments rounded-circle border img-responsive shadow-sm visible" id="profile_img_comments' + i + '" loading="lazy"> </div> <div class="p-1 flex-fill "> <div class="d-flex p-0 "> <table> <tr> <td colspan="3"><strong onclick = "window.location.href = \'profile1.php?username=' + comment[i].CommentedBy + '\'">' + comment[i].CommentedBy + '</strong>  ∙  ' + time_conversion(comment[i].CommentedAt) + '</td> </tr> <tr> </tr> </table> <div class="three_dots ml-auto ml-left"><div class="dropdown p-1 "><button class="fa fa-chevron-down post_options_btn drop" type="button" data-toggle="dropdown"id="dropdownMenuButton" aria-haspopup="true" aria-expanded="false"></button><div class="dropdown-menu dropdown-menu-right options_dropdown_menu" aria-labelledby="dropdownMenuButton">' + get_comment_owner(comment[i].CommentedById, posts[0].LoggedInId, comment[i].CommentID) + '</div></div></div> </div> <div class="p-0 "> <span>' + decodeURIComponent(comment[i].CommentBody) + '</span> <!-- <div class="d-flex p-2  flex-fill justify-content-around"> <div class="p-2 "><a href="#"><i class="fa fa-check-square-o post_icon"></i></a><span><small></small></span></div> <div class="p-2 "><a href="#"><i class="fa fa-comment-o post_icon"></i></a><span><small></small></span></div> <div class="p-2 "><a href="#"><i class="fa fa-share-alt post_icon"></i></a><span><small></small></span></div> </div> --!> <label for = "comment_rating"><small>Rate this response</small></label> <div class="d-flex p-0 "><input class = "custom-range" type = "range" data-range_comment_rating = "' + comment[i].CommentID + '" onmouseup = "rating_system(this.value, ' + comment[i].CommentID + ')" ontouchend = "rating_system(this.value, ' + comment[i].CommentID + ')" id = "comment_rating_range' + i + '" min="0" max = "10" step = "0.5" name = "comment_rating" oninput = "comment_rating_range_output' + i + '.value = this.value"></input><input class = "input_range" type="text" id = "comment_rating_range_output' + i + '" value="0" disabled></input></div> <hr></div></div> </div> </div>';
                                    }

                                }

                                //modify content of the modal window, set the post to be displayed before the comments
                            }

                            $('#modal_comments').html(output);

                            //handler for the dropdown menu display
                            if (posts[0].LoggedInId == comment[0].PostedById) {
                                $('[data-comment_post_options = "' + comment[0].PostId + '"]').html(
                                    $('[data-comment_post_options = "' + comment[0].PostId + '"]').html() + '<button class="dropdown-item tl_post_options" data-delete_post = "' + comment[0].PostId + '">Delete</button>'
                                )
                            } else {
                                $('[data-comment_post_options = "' + comment[0].PostId + '"]').html(
                                    $('[data-comment_post_options = "' + comment[0].PostId + '"]').html() + '<button class="dropdown-item tl_post_options" data-report_post = "' + comment[0].PostId + '">Report</button>'
                                )
                            }

                            //posting a response
                            $('#post_comment_btn').click(function () {

                                $.ajax({
                                    method: "GET",
                                    url: "REST_api/user",
                                    processData: false,
                                    contentType: "application/json",
                                    data: '',
                                    success: function (r) {
                                        var details = JSON.parse(r)

                                        if (details.Status == "Good") {

                                            if ($('#comment_input').val() && $('#comment_input').val() != ' ') {

                                                var comment_body = $('#comment_input').val();

                                                comment_body = encodeURIComponent(comment_body);

                                                $.ajax({
                                                    method: "POST",
                                                    url: "REST_api/comment?post_id=" + $(this).attr('data-comment_post_id'),
                                                    processData: false,
                                                    contentType: "application/json",
                                                    data: '{"CommentBody" : "' + comment_body + '"}',
                                                    success: function (r) {
                                                        // var res = JSON.parse(r)

                                                        console.log(r);
                                                    },

                                                    error: function () {
                                                        console.log('error');
                                                    }
                                                })

                                                $('#comment_input').val("");
                                            }


                                        } else if (details.Status == "Deactivated") {
                                            alert(details.Status);
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

                            //handler for liking a post
                            $('[data-id_comment]').click(function () {

                                var button_id = $(this).attr('data-id_comment');

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
                                                method: "POST",
                                                url: "REST_api/likes?post_id=" + button_id,
                                                processData: false,
                                                contentType: "application/json",
                                                data: '',
                                                success: function (r) {
                                                    var res = JSON.parse(r)
                                                    $("[data-id_comment='" + button_id + "']").html('<i class="fa fa-check-square-o"></i><span ><small>  ' + res.PostLikes + '</small></span>');

                                                    if (res.PostIsLiked) {
                                                        $("[data-id_comment='" + button_id + "']").css("color", "limegreen");
                                                    } else {
                                                        $("[data-id_comment='" + button_id + "']").css("color", "grey");
                                                    }

                                                    console.log(res);
                                                },

                                                error: function () {
                                                    console.log('error');
                                                }
                                            })

                                        } else if (details.Status == "Deactivated") {
                                            alert(details.Status);
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

                            if (comment[0].PostIsLiked) {
                                $("[data-id_comment='" + comment[0].PostId + "']").css("color", "limegreen");
                            }

                            //sharing a post from the comments in the subjects page
                            $('[data-share_post_id]').click(function () {

                                var button_id = $(this).attr('data-share_post_id');

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
                                                method: "POST",
                                                url: "REST_api/share?post_id=" + button_id,
                                                processData: false,
                                                contentType: "application/json",
                                                data: '',
                                                success: function (r) {
                                                    var res = JSON.parse(r)

                                                    $("[data-share_post_id='" + button_id + "']").html('<i class="fa fa-share-alt "></i><span ><small>  ' + res.PostShares + '</small></span>');

                                                    if (res.PostIsShared) {
                                                        $("[data-share_post_id='" + button_id + "']").css("color", "limegreen");
                                                    } else {
                                                        $("[data-share_post_id='" + button_id + "']").css("color", "grey");
                                                    }

                                                    console.log(res);
                                                },

                                                error: function () {
                                                    console.log('error');
                                                }
                                            })

                                        } else if (details.Status == "Deactivated") {
                                            alert(details.Status);
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

                            //set the share button to green if the user has liked that post
                            if (comment[0].PostIsShared) {
                                $("[data-share_post_id='" + comment[0].PostId + "']").css("color", "limegreen");
                            }

                        });

                        console.log(comment);
                    },

                    error: function () {
                        console.log('error');
                    }
                })
            })

            // ajax handler for liking
            $('[data-id]').click(function () {

                var button_id = $(this).attr('data-id');

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
                                method: "POST",
                                url: "REST_api/likes?post_id=" + button_id,
                                processData: false,
                                contentType: "application/json",
                                data: '',
                                success: function (r) {
                                    var res = JSON.parse(r)
                                    $("[data-id='" + button_id + "']").html('<i class="fa fa-check-square-o"></i><span ><small>  ' + res.PostLikes + '</small></span>');

                                    if (res.PostIsLiked) {
                                        $("[data-id='" + button_id + "']").css("color", "limegreen");
                                    } else {
                                        $("[data-id='" + button_id + "']").css("color", "grey");
                                    }

                                    console.log(res);
                                },

                                error: function () {
                                    console.log('error');
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
                    error: function (r) {
                        console.log(r);

                    }
                });

            });

            //ajax handler for sharing a post
            $('[data-share_post_id]').click(function () {

                var button_id = $(this).attr('data-share_post_id');

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
                                method: "POST",
                                url: "REST_api/share?post_id=" + button_id,
                                processData: false,
                                contentType: "application/json",
                                data: '',
                                success: function (r) {
                                    var res = JSON.parse(r)

                                    $("[data-share_post_id='" + button_id + "']").html('<i class="fa fa-share-alt "></i><span ><small>  ' + res.PostShares + '</small></span>');

                                    if (res.PostIsShared) {
                                        $("[data-share_post_id='" + button_id + "']").css("color", "limegreen");
                                    } else {
                                        $("[data-share_post_id='" + button_id + "']").css("color", "grey");
                                    }

                                    console.log(res);
                                },

                                error: function () {
                                    console.log('error');
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
                    error: function (r) {
                        console.log(r);

                    }
                });

            });

            scrollToAnchor(location.hash);

        },
        error: function (r_t) {
            console.log(r_t);
        }

    });

})

// function rating_system(rating, comment_id) {

//     $.ajax({
//         method: "POST",
//         url: "REST_api/rate_comment?comment_id=" + comment_id,
//         processData: false,
//         contentType: "application/json",
//         data: '{"rating": "' + rating + '"}',
//         success: function (r) {

//             var res = JSON.parse(r)
//             console.log(res);
//         },
//         error: function () {
//             console.log('error');
//         }
//     })
// }

// function time_conversion(time) {
//     const current_date = new Date();

//     const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//     const actual_date = new Date(time * 1000);

//     var date_difference = current_date - actual_date;

//     var date_difference_in_seconds = Math.floor((current_date - actual_date) / 1000);

//     var date_difference_in_minutes = Math.floor(date_difference_in_seconds / 60);

//     var date_difference_in_hours = Math.floor(date_difference_in_minutes / 60);

//     var date_difference_in_days = Math.floor(date_difference_in_hours / 24);

//     var date_difference_in_years = Math.floor(date_difference_in_days / 365.25);

//     // console.log(date_difference_in_hours);

//     if (date_difference_in_seconds < 60) {
//         time = date_difference_in_seconds + 'sec';
//     } else if ((date_difference_in_seconds >= 60) && (date_difference_in_minutes < 60)) {
//         time = date_difference_in_minutes + 'min';
//     } else if ((date_difference_in_minutes >= 60) && (date_difference_in_hours < 24)) {
//         time = date_difference_in_hours + 'h';
//     } else if ((date_difference_in_hours >= 24) && (date_difference_in_days < 7)) {
//         time = date_difference_in_days + 'd';
//     } else if ((date_difference_in_days > 7) && (date_difference_in_years < 1)) {
//         time = months[actual_date.getUTCMonth()] + ', ' + actual_date.getUTCDay();
//     } else if (date_difference_in_years > 1) {
//         time = actual_date.getUTCFullYear() + ', ' + months[actual_date.getUTCMonth()] + ' ' + actual_date.getUTCDay();
//     }

//     return time;
// }

// function display_profile_image(image) {
//     if (image) {
//         return 'src = "' + image + '"'
//     }
// }

// function get_username(username) {
//     return username
// }

// String.prototype.escape_special_chars = function () {
//     return this.replace(/\n/g, "\\n").replace(/\'/g, "\\'").replace(/\"/g, '\\"').replace(/\&/g, "\\&").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/\b/g, "\\b").replace(/\f/g, "\\f");
// }

// function get_comment_owner(comment_owner, logged_in_user, comment_id) {
//     //handler for the dropdown menu display
//     if (logged_in_user == comment_owner) {
//         return '<button class="dropdown-item tl_post_options" data-delete_comment = "' + comment_id + '">Delete</button>';
//     } else {
//         return '<button class="dropdown-item tl_post_options" data-report_comment = "' + comment_id + '">Report</button>';
//     }
// }