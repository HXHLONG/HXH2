//  颗粒时间
const timecanvas = document.querySelector('canvas');
const ctx = timecanvas.getContext('2d',{
	willReadFrequently:true,
})
// 颗粒数量
const PARTICLE_NUM = 1500;
// 绘制文本
let text = '';
// 绘制文本大小
const FONT_SIZE = 140;
// 颗粒对象形成的数组
const particles = new Array(PARTICLE_NUM);
// 颗粒颜色
const COLOR = '#5445544d';
// 随机尺寸范围
const SIZES = [2,7];
// 开始移动时间
let starMoveTime = 0;

/**
 * 获取-[min,max]范围内的随机整数
 **/ 
 function getRandom(min,max){
	 return Math.floor(Math.random()*(max+1-min)+min)
 }
 function init(){
	 // 初始化画布尺寸
	 // timecanvas.width = window.innerWidth;
	 // timecanvas.height = window.innerHeight;
	 timecanvas.width = 800;
	 timecanvas.height = 500;
	 //初始化颗粒对象数组
	 const cx = timecanvas.width/2,
		cy = timecanvas.height/2;
	// 循环创建每一个颗粒点
	for (let i = 0; i < particles.length; i++) {
		const rad = Math.random() *2 *Math.PI;
		const size = getRandom(SIZES[0],SIZES[1]);
		const r = timecanvas.height/2;
		particles[i] = {
			sx: cx + Math.cos(rad) * r,
			sy: cy + Math.sin(rad) * r,
			x: cx + Math.cos(rad) * r,
			y: cy + Math.sin(rad) * r,
			size,
		};
		drawParticle(particles[i]);
	}
 }
 // 获取绘制文本
 function getText(){
	 // 当前时间
	 return new Date().toTimeString().substring(0,8);
 }
 // 刷新绘制
 function fps(){
	 requestAnimationFrame(() => {
		 // 要绘制文本
		 const curText = getText();
		 if(curText !== text){
			 text = curText; 
			 for(const p of particles){
				 p.sx = p.x;
				 p.sy = p.y;
			 }
			 // 更新开始移动时间
			 starMoveTime = Date.now();
		 }
		 // 获取像素点
		 const imgData = getBMP();
		 // 更新绘制
		 update(imgData);
		 fps();
	 });
 }
// 绘制并得到像素的信息
function getBMP(){
	const {width,height} = timecanvas;
	clear();
	ctx.fillStyle = '#fff';
	ctx.textBaseline = 'middle';
	ctx.font = `${FONT_SIZE}px '手扎体-简', sans-serif`;
	const textWidth = ctx.measureText(text).width;
	ctx.fillText(text,(width- textWidth)/2,height/2);
	const imgData = ctx.getImageData(0,0,width,height);
	return imgData;
}
// 更新绘制
function update(imgData){
	clear();
	const {width,height,data} = imgData;
	const dis = 4;
	const pxls = [];
	for(let w = 0;w<width;w+=dis){
		for (let h = 0; h < height; h+=dis) {
			const i = (w+h *width) *4;
			if(data[i]>10){
				pxls.push([w,h]);
			}
		}
	}
	const count = Math.min(particles.length, pxls.length);
	const duration = 400;
	const timeSpan = Date.now() - starMoveTime;
	for (let i = 0; i < count; i++) {
		const p = particles[i];
		const {sx,sy} = p;
		const [tx,ty] = pxls[i];
		const disX = tx-sx,
			dixY=ty-sy;
		let moveX = (disX / duration)* timeSpan,
			moveY = (disY / duration) * timeSpan;
		if(Math.abs(moveX) > Math.abs(disX)){
			moveX = disX;
		}
		if(Math.abs(moveY) > Math.abs(disY)){
			moveY = disY;
		}
		p.x = sx+moveX;
		p.y = sy+moveY;
		drawParticle(p);
	}
}
function clear(){
	const {width,height} = timecanvas;
	ctx.clearRect(0,0,width,height);
}
init();

Vue.config.productionTip = false;
// const Dsp = new Vue({
// 	el: '#app', //找到容器
// 	data(){
// 		return{
			
// 		}
// 	}
// });
// $(function() {
// 	$.ajax({
// 		//调用的接口
// 		url: 'https://api.apiopen.top/api/getHaoKanVideo?page=0&size=6',
// 		//请求的类型
// 		type: 'get',
// 		//传输的数据
// 		//请求成功后运行的函数
// 		success: (data) => {
// 			Dsp.lists = data.result.list
// 			// console.log(data.result.list);
// 		},
// 		error: (data) => {
// 			console.log("调用接口失败！！！");
// 		}
// 	})
// });
// setTimeout(function() {
// 	// _this.$refs.video.src = 你的视频地址
// 	var videos = $(".videos");
// 	for (let i = 0; i < videos.length; i++) {
// 		 // Dsp.lists[i].playUrl
// 		 Dsp.videoHtml="<source src="+Dsp.lists[i].playUrl+" type='video/mp4'>"
// 	}
// }, 400);
