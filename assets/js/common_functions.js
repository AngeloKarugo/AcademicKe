function get_username(username) {
    return username
}

//ajax call for files attached to a post
function file_finder(data_attr, PostId) {
    $.ajax({
        method: "GET",
        url: "REST_api/files?post_id=" + PostId,
        processData: false,
        contentType: "application/json",
        data: '',
        success: function (r) {
            var files = JSON.parse(r || '{}');

            if (files.length > 0) {



                $.each(files, function (i) {

                    if (files[i].FileType == "doc") {
                        console.log("file here" + PostId);

                        $('[data-' + data_attr + ' = "' + PostId + '"]').html($('[data-' + data_attr + ' = "' + PostId + '"]').html() + '<div class="files_container flex-column d-flex" data-' + data_attr + '_container = "' + PostId + '"><div class="d-flex flex-row file_row" onclick = "window.open(\'' + files[i].FileAddress + '\')"><i class="fa fa-link align-self-center file_icon"></i><span class="file_link "> ' + files[i].FileName + '</span> </div></div>'
                        );

                    }

                })

            }
        },

        error: function (r) {

        }
    });
}

//ajax handler for logging out
function logout() {
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
        })
    });

    $('#log_out_all_button').click(function () {
        $.ajax({
            method: "DELETE",
            url: "REST_api/auth?all",
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
        })
    })
}

