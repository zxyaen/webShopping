function getBooksInfo() {
    let href = "http://172.16.3.161:8080/examWeb_war_exploded/showAllBook";       //地址以及传递的参数
    $.get(href, function (res) {  //res为接口返回数据
        if (res) {
            console.log(res);
            for (let i = 0; i < 5;i++) {

                console.log(res[i]);   
                for(let j=0;j<10;j++){
                    // console.log(res[i][j]);
                }             
                // console.log(res[i].bookno);                

            }
            //请求成功处理业务
        } else {
            //请求失败处理业务
        }
    })

}
getBooksInfo()

