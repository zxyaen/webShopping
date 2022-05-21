// 获取要操作的元素
let login_title = document.querySelector('.login-title');
let register_title = document.querySelector('.register-title');
let login_box = document.querySelector('.login-box');
let register_box = document.querySelector('.register-box');

// 绑定标题点击事件
login_title.addEventListener('click', () => {
    // 判断是否收起，收起才可以点击
    if (login_box.classList.contains('slide-up')) {
        register_box.classList.add('slide-up');
        login_box.classList.remove('slide-up');
    }
})
register_title.addEventListener('click', () => {
    if (register_box.classList.contains('slide-up')) {
        login_box.classList.add('slide-up');
        register_box.classList.remove('slide-up');
    }
})

// 验证码图片部分

// let script = document.createElement('script');
// script.type = 'text/javascript';

// // 传参并指定回调执行函数为onBack
// script.src = "http://172.16.3.161:8080/examWeb_war_exploded/login.jsp";
// document.head.appendChild(script);

// // 回调执行函数
// function onBack(res) {
//     alert(JSON.stringify(res));
// }

// $.ajax({
//     url: 'http://172.16.3.161:8080/examWeb_war_exploded/login.jsp',
//     type: 'get',
//     // dataType: 'jsonp',  // 请求方式为jsonp
//     // jsonpCallback: "onBack",    // 自定义回调函数名
//     success: function (res) {
//         alert(res)
//     }
// });


// 
var src = 'http://172.16.3.161:8080/examWeb_war_exploded/'
let oImg = document.querySelector('.loginImg')
function refresh() {
    oImg.src = src + "VerCode?" + Math.random()
}

$(".loginImg").click(function () {
    refresh()
});



// $(".btnLogin").on("click", function () {
//     $('#login').ajaxSubmit(      //ajax方式提交表单
//         {
//             url: 'http://172.16.3.161:8080/examWeb_war_exploded/checkLogin',
//             type: 'get',
//             dataType: 'json',
//             beforeSubmit: function () { },
//             success: function (res) {
//                 // if (data.Res == "True" || data.Res == true) {
//                 //     $('.jsrz_main_check').html('您的申请已提交，我们将会在1-2个工作日内进行审核，请耐心等待!');
//                 // } else {
//                 //     alert(data.Msg);
//                 // }
//                 console.log(res);
//             },
//             clearForm: false,//禁止清楚表单
//             resetForm: false //禁止重置表单
//         });
// })
