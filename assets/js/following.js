$('#timeline_icon').click(function () {
    window.location.href = 'index.html';
})

$('#timeline_icon').css('color', 'grey');

$('#profile_icon').css('color', 'limegreen');

$('#notifications_icon').click(function () {
    window.location.href = "notifications.html";
})

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

        $('#profile_icon').click(function () {
            window.location.href = "profile1.php?username=" + details.Username;
        })

        if (details.Status == "Good" || details.Status == "Deactivated") {
            $('#username_page_top').text(details.Username);

            if (details.ProfileImg) {
                $('#profile_img_navbar').attr("src", '' + details.ProfileImg + '');
            }

            var user_id = details.UserId;

            localStorage.setItem('user_id', user_id);

            $('#profile_icon').click(function () {
                window.location.href = 'profile1.php?username=' + details.Username + ''
            })


            //handler for logout button
            $('#log_out_button').click(function () {
                logout();
            });

        }

    },
    error: function (r) {
        console.log(r);

    }
})

$(document).ready(function () {
    var profile_owner_name = new Array;

    var profile_owner_name = location.search.replace('?', '').split('=');

    profile_owner_name = profile_owner_name[1]

    profile_owner_name = profile_owner_name.replace('%20', ' ');

    console.log(profile_owner_name);

    $.ajax({
        method: "GET",
        url: "REST_api/followers?username=" + profile_owner_name,
        processData: false,
        contentType: "application/json",
        data: '',
        success: function (r) {

            var followers = JSON.parse(r || "{}")
            console.log(followers);

            var user_id = localStorage.getItem('user_id');

            if (followers.length > 0) {
                $.each(followers, function (index) {
                    $('#tab-1').html(
                        $('#tab-1').html() + '<div class="conatiner d-flex flex-column notification_container" style="scroll-padding-left: 10px;"><div class="flex-row d-flex"> <div class= "notifications_profile_img_container" > <img ' + display_profile_image(followers[index].FollowerProfileImg) + ' class="rounded-circle profile_img_notifications profile_image border justify-content-center img-responsive shadow-sm visible" loading=" lazy" /> </div> <div class="follower_name_container align-items-center d-flex"> <span><strong>' + followers[index].FollowerName + '</strong></span> </div> <div class="ml-auto align-self-center ml-left "> <button class="follow_button" data-follow_button = "' + followers[index].FollowerId + '"></button> </div> </div> '
                    );

                    if (user_id == followers[index].FollowerId) {
                        $('[data-follow_button = "' + followers[index].FollowerId + '"]').css({ "display": "none" });
                    } else {
                        if (followers[index].IsFollowing) {
                            $('[data-follow_button = "' + followers[index].FollowerId + '"]').text('Unfollow');
                            $('[data-follow_button = "' + followers[index].FollowerId + '"]').css('color', 'lightgrey');
                        } else {
                            $('[data-follow_button = "' + followers[index].FollowerId + '"]').text('Follow');
                        }
                    }

                    $('[data-follow_button ]').click(function () {

                        var user_id = $(this).attr('data-follow_button');

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
                                        data: '{"UserId" : "' + user_id + '", "SubjectId" : "", "SubjectName" : ""}',
                                        success: function (r) {

                                            console.log(r);

                                            var is_following = JSON.parse(r)

                                            followers[index].IsFollowing = is_following.IsFollowing

                                            if (followers[index].IsFollowing) {
                                                $('[data-follow_button = "' + user_id + '"]').text('Unfollow');
                                                // alert('followed');
                                                $('[data-follow_button = "' + user_id + '"]').css('color', 'lightgrey');
                                            } else {
                                                $('[data-follow_button = "' + user_id + '"]').text('Follow');

                                                $('[data-follow_button = "' + user_id + '"]').css('color', 'black');
                                                // alert('unfollowed');
                                            }
                                        }
                                    })

                                } else if (details.Status == "Deactivated") {
                                    alert('Sorry, you are restricted from performing that action. Your account is deactivated. Contact site administration for more details.')
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
                })
            }
        },
        error: function (r) {
            console.log(r);
        }
    });

    $.ajax({
        method: "GET",
        url: "REST_api/following_subjects?username=" + profile_owner_name,
        processData: false,
        contentType: "application/json",
        data: '',
        success: function (r) {

            var followers = JSON.parse(r || "{}")
            console.log(followers);

            if (followers.length > 0) {
                $.each(followers, function (index) {
                    $('#tab-3').html(
                        $('#tab-3').html() + '<div class="conatiner d-flex flex-column notification_container" style="scroll-padding-left: 10px;"><div class="flex-row d-flex"> <div class="follower_name_container align-items-center d-flex"> <span><strong>' + followers[index].SubjectName + '</strong></span> </div> <div class="ml-auto align-self-center ml-left "> <button class="follow_button" data-subject_follow_button = "' + followers[index].SubjectId + '"></button> </div> </div> '
                    );

                    if (followers[index].IsFollowing) {
                        $('[data-subject_follow_button = "' + followers[index].SubjectId + '"]').text('Unfollow');
                        $('[data-subject_follow_button = "' + followers[index].SubjectId + '"]').css('color', 'lightgrey');
                    } else {
                        $('[data-subject_follow_button = "' + followers[index].SubjectId + '"]').text('Follow');
                    }


                    $('[data-subject_follow_button]').click(function () {

                        var subject_id = $(this).attr('data-subject_follow_button');

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
                                        data: '{"UserId" : "", "SubjectId" : "' + subject_id + '", "SubjectName" : ""}',
                                        success: function (r) {

                                            console.log(r);

                                            var is_following = JSON.parse(r)

                                            followers[index].IsFollowing = is_following.IsFollowing

                                            if (followers[index].IsFollowing) {
                                                $('[data-subject_follow_button = "' + subject_id + '"]').text('Unfollow');
                                                $('[data-subject_follow_button = "' + subject_id + '"]').css('color', 'lightgrey');
                                            } else {
                                                $('[data-subject_follow_button = "' + subject_id + '"]').text('Follow');
                                                $('[data-subject_follow_button = "' + subject_id + '"]').css('color', 'black');
                                            }
                                        }
                                    })

                                } else if (details.Status == "Deactivated") {
                                    alert('Sorry, you are restricted from performing that action. Your account is deactivated. Contact site administration for more details.')
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
                })
            }
        },
        error: function (r) {
            console.log(r);
        }
    })
    $.ajax({
        method: "GET",
        url: "REST_api/following?username=" + profile_owner_name,
        processData: false,
        contentType: "application/json",
        data: '',
        success: function (r) {

            var followers = JSON.parse(r || "{}")
            console.log(followers);

            var user_id = localStorage.getItem('user_id');

            if (followers.length > 0) {
                $.each(followers, function (index) {
                    $('#tab-2').html(
                        $('#tab-2').html() + '<div class="conatiner d-flex flex-column notification_container" style="scroll-padding-left: 10px;"><div class="flex-row d-flex"> <div class= "notifications_profile_img_container" > <img ' + display_profile_image(followers[index].FollowerProfileImg) + ' class="rounded-circle profile_img_notifications profile_image border justify-content-center img-responsive shadow-sm visible" loading=" lazy" /> </div> <div class="follower_name_container align-items-center d-flex"> <span><strong>' + followers[index].FollowerName + '</strong></span> </div> <div class="ml-auto align-self-center ml-left "> <button class="follow_button" data-following_follow_button = "' + followers[index].FollowerId + '"></button> </div> </div> '
                    );

                    if (user_id == followers[index].FollowerId) {
                        $('[data-following_follow_button = "' + followers[index].FollowerId + '"]').css({ "display": "none" });
                    } else {
                        if (followers[index].IsFollowing) {
                            $('[data-following_follow_button = "' + followers[index].FollowerId + '"]').text('Unfollow');
                            $('[data-following_follow_button = "' + followers[index].FollowerId + '"]').css('color', 'lightgrey');
                        } else {
                            $('[data-following_follow_button = "' + followers[index].FollowerId + '"]').text('Follow');
                        }
                    }

                    $('[data-following_follow_button]').click(function () {

                        var user_id = $(this).attr('data-following_follow_button');

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
                                        data: '{"UserId" : "' + user_id + '", "SubjectId" : "", "SubjectName" : ""}',
                                        success: function (r) {

                                            console.log(r);

                                            var is_following = JSON.parse(r)

                                            followers[index].IsFollowing = is_following.IsFollowing

                                            if (followers[index].IsFollowing) {
                                                $('[data-following_follow_button = "' + user_id + '"]').text('Unfollow');
                                                $('[data-following_follow_button = "' + user_id + '"]').css('color', 'lightgrey');
                                            } else {
                                                $('[data-following_follow_button = "' + user_id + '"]').text('Follow');
                                                $('[data-following_follow_button = "' + user_id + '"]').css('color', 'black');
                                            }
                                        }
                                    })

                                } else if (details.Status == "Deactivated") {
                                    alert('Sorry, you are restricted from performing that action. Your account is deactivated. Contact site administration for more details.')
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
                })
            }
        },
        error: function (r) {
            console.log(r);
        }
    })
});