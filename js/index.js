const beijincvs = document.getElementById('beijcanvas');
const beijinctx = beijincvs.getContext('2d');
const rbimgs = document.getElementsByClassName('rbimgs')[0];
function init(){
	//缩放倍率 devicePixelRatio
	beijincvs.width = window.innerWidth * devicePixelRatio;
	beijincvs.height = window.innerHeight * devicePixelRatio;
}
init();

/**
 * 获取-[min,max]范围内的随机整数
 * @return {Number}
 **/ 
 function getRandom(min,max){
	 return Math.floor(Math.random() * (max + 1 - min) + min)
 }
 
class Point{
	constructor(arg) {
		this.r = 4;
		this.x = getRandom(0,beijincvs.width-this.r/2);
		this.y = getRandom(0,beijincvs.height-this.r/2);
		this.xSpeed = getRandom(-48,48);//速度x轴
		this.ySpeed = getRandom(-48,48);//速度y轴
		this.lastDrawTime = null;
	}
	draw(){
		//更新坐标
		if(this.lastDrawTime){
			//计算新的坐标
			const duration =(Date.now() - this.lastDrawTime)/1000;
			//距离
			const xDis = this.xSpeed * duration, yDis = this.ySpeed *duration;
			//新坐标
			let x = this.x + xDis, y = this.y + yDis;
			this.x = x;
			this.y = y;
			//回弹
			if(x > beijincvs.width - this.r/2){
				x = beijincvs.width - this.r/2;
				this.xSpeed = -this.xSpeed;
			}else if(x < 0){
				x = 0;
				this.xSpeed = -this.xSpeed;
			}
			if(y > beijincvs.height - this.r/2){
				y = beijincvs.height - this.r/2;
				this.ySpeed = -this.ySpeed;
			}else if(y < 0){
				y = 0;
				this.ySpeed = -this.ySpeed;
			}
		}
		beijinctx.beginPath(); //开始设置绘画
		//绘制曲线 (x,y,半径,开始角度,结束角度,true/false 逆/顺)
		beijinctx.arc(this.x,this.y,this.r,0,2*Math.PI); 
		beijinctx.fillStyle = 'rgb(200,200,200)'; //填充颜色
		beijinctx.fill(); //绘画 填充
		this.lastDrawTime = Date.now();
	}
}
class Graph{
	// pointNumber = 30,maxDis = 400 点数量 线最远距离
	constructor(pointNumber = 48,maxDis = 280) {
	    this.point = new Array(pointNumber).fill(0).map(() => new Point());
		this.maxDis = maxDis;
	}
	draw(){
		requestAnimationFrame(() => {
			this.draw(); // 一直重新画点
		})
		beijinctx.clearRect(0,0,beijincvs.width,beijincvs.height);//清除一个矩形区域
		for (let i = 0; i < this.point.length; i++) {
			const p1 =  this.point[i];
			p1.draw();
			for (let j = i+1; j < this.point.length; j++) {
				const p2 =  this.point[j];
				// 两点之间距离
				const d = Math.sqrt((p1.x-p2.x)**2 + (p1.y-p2.y)**2);
				if(d > this.maxDis){
					continue;
				}
				beijinctx.beginPath(); //开始设置绘画  设置 起点路径
				beijinctx.moveTo(p1.x,p1.y); //开始坐标 以canvas左上角为原点
				beijinctx.lineTo(p2.x,p2.y); //从上一个点到这个点路径 
				beijinctx.closePath(); // 关闭路径 最后连接回起点
				beijinctx.strokeStyle = `rgba(200,200,200,${1-d/this.maxDis})`; 
				beijinctx.stroke();  //绘画 描边
			}
		}
	}
}
const g = new Graph();
g.draw();

// beijinctx.beginPath(); //开始设置绘画  设置 起点路径
// beijinctx.moveTo(80,40); //开始坐标 以canvas左上角为原点
// beijinctx.lineTo(200,100); //从上一个点到这个点路径
// beijinctx.lineTo(100,200);  //路径
// beijinctx.lineTo(200,400); 
// beijinctx.closePath(); // 关闭路径 最后连接回起点
// beijinctx.strokeStyle = '#fff'; //路径(描边)颜色
// beijinctx.stroke();  //绘画 描边
// beijinctx.fillStyle = '#ff4faa'; //填充颜色
// beijinctx.fill(); //绘画 填充

