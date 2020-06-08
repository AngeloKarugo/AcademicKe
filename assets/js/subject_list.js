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

            $(document).ready(function () {

                //make ajax call to fetch all users
                $.ajax({
                    method: "GET",
                    url: "REST_api/subjects",
                    processData: false,
                    contentType: "application/json",
                    data: '',
                    success: function (r) {
                        var subjects = JSON.parse(r);

                        console.log(subjects);

                        $.each(subjects, function (index) {
                            $('#users_page').html(
                                $('#users_page').html() + '<div class="flex-row p-1 d-flex align-items-start w-100 user_container"> <div class="flex-row institution_designation_container"> <div class=" flex-shrink d-flex"> <span><strong>' + subjects[index].SubjectName + '</strong></span> </div>  </div> <div class="ml-auto ml-left align-self-center"> <button class="follow_button" data-subject_id = "' + subjects[index].SubjectId + '">Follow</button> </div> </div>'
                            );

                            $('[data-subject_id]').click(function () {
                                var subject_id = $(this).attr('data-subject_id');

                                $.ajax({
                                    method: 'POST',
                                    url: 'REST_api/follow',
                                    processData: false,
                                    contentType: 'application/json',
                                    data: '{"UserId" : "", "SubjectId" : "' + subject_id + '", "SubjectName" : ""}',
                                    success: function (r) {

                                        console.log(r);

                                        var is_following = JSON.parse(r)

                                        users[index].IsFollowing = is_following.IsFollowing

                                        if (users[index].IsFollowing) {
                                            // $('[data-user_id = "' + subject_id + '"]').text('Unfollow');
                                            $('[data-subject_id = "' + subject_id + '"]').css('display', 'none');
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

                                    if (r[i].Code == "topic") {
                                        $('.autocomplete').html(
                                            $('.autocomplete').html() +
                                            '<li class="list-group-item"><div class = "p-0 d-flex topic_search" ><span class = "d-flex mr-auto mr-right" onclick = "window.location.href = \'subject.html?subject=' + r[i].SubjectName + '\'">' + r[i].SubjectName + '</span><span class = "d-flex"><button  data-subject_id="' + r[i].SubjectId + '" class = "search_topic_follow_btn btn-sm" id = "search_topic_follow_btn' + i + '">Follow</button></span></div></li>'
                                        )

                                    }

                                    if (r[i].IsFollowing) {
                                        // $('#search_topic_follow_btn' + i + '').text("Unfollow");
                                        $('#search_topic_follow_btn' + i + '').css('{"display": "none"}');
                                    }

                                }

                                $('[data-subject_id]').click(function () {
                                    var subject_id = $(this).attr('data-subject_id');

                                    $.ajax({
                                        method: 'POST',
                                        url: 'REST_api/follow',
                                        processData: false,
                                        contentType: 'application/json',
                                        data: '{"UserId" : "", "SubjectId" : "' + subject_id + '", "SubjectName" : ""}',
                                        success: function (r) {

                                            console.log(r);

                                            var is_following = JSON.parse(r)

                                            // users[index].IsFollowing = is_following.IsFollowing

                                            if (is_following.IsFollowing) {
                                                // $('[data-user_id = "' + subject_id + '"]').text('Unfollow');
                                                $('[data-subject_id = "' + subject_id + '"]').css('display', 'none');
                                            }
                                        }
                                    })
                                })

                            },
                            error: function (r) {
                                console.log(r);

                            }
                        })
                    }

                })
            })

        } else if (details.Status == "Not logged in") {
            window.location.href = 'login.html';
        }
    },
    error: function (r) {
        console.log(r);
    }
})