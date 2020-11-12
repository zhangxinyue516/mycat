//检测是否登录了----------------
localStorage.getItem("uid")
if (localStorage.getItem("uid")) {
    $(".navlog").children().html("退出")
    $(".navlog").click(function() {
        alert(" 确认退出")
        localStorage.removeItem('uid')
    })
    $(".navcart").click(function() {
        location.href = "cart.html"

    })
} else {
    $(".navcart").click(function() {
        alert("请登录")
        location.href = "log.html"

    })
}

let uid = localStorage.getItem("uid")
console.log(uid);


//详情展示
let url = "http://jx.xuzhixiang.top/ap/api/detail.php"
console.log(location.search);
let str = location.search;
let arr = str.split("&");
let arr1 = arr[0].split("=");
console.log(arr1[1]);
let id = arr1[1]
$.ajax({
    url,
    type: "get",
    data: {
        id
    },
    success: res => {
        console.log(res);
        input1.src = res.data.pimg;
        bimg.src = res.data.pimg
        $("#input2").html("商品名：" + res.data.pname)
        $("#input3").html("价格：" + res.data.pprice)
        $("#input4").html("商品描述:" + res.data.pdesc)

    }
})

//购物车

let url1 = "http://jx.xuzhixiang.top/ap/api/add-product.php"
$("#que").click(function() {
    console.log(11);
    let pnum = $(".num").val()
    console.log(pnum);
    $.ajax({

        url: url1,
        type: "get",
        data: {
            uid: uid,
            pid: id,
            pnum: pnum
        },
        success: res => {
            console.log(res);

            location.href = "cart.html"
        }
    })
})