// beijinctx.beginPath(); //开始设置绘画
//绘制曲线 (x,y,半径,开始角度，结束角度,true/false 逆/顺)
// beijinctx.arc(80,40,6,0,2*Math.PI); 
// beijinctx.fillStyle = '#fff'; //填充颜色
// beijinctx.fill(); //绘画 填充


 // ---- 座右铭字缓出效果 -----
	var motto = [
		"醉后不知天在水，满船清梦压星河。",
		"一梦入混沌，明月撞星辰。",
        "明天不一定会更好，但要坚信更好的明天一定会来。",
        "要做的事情总找得出时间和机会，不愿意做的事情也总能找得出借口。",
        "Gor For It!",
        "那些过去的眼泪终将风干在记忆里。",
        "我欲将心向明月，奈何明月照沟渠。",
        "春风得意马蹄疾，一日看尽长安花。",
        "蒹葭苍苍，白露为霜；所谓伊人，在水一方。"
    ];
    var text = "衣带渐宽终不悔，为伊消得人憔悴。";
    var length = text.length;
    let index = 0;
    var e1 = setInterval(insWords, 150);
    var e2 = 0;
	
    function insWords() {
        if (index <= length + 1 && index >= 0) {
            $("#zuoyouming").append(text[index]);
        }
        index++;
        if (index > length) {
            index += 58;
            e2 = setInterval(delWords, 50);
            clearInterval(e1);
        }
    }

    function delWords() {
        if (index <= length && index >= 0) {
            let shower = text.substr(0, index);
            $("#zuoyouming").html(shower);
        }
        index--;
        if (index < 0) {
            index = -5;
            let i = Math.floor(motto.length * Math.random());
            text = motto[i];
            length = text.length;
            e1 = setInterval(insWords, 150);
            clearInterval(e2);
        }

    }

	// <!-- 画画布 -->
const colorPicker = document.querySelector('input');
const cvs = document.getElementById('huacanvas');
const ctx = cvs.getContext('2d');
function init2(){
	//缩放倍率 devicePixelRatio
	const w = 880,h=480;
	cvs.width = w * devicePixelRatio;
	cvs.height = h * devicePixelRatio;
	cvs.style.width = w+'px';
	cvs.style.height = h+'px';
}
init2();
// 需要绘制的图形
const shapes = [];
class Rectangle{
	constructor(color,startX,startY) {
	    this.color = color;
		this.startX = startX;
		this.startY = startY;
		this.endX = startX;
		this.endY = startY;
	}
	get minX(){
		return Math.min(this.startX,this.endX);
	}
	get maxX(){
		return Math.max(this.startX,this.endX);
	}
	get minY(){
		return Math.min(this.startY,this.endY);
	}
	get maxY(){
		return Math.max(this.startY,this.endY);
	}
	draw(){
		ctx.beginPath();
		ctx.moveTo(this.minX * devicePixelRatio,this.minY * devicePixelRatio);
		ctx.lineTo(this.maxX * devicePixelRatio,this.minY * devicePixelRatio);
		ctx.lineTo(this.maxX * devicePixelRatio,this.maxY * devicePixelRatio);
		ctx.lineTo(this.minX * devicePixelRatio,this.maxY * devicePixelRatio);
		ctx.lineTo(this.minX * devicePixelRatio,this.minY * devicePixelRatio);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.strokeStyle = '#fff';
		ctx.lineCap = 'square';
		ctx.lineWidth = 3 * devicePixelRatio;
		ctx.stroke();
	}
	
	isInside(x,y){
		return x >= this.minX && x <= this.maxX && y >=this.minY && y <= this.maxY;
	}
}
cvs.onmousedown = (e) => {
	const rect = cvs.getBoundingClientRect();
	const clickX = e.clientX - rect.left;
	const clickY = e.clientY - rect.top;
	const shape = getShapes(clickX,clickY);
	// console.log(shape);
	if (shape) {
		//拖
		console.log(shape);
		const {startX,startY,endX,endY} = shape;
		window.onmousemove = (e) =>{
			const disX = e.clientX - rect.left - clickX;
			const disY = e.clientY - rect.top - clickY;
			shape.startX = startX + disX;
			shape.endX = endX + disX;
			shape.startY = startY + disY;
			shape.endY = endY + disY;
		}
	} else{
		//新建
		const shape = new Rectangle(colorPicker.value,clickX,clickY);
		// console.log(colorPicker.value,clickX,clickY);
		shapes.push(shape);
		window.onmousemove = (e) =>{
			shape.endX = e.clientX - rect.left;
			shape.endY = e.clientY - rect.top;
		}
	}
	window.onmouseup = () =>{
		window.onmousemove = null;
		window.onmouseup =   null;
	}
}

function getShapes(x,y){
	for (let i = shapes.length-1;i>=0;i--) {
		const s = shapes[i];
		if(s.isInside(x,y)){
			return s;
		}
	}
	return null;
}

function draw(){

	requestAnimationFrame(draw);
	ctx.clearRect(0,0,cvs.width,cvs.height);
	for(const s of shapes){
		s.draw();
	}
}
draw();