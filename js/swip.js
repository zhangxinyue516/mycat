$('#div').hover(function() {
        $('.zhe').css({
            display: "block",
        });
        $('#div1').css({
            display: "block",
        });
    }, function() {
        $('.zhe').css({
            display: "none",
        });
        $('#div1').css({
            display: "none",
        });
    })
    // let zhe = document.querySelector(".zhe")
$("#div").mousemove(function(e) {
    let l = $(".zhe").innerWidth() / 2;
    let t = $(".zhe").innerHeight() / 2;
    let d = 276

    $(".zhe").css({
        left: e.clientX - l,
        top: e.clientY - t - d
    })
    if (e.clientX - l <= 0) {
        $(".zhe").css({
            left: 0
        })
    }
    if (e.clientY - t - d <= 0) {
        $(".zhe").css({
            top: 0
        })
    }
    console.log($(".zhe").offset().top);
    console.log($(".zhe").offset().left);
    if ($(".zhe").offset().left >= $("#div").innerWidth() - $(".zhe").innerWidth()) {
        $(".zhe").css({
            left: $("#div").innerWidth() - $(".zhe").innerWidth() + "px"
        })
    }
    if ($(".zhe").offset().top - d >= $("#div").innerHeight() - $(".zhe").innerHeight()) {
        $(".zhe").css({
            top: $("#div").innerHeight() - $(".zhe").innerHeight() + "px"
        })
    }

    let bimgw = $("#div").innerWidth() / $(".zhe").innerWidth() * $("#div1").innerWidth() + "px"
    let bimgh = $("#div").innerHeight() / $(".zhe").innerHeight() * $("#div1").innerHeight() + "px"
    let imgleft = -$(".zhe").offset().left * (($("#div").innerWidth() / $(".zhe").innerWidth())) + 'px'
    let imgtop = (-$(".zhe").offset().top + d) * (($("#div").innerHeight() / $(".zhe").innerHeight())) + 'px'

    $("#bimg").css({
        width: bimgw,
        height: bimgh,
        left: imgleft,
        top: imgtop
    })



})