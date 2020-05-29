$(document).ready(function () {

    $('#search_icon').click(function () {
        // $('.nav_icon').css({ "color": "gray" });
        $('#search_icon').css({ "color": "limegreen" });
        $('#search_modal').modal('show');
        $('#search_modal').on('shown.bs.modal', function () {
            $('#search_input').focus();
        })

        $('#search_modal').on('hidden.bs.modal', function () {
            $('#search_icon').css({ "color": "grey" });
        })
    })

    // $('#search_icon').on('blur', function () {
    //     $('#search_icon').css({ "color": "grey" });
    // })

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

                        if (r[i].Code == "posts") {
                            $('.autocomplete').html(
                                $('.autocomplete').html() +
                                '<li class="list-group-item" onclick = "location.href = \'profile1.php?username=' + r[i].Username + '#' + r[i].PostId + '\'"><table><tr><td>' + r[i].Body + '</td></tr><tr><td>~<b>' + r[i].Username + '</b> ∙ ' + r[i].Topic + ' ∙ ' + time_conversion(r[i].PostedAt) + '</td></tr></table></li>'
                            )
                        }

                        if (r[i].Code == "topic") {
                            $('.autocomplete').html(
                                $('.autocomplete').html() +
                                '<li class="list-group-item"><div class = "p-0 d-flex topic_search" ><span class = "d-flex mr-auto mr-right" onclick = "window.location.href = \'subject.html?subject=' + r[i].SubjectName + '\'">' + r[i].SubjectName + '</span><span class = "d-flex"><button  data-id_subject="' + r[i].SubjectId + '" class = "search_topic_follow_btn btn-sm" id = "search_topic_follow_btn' + i + '"></button></span></div></li>'
                            )

                        }

                        if (r[i].Code == "topic_posts") {
                            $('.autocomplete').html(
                                $('.autocomplete').html() +
                                '<li class="list-group-item" onclick = "location.href = \'profile1.php?username=' + r[i].Username + '#' + r[i].PostId + '\'"><table><tr><td>' + r[i].Body + '</td></tr><tr><td>~<b>' + r[i].Username + '</b> ∙ ' + r[i].Topic + ' ∙ ' + time_conversion(r[i].PostedAt) + '</td></tr></table></li>'
                            )
                        }

                        if (r[i].Code == "users") {
                            $('.autocomplete').html(
                                $('.autocomplete').html() +
                                '<li class="list-group-item" ><table onclick = "location.href = \'profile1.php?username=' + r[i].Username + '\'"><tr onclick = ><td><b>' + r[i].Username + '</b></td></tr><tr><td>' + r[i].Designation + ' ∙ ' + r[i].Institution + '</td></tr></table><span class = "d-flex"><button data-id_user="' + r[i].UserId + '" class = "search_topic_follow_btn btn-sm" id = "search_user_follow_btn' + i + '"></button></span></li>'
                            )

                            if (r[i].IsFollowingUser) {
                                $('#search_user_follow_btn' + i + '').text("Unfollow");
                                $('#search_user_follow_btn' + i + '').css('{"background-color": "green"}');
                            } else {
                                $('#search_user_follow_btn' + i + '').text("Follow");
                            }
                        }

                        if (r[i].Code == "comments") {
                            $('.autocomplete').html(
                                $('.autocomplete').html() +
                                '<li class="list-group-item" onclick = "location.href = \'profile1.php?username=' + r[i].Username + '#' + r[i].PostId + '\'"><table><tr><td><b>' + r[i].Username + '</b></td></tr><tr><td>' + r[i].Comment + ' ∙ ' + time_conversion(r[i].PostedAt) + '</td></tr><tr><td><small>responding to:</small></td></tr><tr><td><div class = "d-flex flex-column justify-content-center p-1 flex-fill" id = "search_post_comment"><div class = "p-0 ">' + r[i].PostBody + '</div><div class = p-0 >~<b>' + r[i].PostOwner + '</b></div></div></td></tr></table></li>'
                            )
                        }

                        if (r[i].IsFollowing) {
                            $('#search_topic_follow_btn' + i + '').text("Unfollow");
                            $('#search_topic_follow_btn' + i + '').css('{"background-color": "green"}');
                        } else {
                            $('#search_topic_follow_btn' + i + '').text("Follow");
                        }

                    }

                    //following a subject from the search modal
                    $('[data-id_subject]').click(function () {

                        var subject_id = $(this).attr('data-id_subject');

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
                                        data: '{"SubjectId" : "' + subject_id + '", "UserId" : "", "SubjectName" : ""}',
                                        success: function (res) {
                                            var is_following = JSON.parse(res)

                                            if (is_following.IsFollowing) {
                                                $("[data-id_subject = '" + subject_id + "']").text("Unfollow");
                                                $("[data-id_subject = '" + subject_id + "']").css('{"background-color": "green"}');

                                            } else {
                                                $("[data-id_subject = '" + subject_id + "']").text("Follow");
                                            }
                                            console.log(is_following);
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

                    //following a user from the search modal
                    $('[data-id_user]').click(function () {

                        var user_id = $(this).attr('data-id_user');

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
                                        data: '{"SubjectId" : "", "UserId" : "' + user_id + '", "SubjectName" : ""}',
                                        success: function (res) {
                                            var is_following = JSON.parse(res)

                                            if (is_following.IsFollowing) {
                                                $("[data-id_user = '" + user_id + "']").text("Unfollow");
                                                $("[data-id_user = '" + user_id + "']").css('{"background-color": "green"}');

                                            } else {
                                                $("[data-id_user = '" + user_id + "']").text("Follow");
                                            }
                                            console.log(is_following);
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


                },
                error: function (r) {
                    console.log(r);

                }
            })
        }

    })

})