// 定义个函数来实现动画效果
//obj 对象 attr 修改样式 target 目标终点  speed 速度
function move(obj, attr, target, speed, callback) { //attr ->left/top/width/height
	clearInterval(obj.timer); //关闭上一个定时器
	var current = parseInt(getStyle(obj, attr));//获obj原来的left值
	if (current > target) { //判断方向
		speed = -speed; //设置方向
	}
	//开启一个定时器 向执行动画对象中添加属性来保存
	obj.timer = setInterval(function () {
		var oldValue = parseInt(getStyle(obj, attr));//获obj原来的left值
		var newValue = oldValue + speed; //在旧基础上修改
		if ((speed > 0 && newValue > target) || (speed < 0 && newValue < target)) {
			newValue = target;
		}
		obj.style[attr] = newValue + "px"; //修改left值
		//到达 target 停止
		if (newValue == target) {
			clearInterval(obj.timer); //关闭定时器
			// 动画调用完毕来调用回调函数 只会执行一次
			callback && callback();
		}
	}, 28);

};
//创建一个函数来返回元素样式
function getStyle(obj, name) {
	if (obj.currentStyle) {
		return obj.currentStyle[name];//IE8
	} else {//正常浏览器
		return getComputedStyle(obj, null)[name];//正常浏览器
	}
};

/*//定义一个函数，用来向一个元素中添加指定的c1ss属性值
		参数：
			obj要添加c1ass属性的元素
			cn要添加的c1ass值 
	*/
function addClass(obj, cn) {
	if (!hasClass(obj, cn)) {
		obj.className +=" "+cn;
	}
};
// 定义函数判断是否存在类
function hasClass(obj, cn) {
	// var reg = /\bcn\b/;
	var reg = new RegExp("\\b"+cn+"\\b");
	return reg.test(obj.className);
};
// 删除class里属性 的函数
function removeClass(obj, cn) {
	var reg = new RegExp("\\b"+cn+"\\b");
	obj.className = obj.className.replace(reg,""); //替换
};
// 判断class属性里是否有 
// 有则删除  无则添加
function toggleClass(obj, cn) {
	if (hasClass(obj, cn)) {
		// 有
		removeClass(obj, cn);
	} else {
		// 无
		addClass(obj, cn);
	}
};

function DateFormat(pattern, time) {
    // console.log(pattern);  // "YYYY-MM-DD hh:mm:ss"

    if (time != undefined) { // 没有参数
        var date = new Date(time);
    } else {  //没有参数
        var date = new Date();
    }

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    return pattern.replace("YYYY", year).replace("MM", beautify(month)).replace("DD", beautify(day)).replace("hh", beautify(hour)).replace("mm", beautify(minute)).replace("ss", beautify(second));


}

function beautify(num) {
    return num < 10 ? "0" + num : num;
}
 // 封装函数区域 取两个数中间随机正整数
 function numRandom(a, b) {
	var max = Math.max(a, b)
	var min = Math.min(a, b)
	return Math.floor(Math.random() * (max - min + 1) + min)
}
 //传入一个字符串和位数 返回这字符串中随机的位数字符串
 function innerCode(chars, n) {
	var str = ''
	for (var i = 0; i < n; i++) {
		var res = numRandom(0, chars.length - 2)
		var newStr = chars[res]
		str += newStr
	}
	return str
}