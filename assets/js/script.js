$('#timeline_icon').click(function () {
    window.location.href = 'index.html';
});

$('#notifications_icon').click(function () {
    window.location.href = "notifications.html";
});

$(document).on('click', '.options_dropdown_menu', function (e) {
    e.stopPropagation();
});

var click_count = 0

$('#tab-inactive').on('click', function () {
    if (click_count < 1) {
        $(window).scrollTop(0);
        click_count++;
    }
});

var start = 10;
var working = true;

$.ajax({
    method: "GET",
    url: "REST_api/user",
    processData: false,
    contentType: "application/json",
    data: '',
    success: function (r) {
        var details = JSON.parse(r)

        if (details.Status == "Good" || details.Status == "Deactivated") {
            $('#username_page_top').text(details.Username);

            if (details.ProfileImg) {
                $('#profile_img_navbar').attr("src", '' + details.ProfileImg + '');
            }

            var user_id = details.UserId;

            var username = details.Username;

            $('#profile_icon').click(function () {
                window.location.href = 'profile1.php?username=' + details.Username + ''
            })

            //handler for logout button
            $('#log_out_button').click(function () {
                logout();
            });

            $(window).scroll(function () {
                if ($(this).scrollTop() + 1 >= $('body').height() - $(window).height()) {

                    if (working) {
                        working = false;

                        //ajax call to get more timeline posts
                        $.ajax({

                            method: "GET",
                            url: "REST_api/timeline_users?user_id=" + user_id + "&start=" + start,
                            processData: false,
                            contentType: "application/json",
                            data: '',
                            success: function (r) {

                                var posts = JSON.parse(r);

                                if (posts.length > 1) {

                                    $.each(posts, function (index) {

                                        console.log(posts[index].PostId);

                                        if (posts[index].SharedByName) {

                                            $('#timeline').html(
                                                $('#timeline').html() + '<div id="shared_by" onclick = ' + get_profile(posts[index].SharedByName, username) + '><small>' + posts[index].SharedByName + ' rePosted</small></div><div class="conatiner d-flex flex-row" id="timeline_posts"style="scroll-padding-left: 10px;"><div class="p-1 flex-column" id="tl_profile_img_container"> <img ' + display_profile_image(posts[index].PostedByImg) + ' class= "profile_image rounded-circle border img-responsive shadow-sm visible" id = "profile_img_tl" loading = "lazy" > </div > <div class="p-1 flex-fill post_body_container"> <div class="d-flex p-0"> <table> <tr> <td colspan="2"><strong onclick = "window.location.href = \'profile1.php?username=' + posts[index].PostedByName + '\'">' + posts[index].PostedByName + '</strong>  ∙  ' + posts[index].PostedByDesignation + ' ∙ ' + time_conversion(posts[index].PostedAt) + '</td></tr><tr><td>' + posts[index].PostedByInstitution + '</td></tr></table><div class="three_dots ml-auto ml-left"><div class="dropdown p-1  "><button class="fa fa-chevron-down post_options_btn drop" type="button" data-toggle="dropdown"id="dropdownMenuButton" aria-haspopup="true" aria-expanded="false"></button><div class="dropdown-menu dropdown-menu-right options_dropdown_menu" aria-labelledby="dropdownMenuButton" data-shared_post_options = "' + posts[index].PostId + '"></div></div></div></div><div class="d-flex p-0"><div class="p-1" id="tl_post_topic"><small> ' + posts[index].PostTopic + ' </small></div><div class="p-1" id="tl_post_type"><small>' + posts[index].PostType + '</small></div> </div> <div class="p-0"><span data-post_body= "' + posts[index].PostId + '">' + posts[index].PostBody + '</span><div data-post_files = "' + posts[index].PostId + '"></div><div class="d-flex p-1 flex-fill justify-content-around"><div class="p-1"><button class="post_icon" id="like_btn" data-id="' + posts[index].PostId + '"><i class="fa fa-check-square-o"></i><span><small>  ' + posts[index].PostLikes + '</small></span></button></div><div class="p-1"><button class="post_icon" id="comment_btn" data-post_id="' + posts[index].PostId + '"><i class="fa fa-comment-o"></i><span ><small>  ' + posts[index].PostComments + '</small></span></button></div><div class="p-1"><button class="post_icon" id="share_btn" data-share_post_id = "' + posts[index].PostId + '"><i class="fa fa-share-alt"></i><span><small>  ' + posts[index].PostShares + '</small></span></button></div></div></div></div></div>'
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

                                            $('#timeline').html(
                                                $('#timeline').html() + '<div class="conatiner d-flex flex-row" id="timeline_posts"style="scroll-padding-left: 10px;"><div class="p-1 flex-column" id="tl_profile_img_container"> <img ' + display_profile_image(posts[index].PostedByImg) + ' class= "profile_image rounded-circle border img-responsive shadow-sm visible" id = "profile_img_tl" loading = "lazy" > </div > <div class="p-1 flex-fill post_body_container"> <div class="d-flex p-0"> <table> <tr> <td colspan="2"><strong onclick = "window.location.href = \'profile1.php?username=' + posts[index].PostedByName + '\'">' + posts[index].PostedByName + '</strong>  ∙  ' + posts[index].PostedByDesignation + ' ∙ ' + time_conversion(posts[index].PostedAt) + '</tr><tr><td>' + posts[index].PostedByInstitution + '</td></tr></table><div class="three_dots ml-auto ml-left "><div class="dropdown p-1 "><button class="fa fa-chevron-down post_options_btn drop" type="button" data-toggle="dropdown"id="dropdownMenuButton" aria-haspopup="true" aria-expanded="false"></button><div class="dropdown-menu dropdown-menu-right options_dropdown_menu" aria-labelledby="dropdownMenuButton" data-post_options = "' + posts[index].PostId + '"></div></div></div></div><div class="d-flex p-0"><div class="p-1" id="tl_post_topic"><small> ' + posts[index].PostTopic + ' </small></div><div class="p-1" id="tl_post_type"><small>' + posts[index].PostType + '</small></div> </div> <div class="p-0"><span data-post_body= "' + posts[index].PostId + '">' + posts[index].PostBody + '</span><div data-post_files = "' + posts[index].PostId + '"></div><div class="d-flex p-1 flex-fill justify-content-around"><div class="p-1"><button class="post_icon" id="like_btn" data-id="' + posts[index].PostId + '"><i class="fa fa-check-square-o " ></i><span><small>  ' + posts[index].PostLikes + '</small></span></button></div><div class="p-1"><button class="post_icon" id="comment_btn" data-post_id="' + posts[index].PostId + '"><i class="fa fa-comment-o " ></i><span><small>  ' + posts[index].PostComments + '</small></span></button></div><div class="p-1"><button class="post_icon"><button class="post_icon" id="share_btn" data-share_post_id = "' + posts[index].PostId + '"><i class="fa fa-share-alt " ></i><span><small>  ' + posts[index].PostShares + '</small></span></button></div></div></div></div></div>'
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

                                //handler for deleting posts
                                $('[data-delete_post]').click(function () {
                                    var post_id = $(this).attr('data-delete_post');

                                    delete_post(post_id);
                                });

                                //handler for reporting a post
                                $('[data-report_post]').click(function () {

                                    var post_id = $(this).attr('data-report_post');

                                    report_post(post_id);
                                });

                                $('[data-post_body]').click(function () {
                                    var post_id = $(this).attr('data-post_body');

                                    $('[data-post_id="' + post_id + '"]').click();
                                });

                                //ajax handler for displaying comments
                                $('[data-post_id]').click(function () {
                                    var button_id = $(this).attr('data-post_id');

                                    get_comments(button_id, user_id);
                                });

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
                            },
                            error: function (r) {
                                console.log(r)
                            }

                        });

                        //make call to get more subject posts
                        $.ajax({

                            method: "GET",
                            url: "REST_api/timeline_subjects?user_id=" + user_id + "&start=" + start,
                            processData: false,
                            contentType: "application/json",
                            data: '',
                            success: function (r) {

                                var posts = JSON.parse(r);

                                if (posts.length > 1) {

                                    $.each(posts, function (index) {

                                        console.log(posts[index].PostId);

                                        $('#subjects').html(
                                            $('#subjects').html() + '<div class="conatiner d-flex flex-row" id="timeline_posts"style="scroll-padding-left: 10px;"><div class="p-1 flex-column" id="tl_profile_img_container"> <img ' + display_profile_image(posts[index].PostedByImg) + ' class= "profile_image rounded-circle border img-responsive shadow-sm visible" id = "profile_img_tl" loading = "lazy" > </div > <div class="p-1 flex-fill post_body_container"> <div class="d-flex p-0"> <table> <tr> <td colspan="2"><strong onclick = "window.location.href = \'profile1.php?username=' + posts[index].PostedByName + '\'">' + posts[index].PostedByName + '</strong>  ∙  ' + posts[index].PostedByDesignation + ' ∙ ' + time_conversion(posts[index].PostedAt) + '</tr><tr><td>' + posts[index].PostedByInstitution + '</td></tr></table><div class="three_dots ml-auto ml-left "><div class="dropdown p-1 "><button class="fa fa-chevron-down post_options_btn drop" type="button" data-toggle="dropdown"id="dropdownMenuButton" aria-haspopup="true" aria-expanded="false"></button><div class="dropdown-menu dropdown-menu-right options_dropdown_menu" aria-labelledby="dropdownMenuButton" data-post_options = "' + posts[index].PostId + '"></div></div></div></div><div class="d-flex p-0"><div class="p-1" id="tl_post_topic"><small> ' + posts[index].PostTopic + ' </small></div><div class="p-1" id="tl_post_type"><small>' + posts[index].PostType + '</small></div> </div> <div class="p-0"><span data-post_body= "' + posts[index].PostId + '">' + posts[index].PostBody + '</span><div data-topic_post_files = "' + posts[index].PostId + '"></div><div class="d-flex p-1 flex-fill justify-content-around"><div class="p-1"><button class="post_icon" id="like_btn" data-id="' + posts[index].PostId + '"><i class="fa fa-check-square-o " ></i><span><small>  ' + posts[index].PostLikes + '</small></span></button></div><div class="p-1"><button class="post_icon" id="comment_btn" data-post_id="' + posts[index].PostId + '"><i class="fa fa-comment-o " ></i><span><small>  ' + posts[index].PostComments + '</small></span></button></div><div class="p-1"><button class="post_icon"><button class="post_icon" id="share_btn" data-share_post_id = "' + posts[index].PostId + '"><i class="fa fa-share-alt " ></i><span><small>  ' + posts[index].PostShares + '</small></span></button></div></div></div></div></div>'
                                        );

                                        file_finder('topic_post_files', posts[index].PostId);

                                        //handler for the dropdown menu display
                                        if (user_id == posts[index].PostedById) {
                                            $('[data-post_options = "' + posts[index].PostId + '"]').html(
                                                $('[data-post_options = "' + posts[index].PostId + '"]').html() + '<button class="dropdown-item tl_post_options" data-delete_post = "' + posts[index].PostId + '">Delete</button>'
                                            );
                                        } else {
                                            $('[data-post_options = "' + posts[index].PostId + '"]').html(
                                                $('[data-post_options = "' + posts[index].PostId + '"]').html() + '<button class="dropdown-item tl_post_options" data-report_post = "' + posts[index].PostId + '">Report</button>'
                                            );
                                        }

                                        //set the share button to green if the user has liked that post
                                        if (posts[index].PostIsShared) {
                                            $("[data-share_post_id='" + posts[index].PostId + "']").css("color", "limegreen");
                                        }

                                        //set the like button to green if the user has liked that post
                                        if (posts[index].PostIsLiked) {
                                            $("[data-id='" + posts[index].PostId + "']").css("color", "limegreen");
                                        }

                                    });
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
                                });

                                $('[data-post_body]').click(function () {
                                    var post_id = $(this).attr('data-post_body');

                                    $('[data-post_id="' + post_id + '"]').click();
                                });

                                //ajax handler for displaying comments
                                $('[data-post_id]').click(function () {
                                    var button_id = $(this).attr('data-post_id');

                                    get_comments(button_id, user_id);
                                });

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

                            },
                            error: function (r) {
                                console.log(r)
                            }

                        });

                        start += 10;

                        setTimeout(function () {
                            working = true;
                        }, 3000);

                    }
                }

            });

            $(document).ready(function () {
                //ajax handler for displaying timeline posts
                $.ajax({

                    method: "GET",
                    url: "REST_api/timeline_users?user_id=" + user_id + "&start=0",
                    processData: false,
                    contentType: "application/json",
                    data: '',
                    success: function (r) {

                        var posts = JSON.parse(r);

                        if (posts.length > 1) {

                            $.each(posts, function (index) {

                                console.log(posts[index].PostId);

                                // if (posts[index].Category == "timeline") {

                                if (posts[index].SharedByName) {

                                    $('#timeline').html(
                                        $('#timeline').html() + '<div id="shared_by" onclick = ' + get_profile(posts[index].SharedByName, username) + '><small>' + posts[index].SharedByName + ' rePosted</small></div><div class="conatiner d-flex flex-row" id="timeline_posts"style="scroll-padding-left: 10px;"><div class="p-1 flex-column" id="tl_profile_img_container"> <img ' + display_profile_image(posts[index].PostedByImg) + ' class= "profile_image rounded-circle border img-responsive shadow-sm visible" id = "profile_img_tl" loading = "lazy" > </div > <div class="p-1 flex-fill post_body_container"> <div class="d-flex p-0"> <table> <tr> <td colspan="2"><strong onclick = "window.location.href = \'profile1.php?username=' + posts[index].PostedByName + '\'">' + posts[index].PostedByName + '</strong>  ∙  ' + posts[index].PostedByDesignation + ' ∙ ' + time_conversion(posts[index].PostedAt) + '</td></tr><tr><td>' + posts[index].PostedByInstitution + '</td></tr></table><div class="three_dots ml-auto ml-left"><div class="dropdown p-1  "><button class="fa fa-chevron-down post_options_btn drop" type="button" data-toggle="dropdown"id="dropdownMenuButton" aria-haspopup="true" aria-expanded="false"></button><div class="dropdown-menu dropdown-menu-right options_dropdown_menu" aria-labelledby="dropdownMenuButton" data-shared_post_options = "' + posts[index].PostId + '"></div></div></div></div><div class="d-flex p-0"><div class="p-1" id="tl_post_topic"><small> ' + posts[index].PostTopic + ' </small></div><div class="p-1" id="tl_post_type"><small>' + posts[index].PostType + '</small></div> </div> <div class="p-0"><span data-post_body= "' + posts[index].PostId + '">' + posts[index].PostBody + '</span><div data-post_files = "' + posts[index].PostId + '"></div><div class="d-flex p-1 flex-fill justify-content-around"><div class="p-1"><button class="post_icon" id="like_btn" data-id="' + posts[index].PostId + '"><i class="fa fa-check-square-o"></i><span><small>  ' + posts[index].PostLikes + '</small></span></button></div><div class="p-1"><button class="post_icon" id="comment_btn" data-post_id="' + posts[index].PostId + '"><i class="fa fa-comment-o"></i><span ><small>  ' + posts[index].PostComments + '</small></span></button></div><div class="p-1"><button class="post_icon" id="share_btn" data-share_post_id = "' + posts[index].PostId + '"><i class="fa fa-share-alt"></i><span><small>  ' + posts[index].PostShares + '</small></span></button></div></div></div></div></div>'
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

                                    $('#timeline').html(
                                        $('#timeline').html() + '<div class="conatiner d-flex flex-row" id="timeline_posts"style="scroll-padding-left: 10px;"><div class="p-1 flex-column" id="tl_profile_img_container"> <img ' + display_profile_image(posts[index].PostedByImg) + ' class= "profile_image rounded-circle border img-responsive shadow-sm visible" id = "profile_img_tl" loading = "lazy" > </div > <div class="p-1 flex-fill post_body_container"> <div class="d-flex p-0"> <table> <tr> <td colspan="2"><strong onclick = "window.location.href = \'profile1.php?username=' + posts[index].PostedByName + '\'">' + posts[index].PostedByName + '</strong>  ∙  ' + posts[index].PostedByDesignation + ' ∙ ' + time_conversion(posts[index].PostedAt) + '</tr><tr><td>' + posts[index].PostedByInstitution + '</td></tr></table><div class="three_dots ml-auto ml-left "><div class="dropdown p-1 "><button class="fa fa-chevron-down post_options_btn drop" type="button" data-toggle="dropdown"id="dropdownMenuButton" aria-haspopup="true" aria-expanded="false"></button><div class="dropdown-menu dropdown-menu-right options_dropdown_menu" aria-labelledby="dropdownMenuButton" data-post_options = "' + posts[index].PostId + '"></div></div></div></div><div class="d-flex p-0"><div class="p-1" id="tl_post_topic"><small> ' + posts[index].PostTopic + ' </small></div><div class="p-1" id="tl_post_type"><small>' + posts[index].PostType + '</small></div> </div> <div class="p-0"><span data-post_body= "' + posts[index].PostId + '">' + posts[index].PostBody + '</span><div data-post_files = "' + posts[index].PostId + '"></div><div class="d-flex p-1 flex-fill justify-content-around"><div class="p-1"><button class="post_icon" id="like_btn" data-id="' + posts[index].PostId + '"><i class="fa fa-check-square-o " ></i><span><small>  ' + posts[index].PostLikes + '</small></span></button></div><div class="p-1"><button class="post_icon" id="comment_btn" data-post_id="' + posts[index].PostId + '"><i class="fa fa-comment-o " ></i><span><small>  ' + posts[index].PostComments + '</small></span></button></div><div class="p-1"><button class="post_icon"><button class="post_icon" id="share_btn" data-share_post_id = "' + posts[index].PostId + '"><i class="fa fa-share-alt " ></i><span><small>  ' + posts[index].PostShares + '</small></span></button></div></div></div></div></div>'
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
                                // } else {

                                //     // console.log("subject in tab 1: " + posts[index].PostBody + posts[index].PostedByName);
                                //     count_tp++;

                                //     $('#subjects').html(
                                //         $('#subjects').html() + '<div class="conatiner d-flex flex-row" id="timeline_posts"style="scroll-padding-left: 10px;"><div class="p-1 flex-column" id="tl_profile_img_container"> <img ' + display_profile_image(posts[index].PostedByImg) + ' class= "profile_image rounded-circle border img-responsive shadow-sm visible" id = "profile_img_tl" loading = "lazy" > </div > <div class="p-1 flex-fill post_body_container"> <div class="d-flex p-0"> <table> <tr> <td colspan="2"><strong onclick = "window.location.href = \'profile1.php?username=' + posts[index].PostedByName + '\'">' + posts[index].PostedByName + '</strong>  ∙  ' + posts[index].PostedByDesignation + ' ∙ ' + time_conversion(posts[index].PostedAt) + '</tr><tr><td>' + posts[index].PostedByInstitution + '</td></tr></table><div class="three_dots ml-auto ml-left "><div class="dropdown p-1 "><button class="fa fa-chevron-down post_options_btn drop" type="button" data-toggle="dropdown"id="dropdownMenuButton" aria-haspopup="true" aria-expanded="false"></button><div class="dropdown-menu dropdown-menu-right options_dropdown_menu" aria-labelledby="dropdownMenuButton" data-post_options = "' + posts[index].PostId + '"></div></div></div></div><div class="d-flex p-0"><div class="p-1" id="tl_post_topic"><small> ' + posts[index].PostTopic + ' </small></div><div class="p-1" id="tl_post_type"><small>' + posts[index].PostType + '</small></div> </div> <div class="p-0"><span data-post_body= "' + posts[index].PostId + '">' + posts[index].PostBody + '</span><div data-topic_post_files = "' + posts[index].PostId + '"></div><div class="d-flex p-1 flex-fill justify-content-around"><div class="p-1"><button class="post_icon" id="like_btn" data-id="' + posts[index].PostId + '"><i class="fa fa-check-square-o " ></i><span><small>  ' + posts[index].PostLikes + '</small></span></button></div><div class="p-1"><button class="post_icon" id="comment_btn" data-post_id="' + posts[index].PostId + '"><i class="fa fa-comment-o " ></i><span><small>  ' + posts[index].PostComments + '</small></span></button></div><div class="p-1"><button class="post_icon"><button class="post_icon" id="share_btn" data-share_post_id = "' + posts[index].PostId + '"><i class="fa fa-share-alt " ></i><span><small>  ' + posts[index].PostShares + '</small></span></button></div></div></div></div></div>'
                                //     );

                                //     file_finder('topic_post_files', posts[index].PostId);

                                //     //handler for the dropdown menu display
                                //     if (user_id == posts[index].PostedById) {
                                //         $('[data-post_options = "' + posts[index].PostId + '"]').html(
                                //             $('[data-post_options = "' + posts[index].PostId + '"]').html() + '<button class="dropdown-item tl_post_options" data-delete_post = "' + posts[index].PostId + '">Delete</button>'
                                //         )
                                //     } else {
                                //         $('[data-post_options = "' + posts[index].PostId + '"]').html(
                                //             $('[data-post_options = "' + posts[index].PostId + '"]').html() + '<button class="dropdown-item tl_post_options" data-report_post = "' + posts[index].PostId + '">Report</button>'
                                //         )
                                //     }
                                // }

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

                        //handler for deleting posts
                        $('[data-delete_post]').click(function () {
                            var post_id = $(this).attr('data-delete_post');

                            delete_post(post_id);
                        });

                        //handler for reporting a post
                        $('[data-report_post]').click(function () {

                            var post_id = $(this).attr('data-report_post');

                            report_post(post_id);
                        });

                        $('[data-post_body]').click(function () {
                            var post_id = $(this).attr('data-post_body');

                            $('[data-post_id="' + post_id + '"]').click();
                        });

                        //ajax handler for displaying comments
                        $('[data-post_id]').click(function () {
                            var button_id = $(this).attr('data-post_id');

                            get_comments(button_id, user_id);
                        });

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
                    },
                    error: function (r) {
                        console.log(r)
                    }

                });

                //make call to get subject posts
                $.ajax({

                    method: "GET",
                    url: "REST_api/timeline_subjects?user_id=" + user_id + "&start=0",
                    processData: false,
                    contentType: "application/json",
                    data: '',
                    success: function (r) {

                        var posts = JSON.parse(r);

                        if (posts.length > 1) {

                            $.each(posts, function (index) {

                                console.log(posts[index].PostId);

                                $('#subjects').html(
                                    $('#subjects').html() + '<div class="conatiner d-flex flex-row" id="timeline_posts"style="scroll-padding-left: 10px;"><div class="p-1 flex-column" id="tl_profile_img_container"> <img ' + display_profile_image(posts[index].PostedByImg) + ' class= "profile_image rounded-circle border img-responsive shadow-sm visible" id = "profile_img_tl" loading = "lazy" > </div > <div class="p-1 flex-fill post_body_container"> <div class="d-flex p-0"> <table> <tr> <td colspan="2"><strong onclick = "window.location.href = \'profile1.php?username=' + posts[index].PostedByName + '\'">' + posts[index].PostedByName + '</strong>  ∙  ' + posts[index].PostedByDesignation + ' ∙ ' + time_conversion(posts[index].PostedAt) + '</tr><tr><td>' + posts[index].PostedByInstitution + '</td></tr></table><div class="three_dots ml-auto ml-left "><div class="dropdown p-1 "><button class="fa fa-chevron-down post_options_btn drop" type="button" data-toggle="dropdown"id="dropdownMenuButton" aria-haspopup="true" aria-expanded="false"></button><div class="dropdown-menu dropdown-menu-right options_dropdown_menu" aria-labelledby="dropdownMenuButton" data-post_options = "' + posts[index].PostId + '"></div></div></div></div><div class="d-flex p-0"><div class="p-1" id="tl_post_topic"><small> ' + posts[index].PostTopic + ' </small></div><div class="p-1" id="tl_post_type"><small>' + posts[index].PostType + '</small></div> </div> <div class="p-0"><span data-post_body= "' + posts[index].PostId + '">' + posts[index].PostBody + '</span><div data-topic_post_files = "' + posts[index].PostId + '"></div><div class="d-flex p-1 flex-fill justify-content-around"><div class="p-1"><button class="post_icon" id="like_btn" data-id="' + posts[index].PostId + '"><i class="fa fa-check-square-o " ></i><span><small>  ' + posts[index].PostLikes + '</small></span></button></div><div class="p-1"><button class="post_icon" id="comment_btn" data-post_id="' + posts[index].PostId + '"><i class="fa fa-comment-o " ></i><span><small>  ' + posts[index].PostComments + '</small></span></button></div><div class="p-1"><button class="post_icon"><button class="post_icon" id="share_btn" data-share_post_id = "' + posts[index].PostId + '"><i class="fa fa-share-alt " ></i><span><small>  ' + posts[index].PostShares + '</small></span></button></div></div></div></div></div>'
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

                        //handler for deleting posts
                        $('[data-delete_post]').click(function () {
                            var post_id = $(this).attr('data-delete_post');

                            delete_post(post_id);
                        });

                        //handler for reporting a post
                        $('[data-report_post]').click(function () {

                            var post_id = $(this).attr('data-report_post');

                            report_post(post_id);
                        });

                        $('[data-post_body]').click(function () {
                            var post_id = $(this).attr('data-post_body');

                            $('[data-post_id="' + post_id + '"]').click();
                        });

                        //ajax handler for displaying comments
                        $('[data-post_id]').click(function () {
                            var button_id = $(this).attr('data-post_id');

                            get_comments(button_id, user_id);
                        });

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

                    },
                    error: function (r) {
                        console.log(r)
                    }

                });

            });

        } else if (details.Status == "Not logged in") {
            window.location.href = 'login.html';
        } else if (details.Status == "Admin") {
            window.location.href = 'admin_dashboard.html';
        }

    },
    error: function (r) {
        console.log(r);

    }
});