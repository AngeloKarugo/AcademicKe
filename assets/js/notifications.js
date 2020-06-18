$('#timeline_icon').click(function () {
    window.location.href = "index.html";
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

        if (details.Status == "Good") {
            $('#username_page_top').text(details.Username);

            if (details.ProfileImg) {
                $('#profile_img_navbar').attr("src", '' + details.ProfileImg + '');
            }

            //handler for logout button
            $('#log_out_button').click(function () {
                logout();
            })

            $(document).ready(function () {

                $('#notifications_icon').attr("class", "fa fa-bell nav_icon");

                $('#notifications_icon').css({ "color": "limegreen" });

                $('#timeline_icon').css({ "color": "grey" });
                $.ajax({
                    method: "GET",
                    url: "REST_api/notifications",
                    processData: false,
                    contentType: "application/json",
                    data: '',
                    success: function (r) {

                        var notifications = JSON.parse(r || "{}");

                        console.log(notifications);

                        if (notifications.length > 0) {

                            $.each(notifications, function (index) {

                                if (notifications[index].NotificationType == "like") {
                                    $('#tab_content').html(
                                        $('#tab_content').html() + '<div class="conatiner notification_container d-flex flex-column p-3" style = "scroll-padding-left: 10px;" > <div class="notification_header_container"><span><i class = "fa fa-check-square notification_icons"></i></span> <span><strong onclick = "window.location.href = \'profile1.php?username=' + notifications[index].Sender + '\'">' + notifications[index].Sender + '</strong> liked your ' + notifications[index].PostType + ' in <strong onclick = "window.location.href = \'subject.html?subject=' + notifications[index].PostSubject + '\'">' + notifications[index].PostSubject + '</strong>:</span > </div > <div class="notification_post_container"> <div class="post_body_container" onclick = "window.location.href = \'profile1.php?username=' + notifications[index].Sender + '#' + notifications[index].PostId + '\'"> <span>' + notifications[index].PostBody + '</span> </div> </div> </div > '
                                    );
                                } else if (notifications[index].NotificationType == "comment") {
                                    $('#tab_content').html(
                                        $('#tab_content').html() + '<div class="conatiner notification_container d-flex flex-column p-3 " style = "scroll-padding-left: 10px;" > <div class="notification_header_container"><span><i class = "fa fa-comment notification_icons"></i></span> <span><strong onclick = "window.location.href = \'profile1.php?username=' + notifications[index].Sender + '\'">' + notifications[index].Sender + '</strong> liked your ' + notifications[index].PostType + ' in <strong onclick = "window.location.href = \'subject.html?subject=' + notifications[index].PostSubject + '\'">' + notifications[index].PostSubject + '</strong>:</span > </div > <div class="notification_post_container"> <div class="post_body_container" onclick = "window.location.href = \'profile1.php?username=' + notifications[index].Sender + '#' + notifications[index].PostId + '\'"> <span>' + notifications[index].PostBody + '</span> </div> </div> </div > '
                                    );
                                } else if (notifications[index].NotificationType == "share") {
                                    $('#tab_content').html(
                                        $('#tab_content').html() + '<div class="conatiner p-3 notification_container d-flex flex-column " style = "scroll-padding-left: 10px;" > <div class="notification_header_container"><span><i class = "fa fa-share-alt-square notification_icons"></i></span> <span><strong onclick = "window.location.href = \'profile1.php?username=' + notifications[index].Sender + '\'">' + notifications[index].Sender + '</strong> liked your ' + notifications[index].PostType + ' in <strong onclick = "window.location.href = \'subject.html?subject=' + notifications[index].PostSubject + '\'">' + notifications[index].PostSubject + '</strong>:</span > </div > <div class="notification_post_container"> <div class="post_body_container" onclick = "window.location.href = \'profile1.php?username=' + notifications[index].Sender + '#' + notifications[index].PostId + '\'"> <span>' + notifications[index].PostBody + '</span> </div> </div> </div > '
                                    );
                                } else if (notifications[index].NotificationType == "follow") {
                                    $('#tab_content').html(
                                        $('#tab_content').html() + '<div class="conatiner d-flex flex-column notification_container p-3" style="scroll-padding-left: 10px;"> <div class="flex-row d-flex"> <div class="notifications_profile_img_container"> <img ' + display_profile_image(notifications[index].ProfileImg) + ' class="rounded-circle profile_image border justify-content-center img-responsive shadow-sm visible" loading= "lazy" data-notification_id = "' + notifications[index].NotificationId + '"/> </div> <div class="follower_name_container align-items-center d-flex"> <span><strong onclick = "window.location.href = \'profile1.php?username=' + notifications[index].Sender + '\'">' + notifications[index].Sender + '</strong> is following your posts</span > </div> </div> </div> '
                                    );

                                    // if (notifications[index].ProfileImg) {
                                    //     $('[data-notification_id = ' + notifications[index].NotificationId + ']').attr('src', '' + notifications[index].ProfileImg + '');
                                    // }
                                }

                                if (notifications[index].Seen == 0) {
                                    $('.notification_container').css({ "background-color": "lightgrey" });
                                }
                            })
                        }

                    },
                    error: function (r) {
                        console.log(r);
                    }
                })

            })
        } else if (details.Status == "Deactivated") {
            alert('Sorry, you are restricted from performing that action. Your account is deactivated. Contact site administration for more details.')
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

