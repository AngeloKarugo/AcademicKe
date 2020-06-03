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

function get_comment_owner(comment_owner, logged_in_user, comment_id) {
    //handler for the dropdown menu display
    if (logged_in_user == comment_owner) {
        return '<button class="dropdown-item tl_post_options" data-delete_comment = "' + comment_id + '">Delete</button>';
    } else {
        return '<button class="dropdown-item tl_post_options" data-report_comment = "' + comment_id + '">Report</button>';
    }
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

//this is the guy who changes post time from 187353768329 to 5 days.
function time_conversion(time) {
    const current_date = new Date();

    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const actual_date = new Date(time * 1000);

    var date_difference = current_date - actual_date;

    var date_difference_in_seconds = Math.floor((date_difference) / 1000);

    var date_difference_in_minutes = Math.floor(date_difference_in_seconds / 60);

    var date_difference_in_hours = Math.floor(date_difference_in_minutes / 60);

    var date_difference_in_days = Math.floor(date_difference_in_hours / 24);

    var date_difference_in_years = Math.floor(date_difference_in_days / 365.25);

    // console.log(date_difference_in_hours);

    if (date_difference_in_seconds < 60) {
        time = date_difference_in_seconds + 'sec';
    } else if ((date_difference_in_seconds >= 60) && (date_difference_in_minutes < 60)) {
        time = date_difference_in_minutes + 'min';
    } else if ((date_difference_in_minutes >= 60) && (date_difference_in_hours < 24)) {
        time = date_difference_in_hours + 'h';
    } else if ((date_difference_in_hours >= 24) && (date_difference_in_days < 7)) {
        time = date_difference_in_days + 'd';
    } else if ((date_difference_in_days > 7) && (date_difference_in_years < 1)) {
        time = months[actual_date.getUTCMonth()] + ', ' + actual_date.getUTCDay();
    } else if (date_difference_in_years > 1) {
        time = actual_date.getUTCFullYear() + ', ' + months[actual_date.getUTCMonth()] + ' ' + actual_date.getUTCDay();
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
                $('#pdf_feedback').html('*only pdf and xml spreadsheets allowed. Please select a different file<br/>');
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