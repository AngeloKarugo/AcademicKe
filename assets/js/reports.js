$.ajax({
    method: "GET",
    url: "REST_api/user",
    processData: false,
    contentType: "application/json",
    data: '',
    success: function (r) {
        var details = JSON.parse(r);

        if (details.Status == "Admin") {
            console.log("authorized");

            $(document).ready(function () {
                $.ajax({
                    method: "GET",
                    url: "REST_api/reports",
                    processData: false,
                    contentType: "application/json",
                    data: '',
                    success: function (r) {
                        var reports = JSON.parse(r || "{}");

                        console.log(reports);

                        $.each(reports, function (index) {
                            reports[index].ReportStatement = decodeURIComponent(reports[index].ReportStatement);
                            reports[index].ReportStatement = reports[index].ReportStatement.replace("<", "&lt;");
                            reports[index].ReportStatement = reports[index].ReportStatement.replace(">", "&gt;>");
                            reports[index].ReportStatement = reports[index].ReportStatement.replace("%2F", "\\/");

                            //handler for generating page html
                            if (!reports[index].ReportAction) {
                                $('.unresolved_reports').html(
                                    $('.unresolved_reports').html() + '<div class = "report_container"><div class=" d-flex flex-row " style="scroll-padding-left: 10px;"> <div class="p-1 flex-column " id="tl_profile_img_container"> <img ' + display_profile_image(reports[index].ReporterImg) + ' class="rounded-circle border img-responsive shadow-sm visible" id="profile_img_tl" loading="lazy"> </div> <div class="p-1 flex-fill "> <div class="d-flex p-0 "> <table> <tr> <td colspan="1">' + reports[index].ReporterName + ' ∙ ' + reports[index].ReporterDesignation + ' ∙ ' + time_conversion(reports[index].TimeReported) + ' </td> </tr> <tr> <td>' + reports[index].ReporterInstitution + '</td> </tr> </table> </div> <div class="p-0 "> <span>' + reports[index].ReportStatement + '</span> </div> <small class="logged_in_as_page_top">responding to:</small> <div class="d-flex flex-column justify-content-center p-1 flex-fill" id="search_post_comment"> <small class="p-1 logged_in_as_page_top">' + reports[index].PostTopic + ' ∙ ' + reports[index].PostType + '</small> <div class="post_owner_details p-1"> <div class="p-0 reports_post_owner_name_container"> <span><strong> ' + reports[index].PostOwnerName + ' </strong> ∙ ' + time_conversion(reports[index].PostedAt) + '</span> </div> <div class="p-0 reports_post_owner_name_container"> <span>' + reports[index].PostOwnerDesignation + ' ∙ ' + reports[index].PostOwnerInstitution + '</span> </div> </div> <div class="p-2 post_owner_details"> <span><strong>' + reports[index].PostBody + '</strong></span> </div> <div class="p-1 flex-row d-flex"> <div class="align-items-start post_metrics_label"> <span>Post Metrics:</span> </div> <div class="flex-column d-flex"> <div> <span>' + reports[index].PostLikes + ' likes</span> </div> <div> <span>' + reports[index].PostComments + ' comments</span> </div> <div> <span>' + reports[index].PostShares + ' shares</span> </div> </div> </div> </div> <div class="flex-row d-flex p-1 justify-content-center"> <div class="p-1"> <span>Choose action</span> </div> <div class="p-1"> <select class="form-control-sm" id = "report_action_select_' + reports[index].ReportId + '" data-report_action_select = "' + reports[index].ReportId + '" name="action"> <option class="form-control-sm" value=""></option> <option class="form-control-sm" value="resolve">Resolve</option> <option class="form-control-sm" value="delete">Delete post</option><option class="form-control-sm" value="deactivate">Deactivate User</option> </select> </div> <div class="p-1"> <button class="btn btn-secondary btn-sm" data-post_id = "' + reports[index].PostId + '" data-report_action = "' + reports[index].ReportId + '">Submit</button> </div> </div> </div> </div></div> '
                                );
                            } else {
                                $('.resolved_reports').html(
                                    $('.resolved_reports').html() + '<div class = "report_container"> <div class="logged_in_as_page_top"> <span>Date Resolved: ' + time_conversion(reports[index].DateResolved) + '</span> </div> <div class="d-flex flex-row " style="scroll-padding-left: 10px;"> <div class="p-1 flex-column " id="tl_profile_img_container"> <img ' + display_profile_image(reports[index].ReporterImg) + ' class="rounded-circle border img-responsive shadow-sm visible" id="profile_img_tl" loading="lazy"> </div> <div class="p-1 flex-fill "> <div class="d-flex p-0 "> <table> <tr> <td colspan="1">' + reports[index].ReporterName + ' ∙ ' + reports[index].ReporterDesignation + ' ∙ ' + time_conversion(reports[index].TimeReported) + ' </td> </tr> <tr> <td>' + reports[index].ReporterInstitution + '</td> </tr> </table> </div> <div class="p-0 "> <span>' + reports[index].ReportStatement + '</span> </div> <small class="logged_in_as_page_top">responding to:</small> <div class="d-flex flex-column justify-content-center p-1 flex-fill" id="search_post_comment"> <small class="p-1 logged_in_as_page_top">' + reports[index].PostTopic + ' ∙ ' + reports[index].PostType + '</small> <div class="post_owner_details p-1"> <div class="p-0 reports_post_owner_name_container"> <span><strong> ' + reports[index].PostOwnerName + ' </strong> ∙ ' + time_conversion(reports[index].PostedAt) + '</span> </div> <div class="p-0 reports_post_owner_name_container"> <span>' + reports[index].PostOwnerDesignation + ' ∙ ' + reports[index].PostOwnerInstitution + '</span> </div> </div> <div class="p-2 post_owner_details"> <span><strong>' + reports[index].PostBody + '</strong></span> </div> <div class="p-1 flex-row d-flex"> <div class="align-items-start post_metrics_label"> <span>Post Metrics:</span> </div> <div class="flex-column d-flex"> <div> <span>' + reports[index].PostLikes + ' likes</span> </div> <div> <span>' + reports[index].PostComments + ' comments</span> </div> <div> <span>' + reports[index].PostShares + ' shares</span> </div> </div> </div> </div> <div class="flex-row d-flex p-1 justify-content-center"> <div class="p-1"> <span class="logged_in_as_page_top">ACTION TAKEN: ' + reports[index].ReportAction + '</span> </div> </div> <div class="p-1 d-flex justify-content-center"> <button class="btn revert_button btn-success btn-sm" type="button" data-revert_post_id = "' + reports[index].PostId + '" data-revert_report_id = "' + reports[index].ReportId + '" id="revert_button">Revert</button> </div> </div> </div> </div>');
                            }

                            if (reports[index].ReportAction != "deactivated") {
                                $('[data-revert_report_id = ' + reports[index].ReportId + ']').css('display', 'none');
                            }

                        });

                        //handler for reverting user reactivation
                        $('[data-revert_report_id]').click(function () {

                            var post_id = $(this).attr('data-revert_post_id');

                            var report_id = $(this).attr('data-revert_report_id');

                            $.ajax({
                                method: "POST",
                                url: "REST_api/report_action?report_id=" + report_id,
                                processData: false,
                                contentType: "application/json",
                                data: '{"Action" : "reactivate", "PostId" : "' + post_id + '"}',
                                success: function (r) {
                                    console.log(r);
                                },
                                error: function (r) {
                                    console.log(r);
                                }
                            })
                        })

                        //handler for submitting report action
                        $('[data-report_action]').click(function () {
                            var report_id = $(this).attr('data-report_action');

                            var post_id = $(this).attr('data-post_id');

                            console.log("wozap");


                            report_action = $('[data-report_action_select = ' + report_id + ']').val();

                            if (report_action) {

                                console.log(report_action);

                                $.ajax({
                                    method: "POST",
                                    url: "REST_api/report_action?report_id=" + report_id,
                                    processData: false,
                                    contentType: "application/json",
                                    data: '{"Action" : "' + report_action + '", "PostId" : "' + post_id + '"}',
                                    success: function (r) {
                                        console.log(r);
                                    },
                                    error: function (r) {
                                        console.log(r);
                                    }
                                })
                            }
                        })
                    },
                    error: function (r) {
                        console.log(r);
                    }
                })
            });
        } else {
            window.location.href = "login.html";
        }
    },
    error: function (r) {
        console.log(r);

    }
})