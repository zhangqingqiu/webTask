window.onload = function () {
    let oImgList = document.querySelector(".img-list");
    // 克隆第一张图片
    let clonefirstImg = oImgList.firstElementChild.cloneNode();
    // 将克隆的图片添加到图片列表末尾
    oImgList.appendChild(clonefirstImg);

    // 代表图片的索引，当前第几张（0>第一张）
    let index = 0;

    // 设置函数节流锁 （在一段时间只能执行一次操作，不让用户频繁点击）
    let lock = true;
    function handleRightBtn() {
        if (!lock)
            return;

        index++;
        oImgList.style.left = index * -1400 + "px";
        oImgList.style.transition = "0.5s ease";
        if (index === 3) {
            index = 0;
            setTimeout(() => {
                oImgList.style.left = 0;
                // 取消过渡，500毫秒过后切换第一张
                oImgList.style.transition = "none";
            }, 500);
        }

        // 设置小圆点的高亮
        setCircles();
        // 关锁
        lock = false;
        setTimeout(() => {
            // 500毫秒后开锁
            lock = true;
        }, 500);
    }



    // 获取3个小圆点
    // 定义常量,获取3个小圆点（不可改变）
    const circles = document.querySelectorAll(".circle");

    // 小圆点高亮的显示
    function setCircles() {
        for (let i = 0; i < circles.length; i++) {
            // console.log(circles[i]);
            if (i === index) {
                circles[i].classList.add("active");
            } else {
                circles[i].classList.remove("active");
            }
        }
    };

    // 小圆点点击切换图片  使用事件代理
    const oCircle = document.querySelector(".circle-list");
    oCircle.addEventListener("click", (e) => {
        // 当我点击小圆点的时候
        // console.dir(e.target)获取节点信息
        if (e.target.nodeName.toLowerCase() === "li") {
            // 当前元素的data-n对应的值和index一一对应
            const n = Number(e.target.getAttribute("data-n"));
            index = n;
            // 设置小圆点的高亮
            setCircles();
            oImgList.style.left = index * -1400 + "px";
        }
    });

    // 自动轮播（相当于设置定时器去自动点击右按钮）
    let autoplay = setInterval(handleRightBtn, 2500);
    const oWrap = document.getElementById("wrap");

}


