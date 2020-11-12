// 监视滚动距离-------------
console.log($(window).scrollTop())
$(window).scroll(function() {
    if ($(window).scrollTop() >= 500) {
        $(".fenye").css({
            "display": "block"
        })
        $(".head-search").css({
            "display": "block"
        })
        if ($(window).scrollTop() >= 1100 && $(window).scrollTop() < 1950) {
            $(".fenye ul li").eq(1).css({
                "background": "orange"
            })

        } else {
            $(".fenye ul li").eq(1).css({
                "background": ""
            })
        }

        if ($(window).scrollTop() >= 1950 && $(window).scrollTop() < 2560) {
            $(".fenye ul li").eq(2).css({
                "background": "pink"
            })

        } else {
            $(".fenye ul li").eq(2).css({
                "background": ""
            })
        }
        if ($(window).scrollTop() >= 2550 && $(window).scrollTop() < 3060) {
            $(".fenye ul li").eq(3).css({
                "background": "yellow"
            })
        } else {
            $(".fenye ul li").eq(3).css({
                "background": ""
            })
        }
        if ($(window).scrollTop() >= 3060 && $(window).scrollTop() < 3260) {
            $(".fenye ul li").eq(4).css({
                "background": "green"
            })
        } else {
            $(".fenye ul li").eq(4).css({
                "background": ""
            })
        }
        if ($(window).scrollTop() >= 3210) {
            $(".fenye ul li").eq(9).css({
                "background": "red"
            })
        } else {
            $(".fenye ul li").eq(9).css({
                "background": ""
            })
        }

        $(".fenye ul li").eq(9).click(function() {
            $('html,body').stop()
            $('html,body').animate({
                scrollTop: $('.headImg').offset().top
            }, 800, function() {});
        })

    } else {
        $(".fenye").css({
            "display": "none"
        })
        $(".head-search").css({
            "display": "none"
        })
    }
})

//nav菜单栏--------------------
$('.witt').hover(function() {
        $(this).css({
            "color": "red",
            "background": "white"
        })
        $(".redd").css({
            "color": "#F6BD12",
            "background": "#C60A0A"
        })
        $('.swp ul').css({
            "display": "none"
        })
        $('.swp ol').css({
            "display": "block"
        })
        $('.swp ol').children().hover(function() {
            $(this).css({
                "background": "white"
            }).children().css({
                "color": "#e54077"
            })
            $(this).siblings().css({
                "color": "#fff",
                "background": "#666666"
            }).children().css({
                "color": "#fff"
            })

            $('.swp ol div').css({
                "display": "block"
            })
        }, function() {
            $('.swp ol li').css({
                    "color": "#fff",
                    "background": "#666666"
                })
                // out
            $('.swp ol div').css({
                "display": "none"
            })
        });

        // over
    },
    function() {
        // out
    });
$('.redd').hover(function() {
    $(this).css({
        "color": "#fff",
        "background": "rgba(0, 0, 0, 0.6)"
    })
    $(".witt").css({
        "color": "#fff",
        "background": "#C60A0A"
    })
    $('.swp ol').css({
        "display": "none"
    })
    $('.swp ul').css({
        "display": "block"
    })

    // over
}, function() {
    // out
});

//检测是否登录了----------------

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
//商品展示loadList-------------
let url1 = "http://jx.xuzhixiang.top/ap/api/productlist.php"
let uid = localStorage.getItem("uid")
console.log(uid);

loadList()

function loadList() {
    let arr
    $.ajax({
        url: url1,
        type: "get",
        data: {
            uid
        },
        success: res => {
            console.log(res.data);
            arr = res.data;
            let html = ""
            $.each(arr, function(i, v) {
                // console.log(v.pprice);
                let pid = arr[i].pid
                html += `
                <ul>
                    <a href="item.html?pid=${pid}&uid=${uid}"><img src="${arr[i].pimg}"></a>
                    <li style="width: 150px;">${v.pname}</li>
                    <p style="width: 150px;">${v.pdesc}</p>
                    <b>${v.pprice}</b>
                </ul>
                `
            });
            $('.produce').html(html)
        }

    })


}