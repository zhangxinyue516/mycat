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
//商品总数长度是否为0

function lengthDate() {

    if (!pot.length) {
        $('.buy').css('display', 'none')
        $('.nulltu').css('display', 'block')
        $('.list').css('display', 'none')

    } else {
        $('.nulltu').css('display', 'none')
        $('.buy').css('display', 'block')
        $('.list').css('display', 'block')
    }
}
//商品展示
let url = "http://jx.xuzhixiang.top/ap/api/cart-list.php"
let id = localStorage.getItem('uid')
console.log(id);
var pot
loadList()

function loadList() {
    $.ajax({
        type: "get",
        url,
        data: {
            id: id
        },
        success: res => {
            console.log(res);
            pot = res.data
            lengthDate()
            let html = ""
            $.each(pot, function(i, v) {
                html += `
                        <li>
                        <input type="checkbox" name="" class="dan-sel"  del-pid="${v.pid}">
                            <img src="${v.pimg}" alt="">
                            <p class="pr">￥${v.pprice}</p>
                            <P>￥${v.pprice*v.pnum}</p>
                            <div>
                                <input type="button" value="+" class="input1" del-pid="${v.pid}">
                                <input type="text" value="${v.pnum}" class="input2">
                                <input type="button" value="-" class="input3" del-pid="${v.pid}">
                            </div>
                            <button class="button"  del-pid="${v.pid}">删除</button>
                        </li>
                `
            });
            $(".list").html(html)

            deleteDate()
            updateData()
            selFn()
        }
    });
}


//删除*-----------
function deleteDate() {
    $(".button").click(function(e) {
        if (e.target.classList.contains("button")) {
            e.target.parentNode.remove()
            let pid = e.target.getAttribute('del-pid')

            $.ajax({
                url: "http://jx.xuzhixiang.top/ap/api/cart-delete.php",
                type: "get",
                data: {
                    pid,
                    uid: id
                },
                success: res => {
                    console.log(res);
                    lengthDate()
                    location.reload()
                }
            })
        }
    })
}


//更新*----------
function updateData() {

    $('.input1').click(function() {
        let num = parseInt($(this).next().val()) + 1
            // console.log(num);
        let pid = $(this).attr("del-pid")
            // console.log(pid);
            // console.log(pot);
        let pnumarr = pot.find(v => v.pid == pid)
        let pnum = parseInt(pnumarr.pnum) + 1
            // console.log(pnum);
        $(this).next().val(pnum)
        $.ajax({
            url: "http://jx.xuzhixiang.top/ap/api/cart-update-num.php",
            type: "get",
            data: {
                uid: id,
                pid,
                pnum: pnum
            },
            success: res => {
                console.log(res);

            }


        })
        countPrice()

    })

    //+按钮-----------
    $('.input1').click(function() {
        let num = parseInt($(this).next().val()) + 1
            // console.log(num);
        let pid = $(this).attr("del-pid")
            // console.log(pid);
            // console.log(pot);
        let pnumarr = pot.find(v => v.pid == pid)
        let pnum = parseInt(pnumarr.pnum) + 1
            // console.log(pnum);
        $(this).next().val(pnum)
        $.ajax({
            url: "http://jx.xuzhixiang.top/ap/api/cart-update-num.php",
            type: "get",
            data: {
                uid: id,
                pid,
                pnum: pnum
            },
            success: res => {
                console.log(res);

            }
        })
        countPrice()
    })

    //-按钮-------------
    $('.input3').click(function() {
        let num = parseInt($(this).prev().val()) - 1
            // console.log(num);
        let pid = $(this).attr("del-pid")
            // console.log(pid);
            // console.log(pot);
        let pnumarr = pot.find(v => v.pid == pid)
        let pnum = parseInt(pnumarr.pnum) - 1
        if (pnum == 0) {
            pnum = 0
        }
        // console.log(pnum);
        $(this).prev().val(pnum)
        $.ajax({
            url: "http://jx.xuzhixiang.top/ap/api/cart-update-num.php",
            type: "get",
            data: {
                uid: id,
                pid,
                pnum: pnum
            },
            success: res => {
                console.log(res);

            }
        })
        countPrice()

    })



}


//checkBox-----------
// function checkBox() {
//     let allsel = document.querySelector("#all-sel")
//     let dansels = document.querySelectorAll(".dan-sel")
//     allsel.onchange = function() {
//         // console.log(allsel.checked);
//         // if (allsel.checked) {
//         //     dansels.forEach((v) => (v.checked = allsel.checked));
//         // } else {
//         //     dansels.forEach((v) => (v.checked = false));

//         // }
//         console.log(allsel.checked);
//         dansels.forEach((v) => (v.checked = allsel.checked));

//         console.log(pot);
//         pot.forEach((v) => (v.checked = allsel.checked));
//         console.log(pot);
//     }
//     var allFlag = false
//     dansels.forEach((dansel) => {
//         dansel.onchange = function() {
//             let pid = dansel.getAttribute('del-pid')

//             console.log(pid);
//             let pobj = pot.find(v => v.pid == pid);
//             pobj.checked = allsel.checked;
//             // countPrice()
//             var allFlag = pot.every(v => v.checked == true)
//             console.log(allFlag);
//             allsel.checked = allFlag
//             console.log(allFlag);
//         }
//     })
//     allsel.checked = allFlag


// }

function selFn() {
    let allsel = document.querySelector('#all-sel');
    let dansels = document.querySelectorAll('#dan-sel');
    allsel.onchange = function() {
        console.log(allsel.checked);
        dansels.forEach((v) => (v.checked = allsel.checked));

        console.log(pot);
        pot.forEach((v) => (v.checked = allsel.checked));
        console.log(pot);

        countPrice()

    };


    dansels.forEach((dansel) => {
        dansel.onchange = function() {
            let pid = dansel.getAttribute('del-pid')
            console.log(pid);
            let pobj = pot.find(v => v.pid == pid);
            pobj.checked = dansel.checked;

            countPrice()


            var allFlag = pot.every(v => v.checked == true)
            allsel.checked = allFlag
        }
    })
    allsel.checked = allFlag
}





//计算总价------------
// function countPrice() {
//     // console.log(pot);
//     // let a = pro.data
//     // let n
//     // $.each(a, function(i, v) {
//     //     n += parseInt(v.pnum)
//     // })
//     // $("#count-num").html("数量：" + n)

// }
function countPrice() {
    let countNum = 0;
    pot.forEach((v) => {
        if (v.checked == true) {
            countNum += parseInt(v.pnum);
        }
    });
    console.log(countNum);
    let cn = document.querySelector('#count-num');
    cn.innerHTML = countNum;

    let countPrice = 0;
    pot.forEach((v) => {
        if (v.checked == true) {
            countPrice += parseInt(v.pnum) * v.pprice;
        }
    });
    console.log(countPrice);
    let cp = document.querySelector('#count-price')
    cp.innerHTML = "￥" + countPrice;


}