$(document).ready(function () {

    var username = <? php ?>
        $.ajax({

            method: "GET",
            url: "REST_api/profile?username=?",
            processData: false,
            contentType: "application/json",
            data: '',
            success: function (r_t) {

                var posts_t = JSON.parse(r_t);

                // document.getElementById('username_page_top').innerHTML = r.Username;

                console.log(r_t);

                $.each(posts_t, function (index_t) {

                    const current_date = new Date();
                    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",];

                    const post_date = new Date(posts_t[index_t].T_PostedAt * 1000);

                    var date_difference = current_date - post_date;

                    var date_difference_in_seconds = Math.floor((current_date - post_date) / 1000);

                    var date_difference_in_minutes = Math.floor(date_difference_in_seconds / 60);

                    var date_difference_in_hours = Math.floor(date_difference_in_minutes / 60);

                    var date_difference_in_days = Math.floor(date_difference_in_hours / 24);

                    var date_difference_in_years = Math.floor(date_difference_in_days / 365.25);

                    // console.log(date_difference_in_hours);

                    if (date_difference_in_seconds < 60) {
                        posts_t[index_t].T_PostedAt = date_difference_in_seconds + 'sec';
                    } else if ((date_difference_in_seconds >= 60) && (date_difference_in_minutes < 60)) {
                        posts_t[index_t].T_PostedAt = date_difference_in_minutes + 'min';
                    } else if ((date_difference_in_minutes >= 60) && (date_difference_in_hours < 24)) {
                        posts_t[index_t].T_PostedAt = date_difference_in_hours + 'h';
                    } else if ((date_difference_in_hours >= 24) && (date_difference_in_days < 7)) {
                        posts_t[index_t].T_PostedAt = date_difference_in_days + 'd';
                    } else if ((date_difference_in_days > 7) && (date_difference_in_years < 1)) {
                        posts_t[index_t].T_PostedAt = months[post_date.getUTCMonth()] + ', ' + post_date.getUTCDay();
                        ;
                    } else {
                        posts_t[index_t].T_PostedAt = post_date.getUTCFullYear() + ', ' + months[post_date.getUTCMonth()] + ' ' + post_date.getUTCDay();
                        ;
                    }

                    $('#tab-2').html(
                        $('#tab-2').html() + '<div class="conatiner d-flex flex-row bd-highlight" id="timeline_posts"style="scroll-padding-left: 10px;"><div class="p-1 flex-column bd-highlight" id="tl_profile_img_container"> <img class= "rounded-circle border img-responsive shadow-sm visible" id = "profile_img_tl" loading = "lazy" > </div > <div class="p-1 flex-fill bd-highlight"> <div class="d-flex p-0 bd-highlight"> <table> <tr> <td colspan="2">' + posts_t[index_t].T_PostedByName + '  ∙  ' + posts_t[index_t].T_PostedByDesignation + ' ∙ ' + posts_t[index_t].T_PostedAt + '</tr><tr><td>' + posts_t[index_t].T_PostedByInstitution + '</td></tr></table><div id="tl_post_options" class="p-1 ml-auto ml-left bd-highlight"><small>...</small></div></div><div class="d-flex p-0 bd-highlight"><div class="p-1 bd-highlight" id="tl_post_topic"><small> ' + posts_t[index_t].T_PostTopic + ' </small></div><div class="p-1 bd-highlight" id="tl_post_type"><small>' + posts_t[index_t].T_PostType + '</small></div> </div> <div class="p-0 bd-highlight"><span>' + posts_t[index_t].T_PostBody + '</span><div class="d-flex p-1 bd-highlight flex-fill justify-content-around"><div class="p-1 bd-highlight"><button class="post_icon" id="like_btn" data-id="' + posts_t[index_t].T_PostId + '"><i class="fa fa-check-square-o " ></i><span><small>  ' + posts_t[index_t].T_PostLikes + '</small></span></button></div><div class="p-1 bd-highlight"><button class="post_icon" id="comment_btn" data-post_id="' + posts_t[index_t].T_PostId + '"><i class="fa fa-comment-o " ></i><span><small>  ' + posts_t[index_t].T_PostComments + '</small></span></button></div><div class="p-1 bd-highlight"><button class="post_icon"><button class="post_icon" id="share_btn" data-shared_post_id = "' + posts_t[index_t].T_PostId + '"><i class="fa fa-share-alt " ></i><span><small>  ' + posts_t[index_t].T_PostShares + '</small></span></button></div></div></div><hr></div></div>'
                    )
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

                                    const current_date = new Date();

                                    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",];



                                    const comment_post_date = new Date(comment[index].PostedAt * 1000);

                                    var date_difference = current_date - comment_post_date;

                                    var date_difference_in_seconds = Math.floor((current_date - comment_post_date) / 1000);

                                    var date_difference_in_minutes = Math.floor(date_difference_in_seconds / 60);

                                    var date_difference_in_hours = Math.floor(date_difference_in_minutes / 60);

                                    var date_difference_in_days = Math.floor(date_difference_in_hours / 24);

                                    var date_difference_in_years = Math.floor(date_difference_in_days / 365.25);

                                    // console.log(date_difference_in_hours);

                                    if (date_difference_in_seconds < 60) {
                                        comment[index].PostedAt = date_difference_in_seconds + 'sec';
                                    } else if ((date_difference_in_seconds >= 60) && (date_difference_in_minutes < 60)) {
                                        comment[index].PostedAt = date_difference_in_minutes + 'min';
                                    } else if ((date_difference_in_minutes >= 60) && (date_difference_in_hours < 24)) {
                                        comment[index].PostedAt = date_difference_in_hours + 'h';
                                    } else if ((date_difference_in_hours >= 24) && (date_difference_in_days < 7)) {
                                        comment[index].PostedAt = date_difference_in_days + 'd';
                                    } else if ((date_difference_in_days > 7) && (date_difference_in_years < 1)) {
                                        comment[index].PostedAt = months[post_date.getUTCMonth()] + ', ' + post_date.getUTCDay();
                                        ;
                                    } else {
                                        comment[index].PostedAt = post_date.getUTCFullYear() + ', ' + months[post_date.getUTCMonth()] + ' ' + post_date.getUTCDay();
                                        ;
                                    }

                                    $('.modal').modal('show');

                                    var output = '<div class="conatiner d-flex flex-row bd-highlight" id="timeline_posts"style="scroll-padding-left: 10px;"><div class="p-1 flex-column bd-highlight" id="tl_profile_img_container"> <img class= "rounded-circle border img-responsive shadow-sm visible" id = "profile_img_tl" loading = "lazy" > </div > <div class="p-1 flex-fill bd-highlight"> <div class="d-flex p-0 bd-highlight"> <table> <tr> <td colspan="2">' + comment[0].PostedByName + '  ∙  ' + comment[0].PostedByDesignation + ' ∙ ' + comment[0].PostedAt + '</tr><tr><td>' + comment[0].PostedByInstitution + '</td></tr></table><div id="tl_post_options" class="p-1 ml-auto ml-left bd-highlight"><small>...</small></div></div><div class="d-flex p-0 bd-highlight"><div class="p-1 bd-highlight" id="tl_post_topic"><small> ' + comment[0].PostTopic + ' </small></div><div class="p-1 bd-highlight" id="tl_post_type"><small>' + comment[0].PostType + '</small></div> </div> <div class="p-0 bd-highlight"><p>' + comment[0].PostBody + '</p><div class="d-flex p-2 bd-highlight flex-fill justify-content-around"><div class="p-2 bd-highlight"><button class="post_icon" id="like_btn" data-id_comment="' + comment[0].PostId + '"><i class="fa fa-check-square-o " style = "color: grey"></i><span><small>  ' + comment[0].PostLikes + '</small></span><!--</button>--!></div><div class="p-2 bd-highlight"><!--<button class="post_icon" id="comment_btn" data-post_id="' + comment[0].PostId + '">--!><i class="fa fa-comment-o " style = "color: grey"></i><span><small>  ' + comment[0].PostComments + '</small></span><!--</button>--!></div><div class="p-2 bd-highlight"><!--<button class="post_icon" id="share_btn" disabled>--!><i class="fa fa-share-alt " style = "color: grey"></i><span><small>  ' + comment[0].PostShares + '</small></span><!--</button>--!></div></div></div></div></div><hr><div class="p-1 d-flex flex-fill bd-highlight justify-content-center">  <textarea class = "p-1 bd-highlight form_control" rows = "3" id = "comment_input" placeholder = "Write your response..."></textarea> </div> <div> <button class="btn btn-default d-flex ml-auto ml-left" id = "post_comment_btn"><small>Respond</small></button> </div><hr><div class="p-2 bd-highlight d-flex flex-fill"><strong>Responses:</strong></div>';

                                    if (comment.length > 1) {

                                        for (var i = 1; i < comment.length; i++) {


                                            if (comment[i].CommentRating.length > 0) {
                                                // var comment_rating = Math.round(comment[i].CommentRating);
                                                const comment_date = new Date(comment[i].CommentedAt * 1000);

                                                var date_difference = current_date - comment_date;

                                                var date_difference_in_seconds = Math.floor((current_date - comment_date) / 1000);

                                                var date_difference_in_minutes = Math.floor(date_difference_in_seconds / 60);

                                                var date_difference_in_hours = Math.floor(date_difference_in_minutes / 60);

                                                var date_difference_in_days = Math.floor(date_difference_in_hours / 24);

                                                var date_difference_in_years = Math.floor(date_difference_in_days / 365.25);

                                                // console.log(date_difference_in_hours);

                                                if (date_difference_in_seconds < 60) {
                                                    comment[i].CommentedAt = date_difference_in_seconds + 'sec';
                                                } else if ((date_difference_in_seconds >= 60) && (date_difference_in_minutes < 60)) {
                                                    comment[i].CommentedAt = date_difference_in_minutes + 'min';
                                                } else if ((date_difference_in_minutes >= 60) && (date_difference_in_hours < 24)) {
                                                    comment[i].CommentedAt = date_difference_in_hours + 'h';
                                                } else if ((date_difference_in_hours >= 24) && (date_difference_in_days < 7)) {
                                                    comment[index].CommentedAt = date_difference_in_days + 'd';
                                                } else if ((date_difference_in_days > 7) && (date_difference_in_years < 1)) {
                                                    comment[i].CommentedAt = months[post_date.getUTCMonth()] + ', ' + comment_date.getUTCDay();
                                                    ;
                                                } else {
                                                    comment[i].CommentedAt = comment_date.getUTCFullYear() + ', ' + months[comment_date.getUTCMonth()] + ' ' + comment_date.getUTCDay();
                                                    ;
                                                }

                                                output += '<div class="conatiner d-flex flex-row bd-highlight" id="comments_modal" style="scroll-padding-left: 10px;"> <div class="p-1 flex-column bd-highlight" id="tl_profile_img_container"> <img class="rounded-circle border img-responsive shadow-sm visible" id="profile_img_comments"  loading="lazy"> </div> <div class="p-1 flex-fill bd-highlight"> <div class="d-flex p-0 bd-highlight"> <table> <tr> <td colspan="3">' + comment[i].CommentedBy + '  ∙  ' + comment[i].CommentedAt + '</td> </tr> <tr> </tr> </table> <div id="tl_post_options" class="p-1 ml-auto ml-left bd-highlight"><small>...</small> </div> </div> <div class="p-0 bd-highlight"> <p>' + comment[i].CommentBody + '</p> <!-- <div class="d-flex p-2 bd-highlight flex-fill justify-content-around"> <div class="p-2 bd-highlight"><a href="#"><i class="fa fa-check-square-o post_icon"></i></a><span><small></small></span></div> <div class="p-2 bd-highlight"><a href="#"><i class="fa fa-comment-o post_icon"></i></a><span><small></small></span></div> <div class="p-2 bd-highlight"><a href="#"><i class="fa fa-share-alt post_icon"></i></a><span><small></small></span></div> </div> --!><div class = "p-0 bd-highlight d-flex justify-content-end flex-fill"><span> Rating: ' + comment[i].CommentRating + '</span></div> <label for = "comment_rating"><small>Rate this response</small></label> <div class="d-flex p-0 bd-highlight"><input class = "custom-range" type = "range" data-range_comment_rating = "' + comment[i].CommentID + '" id = "comment_rating_range' + i + '" onmouseup = "rating_system(this.value, ' + comment[i].CommentID + ')" min="0" max = "10" step = "0.5" name = "comment_rating" oninput = "comment_rating_range_output' + i + '.value = this.value"></input><input class = "input_range" type="text" id = "comment_rating_range_output' + i + '" value="0" disabled></input></div> <hr></div></div> </div> </div>';
                                            } else {
                                                output += '<div class="conatiner d-flex flex-row bd-highlight" id="comments_modal" style="scroll-padding-left: 10px;"> <div class="p-1 flex-column bd-highlight" id="tl_profile_img_container"> <img class="rounded-circle border img-responsive shadow-sm visible" id="profile_img_comments"  loading="lazy"> </div> <div class="p-1 flex-fill bd-highlight"> <div class="d-flex p-0 bd-highlight"> <table> <tr> <td colspan="3">' + comment[i].CommentedBy + '  ∙  ' + comment[i].CommentedAt + '</td> </tr> <tr> </tr> </table> <div id="tl_post_options" class="p-1 ml-auto ml-left bd-highlight"><small>...</small> </div> </div> <div class="p-0 bd-highlight"> <p>' + comment[i].CommentBody + '</p> <!-- <div class="d-flex p-2 bd-highlight flex-fill justify-content-around"> <div class="p-2 bd-highlight"><a href="#"><i class="fa fa-check-square-o post_icon"></i></a><span><small></small></span></div> <div class="p-2 bd-highlight"><a href="#"><i class="fa fa-comment-o post_icon"></i></a><span><small></small></span></div> <div class="p-2 bd-highlight"><a href="#"><i class="fa fa-share-alt post_icon"></i></a><span><small></small></span></div> </div> --!> <label for = "comment_rating"><small>Rate this response</small></label> <div class="d-flex p-0 bd-highlight"><input class = "custom-range" type = "range" data-range_comment_rating = "' + comment[i].CommentID + '" id = "comment_rating_range' + i + '" onmouseup = "rating_system(this.value, ' + comment[i].CommentID + ')" min="0" max = "10" step = "0.5" name = "comment_rating" oninput = "comment_rating_range_output' + i + '.value = this.value"></input><input class = "input_range" type="text" id = "comment_rating_range_output' + i + '" value="0" disabled></input></div> <hr></div></div> </div> </div>';
                                            }



                                        }

                                        //modify content of the modal window, set the post to be displayed before the comments
                                    } else {
                                        var output = '<div class="conatiner d-flex flex-row bd-highlight" id="timeline_posts"style="scroll-padding-left: 10px;"><div class="p-1 flex-column bd-highlight" id="tl_profile_img_container"> <img class= "rounded-circle border img-responsive shadow-sm visible" id = "profile_img_tl" loading = "lazy" > </div > <div class="p-1 flex-fill bd-highlight"> <div class="d-flex p-0 bd-highlight"> <table> <tr> <td colspan="2">' + comment[index].PostedByName + '  ∙  ' + comment[index].PostedByDesignation + ' ∙ ' + comment[index].PostedAt + '</tr><tr><td>' + comment[index].PostedByInstitution + '</td></tr></table><div id="tl_post_options" class="p-1 ml-auto ml-left bd-highlight"><small>...</small></div></div><div class="d-flex p-0 bd-highlight"><div class="p-1 bd-highlight" id="tl_post_topic"><small> ' + comment[index].PostTopic + ' </small></div><div class="p-1 bd-highlight" id="tl_post_type"><small>' + comment[index].PostType + '</small></div> </div> <div class="p-0 bd-highlight"><p>' + comment[index].PostBody + '</p><div class="d-flex p-2 bd-highlight flex-fill justify-content-around"><div class="p-2 bd-highlight"><button class="post_icon" id="like_btn" data-id_comment="' + comment[index].PostId + '"><i class="fa fa-check-square-o " style = "color: grey"></i><span><small>  ' + comment[index].PostLikes + '</small></span><!--</button>--!></div><div class="p-2 bd-highlight"><!--<button class="post_icon" id="comment_btn" data-post_id="' + comment[index].PostId + '">--!><i class="fa fa-comment-o " style = "color: grey"></i><span><small>  ' + comment[index].PostComments + '</small></span><!--</button>--!></div><div class="p-2 bd-highlight"><button class="post_icon" id="share_btn" data-id_comment="' + comment[index].PostId + '" disabled><i class="fa fa-share-alt " style = "color: grey"></i><span><small>  ' + comment[index].PostShares + '</small></span></button></div></div></div></div></div><hr><div class="p-1 d-flex flex-fill bd-highlight justify-content-center">  <textarea class = "p-1 bd-highlight form_control" rows = "3" id = "comment_input" placeholder = "Write your response..."></textarea> </div> <div> <button class="btn btn-default d-flex ml-auto ml-left" id = "post_comment_btn"><small>Respond</small></button> </div><hr><div class="p-2 bd-highlight d-flex flex-fill"><strong>Responses:</strong></div>';
                                    }

                                    $('.modal-body').html(output);

                                    $('.modal').modal('show');

                                    var comment_rate = document.getElementById("comment_rating").value;

                                    $('[data-id_comment]').click(function () {

                                        var button_id = $(this).attr('data-id_comment');

                                        $.ajax({
                                            method: "POST",
                                            url: "REST_api/likes?post_id=" + $(this).attr('data-id_comment'),
                                            processData: false,
                                            contentType: "application/json",
                                            data: '',
                                            success: function (r) {
                                                var res = JSON.parse(r)
                                                $("[data-id_comment='" + button_id + "']").html('<i class="fa fa-check-square-o"></i><span ><small>  ' + res.PostLikes + '</small></span>');

                                                if (res.PostIsLiked) {
                                                    $("[data-id_comment='" + button_id + "']").css("font-color", "limegreen");
                                                } else {
                                                    $("[data-id_comment='" + button_id + "']").css("color", "grey");
                                                }

                                                console.log(res);
                                            },

                                            error: function () {
                                                console.log('error');
                                            }
                                        })
                                    })

                                    if (comment[0].PostIsLiked) {
                                        $("[data-id_comment='" + comment[0].PostId + "']").css("color", "limegreen");
                                    }

                                    if (comment[0].PostIsShared) {
                                        $("[data-shared_post_id_comment='" + comment[0].PostId + "']").css("color", "limegreen");
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
                            method: "POST",
                            url: "REST_api/likes?post_id=" + $(this).attr('data-id'),
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
                        })
                    })

                    if (posts_t[index_t].PostIsLiked) {
                        $("[data-id='" + posts_t[index_t].PostId + "']").css("color", "limegreen");
                    }

                    if (posts_t[index_t].PostIsShared) {
                        $("[data-shared_post_id='" + posts_t[index_t].PostId + "']").css("color", "limegreen");
                    }

                })

            },
            error: function (r_t) {
                console.log(r_t)
            }

        });
})