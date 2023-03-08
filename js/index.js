const cvs = document.querySelector('canvas');
const ctx = cvs.getContext('2d');
const rbimgs = document.getElementsByClassName('rbimgs')[0];
function init(){
	//缩放倍率 devicePixelRatio
	cvs.width = window.innerWidth * devicePixelRatio;
	cvs.height = window.innerHeight * devicePixelRatio;
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
		this.x = getRandom(0,cvs.width-this.r/2);
		this.y = getRandom(0,cvs.height-this.r/2);
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
			if(x > cvs.width - this.r/2){
				x = cvs.width - this.r/2;
				this.xSpeed = -this.xSpeed;
			}else if(x < 0){
				x = 0;
				this.xSpeed = -this.xSpeed;
			}
			if(y > cvs.height - this.r/2){
				y = cvs.height - this.r/2;
				this.ySpeed = -this.ySpeed;
			}else if(y < 0){
				y = 0;
				this.ySpeed = -this.ySpeed;
			}
		}
		ctx.beginPath(); //开始设置绘画
		//绘制曲线 (x,y,半径,开始角度,结束角度,true/false 逆/顺)
		ctx.arc(this.x,this.y,this.r,0,2*Math.PI); 
		ctx.fillStyle = 'rgb(200,200,200)'; //填充颜色
		ctx.fill(); //绘画 填充
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
		ctx.clearRect(0,0,cvs.width,cvs.height);//清除一个矩形区域
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
				ctx.beginPath(); //开始设置绘画  设置 起点路径
				ctx.moveTo(p1.x,p1.y); //开始坐标 以canvas左上角为原点
				ctx.lineTo(p2.x,p2.y); //从上一个点到这个点路径 
				ctx.closePath(); // 关闭路径 最后连接回起点
				ctx.strokeStyle = `rgba(200,200,200,${1-d/this.maxDis})`; 
				ctx.stroke();  //绘画 描边
			}
		}
	}
}
const g = new Graph();
g.draw();

// ctx.beginPath(); //开始设置绘画  设置 起点路径
// ctx.moveTo(80,40); //开始坐标 以canvas左上角为原点
// ctx.lineTo(200,100); //从上一个点到这个点路径
// ctx.lineTo(100,200);  //路径
// ctx.lineTo(200,400); 
// ctx.closePath(); // 关闭路径 最后连接回起点
// ctx.strokeStyle = '#fff'; //路径(描边)颜色
// ctx.stroke();  //绘画 描边
// ctx.fillStyle = '#ff4faa'; //填充颜色
// ctx.fill(); //绘画 填充

// ctx.beginPath(); //开始设置绘画
//绘制曲线 (x,y,半径,开始角度，结束角度,true/false 逆/顺)
// ctx.arc(80,40,6,0,2*Math.PI); 
// ctx.fillStyle = '#fff'; //填充颜色
// ctx.fill(); //绘画 填充

