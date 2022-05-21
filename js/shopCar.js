class Cart {
    constructor() {
        this.eventBind();
    }
    //获取并更新商品总数量
    getGoodsNumAndUpdate() {
        //获取所有商品的数量
        let oGoodsNum = document.getElementsByClassName("goods-num");
        //存放商品数量叠加的总值
        let goodsTotalNum = 0;
        //循环所有商品
        for (let i = 0; i < oGoodsNum.length; i++) {
            //将所有循环到的商品数量相加
            goodsTotalNum += Number(oGoodsNum[i].innerHTML);
        }
        //获取总结栏的商品总数
        let oGoodsTotalNum = document.getElementById("goods-total-num");
        //将循环所得商品数量之和赋给总结栏商品总数
        oGoodsTotalNum.innerHTML = goodsTotalNum;
    }
    //获取并更新总货物总价格
    getGoodsPriceAndUpdate() {
        //获取小计
        let oGoodsSinglePrice = document.getElementsByClassName("goods-single-price");
        //新创建一个元素接受小计的数值(用于最后赋值给获取小计的元素)
        let goodsTotalPrice = 0;
        //循环所有小计
        for (let i = 0; i < oGoodsSinglePrice.length; i++) {
            //将所有循环到的小计数量相加
            goodsTotalPrice += Number(oGoodsSinglePrice[i].innerHTML);
        }
        //获取总结栏的价格总数
        let oGoodsTotalPrice = document.getElementById("goods-total-price");
        //将循环所得小计数量之和赋给总结栏价格总数
        oGoodsTotalPrice.innerHTML = goodsTotalPrice;
    }
    //2.获取小计
    getSinglePrice(num, price) {
        //每行小计数等于单价与本行商品之积
        return num * price;
    }
    //加号按钮方法
    addGoods(btn) {
        //获取加号上一个兄弟元素(中间数值)
        let oGoodsNum = btn.previousElementSibling;
        //1.点击后数值加一
        oGoodsNum.innerHTML = Number(oGoodsNum.innerHTML) + 1;
        //获取单价(btn父元素的下一个元素的子元素)
        let oPrice = btn.parentNode.nextElementSibling.firstElementChild;
        //获取小计(btn父元素的下一个元素的下一个元素的子元素)
        let oSinglePrice = btn.parentNode.nextElementSibling.nextElementSibling.firstElementChild;
        //2.重新获取小计数值并赋给小计
        oSinglePrice.innerHTML = this.getSinglePrice(oGoodsNum.innerHTML, oPrice.innerHTML);
        //3.获取并更新商品总数量(调用重新执行>刷新数据)
        this.getGoodsNumAndUpdate();
        //4.获取并更新总货物总价格(调用重新执行>刷新数据)
        this.getGoodsPriceAndUpdate();
    }
    //减号按钮方法
    minGoods(btn) {
        //获取减号下一个兄弟元素(中间数值)
        let oGoodsNum = btn.nextElementSibling;
        //判断如果商品数量大于零
        if (oGoodsNum.innerHTML > 0) {
            //1.点击后数值减一
            oGoodsNum.innerHTML = oGoodsNum.innerHTML - 1;
            //获取单价(btn父元素的下一个元素的子元素)
            let oPrice = btn.parentNode.nextElementSibling.firstElementChild;
            //获取小计(btn父元素的下一个元素的下一个元素的子元素)
            let oSinglePrice = btn.parentNode.nextElementSibling.nextElementSibling.firstElementChild;
            //2.重新获取小计数值并赋给小计
            oSinglePrice.innerHTML = this.getSinglePrice(oGoodsNum.innerHTML, oPrice.innerHTML);
            //3.获取并更新商品总数量(调用重新执行>刷新数据)
            this.getGoodsNumAndUpdate();
            //4.获取并更新总货物总价格(调用重新执行>刷新数据)
            this.getGoodsPriceAndUpdate();
        }
    }
    //删除按钮方法
    delGoods(btn) {
        //获取购物车table元素
        let god = document.getElementById("goods");
        //获取此按钮父元素的父元素
        let oTr = btn.parentNode.parentNode;
        //然后删除此元素(在此指按钮选择的整个tr元素)
        oTr.remove();
        //重新排序号(循环名为god的table元素下的所有子元素tr)(从第二个子元素开始,并且去掉最后一个小计行)
        for (let i = 1; i < god.firstElementChild.children.length - 1; i++) {
            //将循环之后的元素数值i赋值给名为god的table元素下的子元素tr下的第一个子元素td
            god.firstElementChild.children[i].firstElementChild.innerHTML = i;
        }
        //3.获取并更新商品总数量(调用重新执行>刷新数据)
        this.getGoodsNumAndUpdate();
        //4.获取并更新总货物总价格(调用重新执行>刷新数据)
        this.getGoodsPriceAndUpdate();
    }

    //添加订单方法
    update() {
        //获取所有类名为update的元素
        let btn = document.getElementsByClassName("update");
        //获取所有id名为update-table的元素
        let updateTable = document.getElementById("update-table");
        //获取购物车table元素
        let god = document.getElementById("goods");
        //获取购物车table元素的第一个子元素tbody的所有子元素tr
        let gods = god.firstElementChild.children;
        //目标元素赋值为false
        let flag = false;
        //这个this是为了避免在事件体内cart的对象被覆盖
        let that = this;
        //循环所有类名为update的元素
        for (let i = 0; i < btn.length; i++) {
            //类名为update的点击事件
            btn[i].onclick = function () {
                //循环购物车table元素的第一个子元素tbody的所有子元素tr
                for (let j = 0; j < gods.length - 1; j++) {
                    //循环判断菜单中是否有这个菜,如果有这个菜则加1;
                    //本意为在购物车寻找相同名称的商品如果有则执行购物车的这条数据商品数量+1;如果没有则使flag为true跳出判断
                    //this是类名为update元素input标签
                    //购物车table中所有子元素tr遍历 下的第一个子元素的内容==类名为update元素input的父元素td的上一个兄弟元素的上一个兄弟元素的内容 时执行
                    if (gods[j].children[1].innerHTML == this.parentNode.previousElementSibling.previousElementSibling.innerHTML) {
                        //购物车table中所有子元素tr遍历 下的第二个子元素的内容(即为购物车中商品的数量)+1
                        gods[j].children[2].children[1].innerHTML = " " + (Number(gods[j].children[2].children[1].innerHTML) + 1) + " ";
                        //购物车table中所有子元素tr遍历 下的第四个子元素的内容(即为购物车中小计的数值被赋值)
                        gods[j].children[4].innerHTML = '小计:<span class="goods-single-price">' +
                            gods[j].children[2].children[1].innerHTML * gods[j].children[3].firstElementChild.innerHTML + '</span>';
                        //3.获取并更新商品总数量(调用重新执行>刷新数据)
                        that.getGoodsNumAndUpdate();
                        //4.获取并更新总货物总价格(调用重新执行>刷新数据)
                        that.getGoodsPriceAndUpdate();
                        //给flag赋值为false
                        flag = false;
                        //跳出本次循环
                        break;
                    } else {
                        //购物车table中所有子元素tr遍历 下的第一个子元素的内容!=类名为update元素input的父元素td的上一个兄弟元素的上一个兄弟元素的内容 时执行
                        //赋值给flag为true
                        flag = true;
                    }
                }
                if (flag) {
                    //如果没有这个菜则添加
                    //创建一个节点tr
                    let tr = document.createElement("tr");
                    //添加这个节点的内容
                    tr.innerHTML =
                        '<td>' + (gods.length - 1) + '</td>' +
                        '<td>' + this.parentNode.previousElementSibling.previousElementSibling.innerHTML +
                        '</td><td><button type="button">-</button><span class="goods-num"> 1 </span><button type="button"> +</button></td><td>单价:<span class="goods-price">' +
                        this.parentNode.previousElementSibling.innerHTML +
                        '</span></td><td>小计:<span class="goods-single-price">' +
                        this.parentNode.previousElementSibling.innerHTML +
                        '</span></td><td><input type="button" class="deled" value="删除" /></td>';
                    //给tbody里添加新元素
                    god.firstElementChild.insertBefore(tr, god.firstElementChild.lastElementChild);
                    //触发事件按钮
                    that.eventBind();
                    //3.获取并更新商品总数量(调用重新执行>刷新数据)
                    that.getGoodsNumAndUpdate();
                    //4.获取并更新总货物总价格(调用重新执行>刷新数据)
                    that.getGoodsPriceAndUpdate();
                }
            }
            //重新排猜你喜欢里的商品序号
            for (let i = 1; i < updateTable.firstElementChild.children.length; i++) {
                //排好的数值赋值给新添加的商品序号值
                updateTable.firstElementChild.children[i].firstElementChild.innerHTML = i;
            }
        }
    }
    //触发事件按钮
    eventBind() {
        //获取所有标签名为botton的按钮
        let oBtns = document.getElementsByTagName("button");
        //这个this是为了避免在事件体内cart的对象被覆盖
        let that = this;
        //循环所有botton按钮
        for (let i = 0; i < oBtns.length; i++) {
            if (i % 2) {//为奇数时触发addGoods()方法
                oBtns[i].onclick = function () {
                    that.addGoods(this);
                }
            } else {//为偶数时触发minGoods()方法
                oBtns[i].onclick = function () {
                    that.minGoods(this);
                }
            }
        }
        //获取所有类名为deled的元素
        let oDelBtns = document.getElementsByClassName("deled");
        //循环所有deled元素
        for (let i = 0; i < oDelBtns.length; i++) {
            //deled元素的点击事件
            oDelBtns[i].onclick = function () {
                //调用delGoods()方法执行删除效果
                that.delGoods(this);
            }
        }
        //调用添加订单
        this.update();
    }
}
let c = new Cart();