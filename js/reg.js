let url = "http://jx.xuzhixiang.top/ap/api/reg.php"

$(".btn").click(function() {
    $(".bee").remove()
    $(".imgbee").remove()
    $(this).remove()
})
$(".del").click(function() {
    $(".inform").remove()
    $("ul").css({
        "display": "block"
    })
})
let username = $("#zh").val()
let password = $("#pd").val()

$('#sub').click(function() {
    $.ajax({
        url,
        type: "get",
        data: {
            username,
            password
        },
        success: res => {
            if (res == 1) {
                alert("注册成功")
                location.href = "log.html"
            } else {
                alert("注册失败，用户名已存在")
            }

        }
    })
})