String.prototype.escape_special_chars = function () {
    return this.replace(/\n/g, "\\n").replace(/\'/g, "\\'").replace(/\"/g, '\\"').replace(/\&/g, "\\&").replace(/\t/g, "\\t").replace(/\b/g, "\\b").replace(/\f/g, "\\f");
}

//this guy displays the tooltips
$(function () {
    $("[data-toggle = 'tooltip']").tooltip();
})

//this is the guy responsible for rating a comment
function rating_system(rating, comment_id) {

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
                    url: "REST_api/rate_comment?comment_id=" + comment_id,
                    processData: false,
                    contentType: "application/json",
                    data: '{"rating": "' + rating + '"}',
                    success: function (r) {

                        var res = JSON.parse(r)
                        console.log(res);

                        $('[data-comment_id = "' + comment_id + '"]').text('Rating: ' + res.Rating + '');

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

}

//this guy is meant to display comments
function get_comments(post_id, user_id) {

    $.ajax({
        method: "GET",
        url: "REST_api/comments?post_id=" + post_id,
        processData: false,
        contentType: "application/json",
        data: '',
        success: function (r) {

            var comment = JSON.parse(r || "{}");

            $.each(comment, function (index) {

                // comment[index].CommentedAt = time_conversion(comment[index].CommentedAt);

                // comment[index].PostedAt = time_conversion(comment[index].PostedAt);

                $('#comment_modal').modal('show');

                var output = '<div class="conatiner d-flex flex-row" id="timeline_posts"style="scroll-padding-left: 10px;"><div class="p-1 flex-column" id="tl_profile_img_container"> <img ' + display_profile_image(comment[0].PostedByImg) + ' class= "profile_image rounded-circle border img-responsive shadow-sm visible" id = "profile_img_tl_comments" loading = "lazy" > </div > <div class="p-1 flex-fill"> <div class="d-flex p-0"> <table> <tr> <td colspan="2"><strong onclick = "window.location.href = \'profile1.php?username=' + comment[0].PostedByName + '\'">' + comment[0].PostedByName + '</strong>  ∙  ' + comment[0].PostedByDesignation + ' ∙ ' + time_conversion(comment[0].PostedAt) + '</tr><tr><td>' + comment[0].PostedByInstitution + '</td></tr></table><div class="three_dots ml-auto ml-left"><div class="dropdown p-1 "><button class="fa fa-chevron-down post_options_btn drop" type="button" data-toggle="dropdown"id="dropdownMenuButton" aria-haspopup="true" aria-expanded="false"></button><div class="dropdown-menu dropdown-menu-right options_dropdown_menu" aria-labelledby="dropdownMenuButton" data-comment_post_options = "' + comment[0].PostId + '"></div></div></div></div><div class="d-flex p-0"><div class="p-1" id="tl_post_topic"><small> ' + comment[0].PostTopic + ' </small></div><div class="p-1" id="tl_post_type"><small>' + comment[0].PostType + '</small></div> </div> <div class="p-0"><p>' + comment[0].PostBody + '</p><div class="d-flex p-2 flex-fill justify-content-around"><div class="p-2"><button class="post_icon" id="like_btn" data-id_comment="' + comment[0].PostId + '"><i class="fa fa-check-square-o " style = "color: grey"></i><span><small>  ' + comment[0].PostLikes + '</small></span><!--</button>--!></div><div class="p-2"><!--<button class="post_icon" id="comment_btn" data-post_id="' + comment[0].PostId + '">--!><i class="fa fa-comment-o " style = "color: grey"></i><span><small>  ' + comment[0].PostComments + '</small></span><!--</button>--!></div><div class="p-2"><button class="post_icon" data-share_post_id = "' + comment[0].PostId + '" id="share_btn"><i class="fa fa-share-alt " style = "color: grey"></i><span><small>  ' + comment[0].PostShares + '</small></span></button></div></div></div></div></div><div class="p-1 d-flex flex-fill justify-content-center">  <textarea class = "p-1 form_control" rows = "3" id = "comment_input" placeholder = "Write your response..."></textarea> </div> <div> <button class="btn btn-default d-flex ml-auto ml-left" id = "post_comment_btn" data-comment_post_id = "' + comment[0].PostId + '"><small>Respond</small></button> </div><hr><div class="p-2 d-flex flex-fill"><strong>Responses:</strong></div>';

                if (comment.length > 1) {

                    for (var i = 1; i < comment.length; i++) {

                        comment[i].CommentBody = decodeURIComponent(comment[i].CommentBody);
                        comment[i].CommentBody = comment[i].CommentBody.replace("<", "&lt;");
                        comment[i].CommentBody = comment[i].CommentBody.replace(">", "&gt;>");
                        comment[i].CommentBody = comment[i].CommentBody.replace("%2F", "\\/");

                        output += '<div class="conatiner d-flex flex-row " id="comments_modal" style="scroll-padding-left: 10px;"> <div class="p-1 flex-column " id="tl_profile_img_container"> <img ' + display_profile_image(comment[i].CommentedByImg) + ' class="profile_image_comments rounded-circle border img-responsive shadow-sm visible" id="profile_img_comments' + i + '"  loading="lazy"> </div> <div class="p-1 flex-fill "> <div class="d-flex p-0 "> <table> <tr> <td colspan="3"><strong onclick = "window.location.href = \'profile1.php?username=' + comment[i].CommentedBy + '\'">' + comment[i].CommentedBy + '</strong>  ∙  ' + time_conversion(comment[i].CommentedAt) + '</td> </tr> <tr> </tr> </table> <div class="three_dots ml-auto ml-left"><div class="dropdown p-1 "><button class="fa fa-chevron-down post_options_btn drop" type="button" data-toggle="dropdown"id="dropdownMenuButton" aria-haspopup="true" aria-expanded="false"></button><div class="dropdown-menu dropdown-menu-right options_dropdown_menu" aria-labelledby="dropdownMenuButton">' + get_comment_owner(comment[i].CommentedById, user_id, comment[i].CommentID) + '</div></div></div> </div> <div class="p-0 "> <span>' + comment[i].CommentBody + '</span><br> <!-- <div class="d-flex p-2  flex-fill justify-content-around"> <div class="p-2 "><a href="#"><i class="fa fa-check-square-o post_icon"></i></a><span><small></small></span></div> <div class="p-2 "><a href="#"><i class="fa fa-comment-o post_icon"></i></a><span><small></small></span></div> <div class="p-2 "><a href="#"><i class="fa fa-share-alt post_icon"></i></a><span><small></small></span></div> </div> --!><div class = "p-0  d-flex justify-content-end flex-fill"><span data-comment_id = "' + comment[i].CommentID + '"> ' + show_rating(comment[i].CommentRating) + ' </span></div> <label for = "comment_rating"><small>Rate this response</small></label> <div class="d-flex p-0 "><input class = "custom-range" type = "range" data-range_comment_rating = "' + comment[i].CommentID + '" id = "comment_rating_range' + i + '" onmouseup = "rating_system(this.value, ' + comment[i].CommentID + ')" ontouchend = "rating_system(this.value, ' + comment[i].CommentID + ')" min="0" max = "10" step = "0.5" name = "comment_rating" oninput = "comment_rating_range_output' + i + '.value = this.value"></input><input class = "input_range" type="text" id = "comment_rating_range_output' + i + '" value="0" disabled></input></div> <hr></div></div> </div> </div>';

                    }

                    //modify content of the modal window, set the post to be displayed before the comments
                }

                $('#modal_comments').html(output);

                //handler for the dropdown menu display
                if (user_id == comment[0].PostedById) {
                    $('[data-comment_post_options = "' + comment[0].PostId + '"]').html(
                        $('[data-comment_post_options = "' + comment[0].PostId + '"]').html() + '<button class="dropdown-item tl_post_options" data-delete_post = "' + comment[0].PostId + '">Delete</button>'
                    )
                } else {
                    $('[data-comment_post_options = "' + comment[0].PostId + '"]').html(
                        $('[data-comment_post_options = "' + comment[0].PostId + '"]').html() + '<button class="dropdown-item tl_post_options" data-report_post = "' + comment[0].PostId + '">Report</button>'
                    )
                }

                //ajax handler for deleting a comment
                $('[data-delete_comment]').click(function () {
                    var comment_id = $(this).attr('data-delete_comment');

                    $.ajax({
                        method: "DELETE",
                        url: "REST_api/comment?comment_id=" + comment_id,
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
                })

                //ajax handler for posting a response
                $('#post_comment_btn').click(function () {

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

                        $('#comment_modal').modal('hide');

                    }
                })

                //liking a post through the comments modal
                $('[data-id_comment]').click(function () {

                    var button_id = $(this).attr('data-id_comment');

                    like_post(button_id);
                })

                //reposting a post through the comments modal
                $('[data-share_post_id]').click(function () {

                    var button_id = $(this).attr('data-share_post_id');

                    rePost_post(button_id);
                })

                //set the share button to green if the user has liked that post
                if (comment[0].PostIsShared) {
                    $("[data-share_post_id='" + comment[0].PostId + "']").css("color", "limegreen");
                }


                if (comment[0].PostIsLiked) {
                    $("[data-id_comment='" + comment[0].PostId + "']").css("color", "limegreen");
                }


            });

            console.log(comment);
        },

        error: function () {
            console.log('error');
        }
    })
}

//the guy who deletes posts is this one
function delete_post(post_id) {
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
    });
}

//the guy who reports posts
function report_post(post_id) {
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

                                        $('#report_modal').modal('hide');

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
}

//the guy who likes a post
function like_post(post_id) {
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
                    url: "REST_api/likes?post_id=" + post_id,
                    processData: false,
                    contentType: "application/json",
                    data: '',
                    success: function (r) {
                        var res = JSON.parse(r)
                        $("[data-id='" + post_id + "']").html('<i class="fa fa-check-square-o"></i><span ><small>  ' + res.PostLikes + '</small></span>');

                        if (res.PostIsLiked) {
                            $("[data-id='" + post_id + "']").css("color", "limegreen");
                        } else {
                            $("[data-id='" + post_id + "']").css("color", "grey");
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
}

//the guy who rePosts a post
function rePost_post(post_id) {
    $.ajax({
        method: "POST",
        url: "REST_api/share?post_id=" + post_id,
        processData: false,
        contentType: "application/json",
        data: '',
        success: function (r) {
            var res = JSON.parse(r)

            $("[data-share_post_id='" + post_id + "']").html('<i class="fa fa-share-alt "></i><span ><small>  ' + res.PostShares + '</small></span>');

            if (res.PostIsShared) {
                $("[data-share_post_id='" + post_id + "']").css("color", "limegreen");
            } else {
                $("[data-share_post_id='" + post_id + "']").css("color", "grey");
            }

            console.log(res);
        },

        error: function () {
            console.log('error');
        }
    })
}

//to help decide whether to display the rating or not
function show_rating(rating) {
    if (rating.length > 0) {
        return 'Rating: ' + rating + '';
    } else {
        return '';
    }
}

//this is the guy who changes post time from 187353768329 to 5 days.
function time_conversion(time) {
    const current_date = new Date();

    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const days = ["", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

    const actual_date = new Date(time * 1000); //convert timestamp to date

    var date_difference = current_date - actual_date;

    var date_difference_in_seconds = Math.floor((date_difference) / 1000);

    var date_difference_in_minutes = Math.floor(date_difference_in_seconds / 60);

    var date_difference_in_hours = Math.floor(date_difference_in_minutes / 60);

    var date_difference_in_days = Math.floor(date_difference_in_hours / 24);

    var date_difference_in_years = Math.floor(date_difference_in_days / 365.25);

    // console.log(date_difference_in_hours);

    if (date_difference_in_seconds < 60) {
        //if less than 1 minute ago
        time = date_difference_in_seconds + 'sec';
    } else if ((date_difference_in_minutes >= 1) && (date_difference_in_minutes < 60)) {
        //if between 1 minute and 1 hour ago
        time = date_difference_in_minutes + 'min';
    } else if ((date_difference_in_hours >= 1) && (date_difference_in_hours < 24)) {
        //if date between 1 hour and 1 day ago
        time = date_difference_in_hours + 'h';
    } else if ((date_difference_in_days >= 1) && (date_difference_in_days < 7)) {
        //if date between 1 day and 7 days ago
        time = days[date_difference_in_days];
    } else if ((date_difference_in_days >= 7) && (date_difference_in_years < 1)) {
        time = months[actual_date.getUTCMonth()] + ', ' + actual_date.getDate();
    } else if (date_difference_in_years > 1) {
        time = actual_date.getFullYear() + ', ' + months[actual_date.getMonth()] + ' ' + actual_date.getDate();
    }

    return time;
}

//this guy displays the image if it exists
function display_profile_image(image) {
    if (image) {
        return 'src = "' + image + '"'
    }
}

//function for setting new values for input fields in profile editing page
function setnewvalue(value, class_name) {
    window.localStorage.setItem(class_name, value);
    $('.' + class_name).html(value);
    $('#save_changes').css({ "visibility": "visible" });
}

//this guy displays the initial text in the update profile fields
function show_old_value(class_name, value) {
    $('.' + class_name).html(value);
}

//this guy displays the selected image before it is uploaded
function show_image(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#profile_img_edit_profile_page').attr('src', e.target.result);

            // $('.profile_image').Jcrop({
            //     // onselect: updateCoords,
            //     bgOpacity: .4,
            //     setSelect: [100, 100, 50, 50],
            //     aspectRatio: 1/1
            // });
        };

        reader.readAsDataURL(input.files[0]);
        $('#save_changes').css({ "visibility": "visible" });
    }
}

//this guy was supposed to help me with esaping special characters in comments, but i patched it up with URIencode() `\'_'/`
String.prototype.escape_special_chars = function () {
    return this.replace(/\n/g, "\\n").replace(/\'/g, "\\'").replace(/\"/g, '\\"').replace(/\&/g, "\\&").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/\b/g, "\\b").replace(/\f/g, "\\f");
}

//this guy validates the files on the new post form to ensure only pdfs, spreadsheets and valid image formats can be uploaded
function validate_pdf_upload(file_type) {

    // var file_name = file_name.value;

    if (file_type == 'doc') {

        var input_files = document.getElementById('post_pdf_upload');

        var files = input_files.files;

        var file;

        // var feedback = document.getElementById('pdf_feedback');
        $('#pdf_feedback').html('');
        $('#submit_post').removeAttr('disabled');

        var extensions = new Array("pdf", "xls", "xlsx");

        for (let i = 0; i < files.length; i++) {

            var file = files[i];

            var file_name = file.name;

            var file_extension = file_name.split('.').pop();

            var file_extension = file_extension.toLowerCase();

            if (extensions.includes(file_extension)) {
                $('#pdf_feedback').html($('#pdf_feedback').html() + file_name + '<br/>');
            } else {
                $('#pdf_feedback').html('*only pdf and xls spreadsheets allowed. Please select a different file<br/>');
                $('#submit_post').prop('disabled', true);
                return false;
            }

        }

    }

    if (file_type == 'img') {

        var input_files = document.getElementById('post_img_upload');

        var files = input_files.files;

        var file;

        // var feedback = document.getElementById('pdf_feedback');
        $('#img_feedback').html('');

        $('#submit_post').removeAttr('disabled');

        var extensions = new Array("jpeg", "jpg", "png");

        for (let i = 0; i < files.length; i++) {

            var file = files[i];

            var file_name = file.name;

            var file_extension = file_name.split('.').pop();

            var file_extension = file_extension.toLowerCase();

            if (extensions.includes(file_extension)) {
                $('#img_feedback').html($('#img_feedback').html() + file_name + '<br/>');
            } else {
                $('#img_feedback').html('*only .jpeg, .jpg & .png extensions allowed . Please select a different image<br/>');
                $('#submit_post').prop('disabled', true);

                return false;
            }

        }
    }


}

//this guy helps decide whether to dislplay 'report' or 'delete' on the comments options toggle
function get_comment_owner(comment_owner, logged_in_user, comment_id) {
    //handler for the dropdown menu display
    if (logged_in_user == comment_owner) {
        return '<button class="dropdown-item tl_post_options" data-delete_comment = "' + comment_id + '">Delete</button>';
    } else {
        return '<button class="dropdown-item tl_post_options" data-report_comment = "' + comment_id + '">Report</button>';
    }
}

//this guy is responsible for scrolling to the searched for post
function scrollToAnchor(aid) {
    try {
        var aTag = $(aid);
        $('html,body').animate({ scrollTop: aTag.offset().top }, 'slow');
    } catch (error) {
        console.log(error)
    }
}