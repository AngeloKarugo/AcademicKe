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

            $(document).ready(function () {

                //make ajax call to fetch all users
                $.ajax({
                    method: "GET",
                    url: "REST_api/users",
                    processData: false,
                    contentType: "application/json",
                    data: '',
                    success: function (r) {
                        var users = JSON.parse(r);

                        console.log(users);

                        $.each(users, function (index) {
                            $('#users_page').html(
                                $('#users_page').html() + '<div class="flex-row p-1 d-flex align-items-start w-100 user_container"> <div class="notifications_profile_img_container"> <img ' + display_profile_image(users[index].ProfileImg) + ' class="rounded-circle profile_img_notifications profile_image border justify-content-center img-responsive shadow-sm visible" loading=" lazy" /> </div> <div class="flex-row institution_designation_container"> <div class=" flex-shrink d-flex"> <span><strong>' + users[index].UserName + '</strong></span> </div> <div class="follower_designation_container  d-flex"> <span>' + users[index].Designation + '</span> </div> <div class="follower_institution_container  d-flex"> <span>' + users[index].Institution + '</span> </div> </div> <div class="ml-auto ml-left align-self-center"> <button class="follow_button" data-user_id = "' + users[index].UserId + '">Follow</button> </div> </div>'
                            );

                            $('[data-user_id]').click(function () {
                                var user_id = $(this).attr('data-user_id');

                                $.ajax({
                                    method: 'POST',
                                    url: 'REST_api/follow',
                                    processData: false,
                                    contentType: 'application/json',
                                    data: '{"UserId" : "' + user_id + '", "SubjectId" : "", "SubjectName" : ""}',
                                    success: function (r) {

                                        console.log(r);

                                        var is_following = JSON.parse(r)

                                        users[index].IsFollowing = is_following.IsFollowing

                                        if (users[index].IsFollowing) {
                                            // $('[data-user_id = "' + subject_id + '"]').text('Unfollow');
                                            $('[data-user_id = "' + user_id + '"]').css('display', 'none');
                                        }
                                    }
                                })
                            })
                        })

                    },
                    error: function (r) {
                        console.log(r);
                    }
                })

                //search handler
                $('.sbox').keyup(function () {
                    $('.autocomplete').html('');

                    if ($(this).val()) {
                        $.ajax({
                            type: 'GET',
                            url: 'REST_api/search?query=' + $(this).val(),
                            processData: false,
                            contentType: 'application/json',
                            data: '',
                            success: function (r) {
                                r = JSON.parse(r);
                                console.log(r);

                                for (let i = 0; i < r.length; i++) {
                                    console.log(r[i].Code);

                                    if (r[i].Code == "users") {
                                        $('.autocomplete').html(
                                            $('.autocomplete').html() +
                                            '<li class="list-group-item" ><table><tr><td><b>' + r[i].Username + '</b></td></tr><tr><td onclick = "location.href = \'profile1.php?username=' + r[i].Username + '\'">' + r[i].Designation + ' ∙ ' + r[i].Institution + '</td></tr></table><span class = "d-flex"><button data-user_id="' + r[i].UserId + '" class = "search_topic_follow_btn btn-sm" id = "search_user_follow_btn' + i + '">Follow</button></span></li>'
                                        )

                                        if (r[i].IsFollowingUser) {
                                            // $('#search_user_follow_btn' + i + '').text("Unfollow");
                                            $('#search_user_follow_btn' + i + '').css('{"display": "none"}');
                                        }
                                    }

                                    $('[data-user_id]').click(function () {
                                        var user_id = $(this).attr('data-user_id');

                                        $.ajax({
                                            method: 'POST',
                                            url: 'REST_api/follow',
                                            processData: false,
                                            contentType: 'application/json',
                                            data: '{"UserId" : "' + user_id + '", "SubjectId" : "", "SubjectName" : ""}',
                                            success: function (r) {

                                                console.log(r);

                                                var is_following = JSON.parse(r)

                                                // users[index].IsFollowing = is_following.IsFollowing

                                                if (is_following.IsFollowing) {
                                                    // $('[data-user_id = "' + subject_id + '"]').text('Unfollow');
                                                    $('[data-user_id = "' + user_id + '"]').css('display', 'none');
                                                }
                                            }
                                        })
                                    })

                                }

                            },
                            error: function (r) {
                                console.log(r);

                            }
                        })
                    }

                })
            })

        } else if (details.Status == "Deactivated") {
            alert(details.Status);
        } else if (details.Status == "Not logged in") {
            window.location.href = 'login.html';
        }
    },
    error: function (r) {
        console.log(r);
    }
})