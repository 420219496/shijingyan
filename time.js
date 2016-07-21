var WINDOW_WIDTH=981;
var WINDOW_HEIGHT=200;
var r=3.5;
var LEFT=150;
var TOP=10;

var balls = [];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]

window.onload=function(){
	var canvas=document.getElementById("canvas");
	var context=canvas.getContext("2d");
	canvas.width=WINDOW_WIDTH;
	canvas.height=WINDOW_HEIGHT;
	sec=abc();

setInterval(
	function(){
		render(context);
		update();
	}
	,50)
	
};

function update(){

	var nsec=abc();
	var day1=parseInt(sec/60/60/24/100);
	var day2=parseInt((sec/60/60/24-day1*100)/10);
	var day3=parseInt(sec/60/60/24-day1*100-day2*10);
	var h=parseInt(sec%(24*60*60)/60/60);
	var h1=parseInt(h/10);
	var h2=h%10;
	var m=parseInt(sec%(60*60)/60);
	var m1=parseInt(m/10);
	var m2=m%10;
	var s=parseInt(sec%60);
	var s1=parseInt(s/10);
	var s2=s%10;

	var nday1=parseInt(nsec/60/60/24/100);
	var nday2=parseInt((nsec/60/60/24-nday1*100)/10);
	var nday3=parseInt(nsec/60/60/24-nday1*100-nday2*10);
	var nh=parseInt(nsec%(24*60*60)/60/60);
	var nh1=parseInt(nh/10);
	var nh2=nh%10;
	var nm=parseInt(nsec%(60*60)/60);
	var nm1=parseInt(nm/10);
	var nm2=nm%10;
	var ns=parseInt(nsec%60);
	var ns1=parseInt(ns/10);
	var ns2=ns%10;

	if(nsec!=sec){
		sec=nsec;
		if(nday1!=day1){
			addballs(LEFT,TOP,day1);
		};
		if(nday2!=day2){
			addballs(LEFT+8*2*(r+1),TOP,day2);
		};
		if(nday3!=day3){
			addballs(LEFT+16*2*(r+1),TOP,day3);
		};
		if(nh1!=h1){
			addballs(LEFT+28*2*(r+1),TOP,h1);
		};
		if(nh2!=h2){
			addballs(LEFT+36*2*(r+1),TOP,h2);
		};
		if(nm1!=m1){
			addballs(LEFT+49*2*(r+1),TOP,m1);
		};
		if(nm2!=m2){
			addballs(LEFT+57*2*(r+1),TOP,m2);
		};
		if(ns1!=s1){
			addballs(LEFT+70*2*(r+1),TOP,s1);
		};
		if(ns2!=s2){
			addballs(LEFT+78*2*(r+1),TOP,s2);
		};
	}
	updateballs();
}

function updateballs(){
	for(var i=0;i<balls.length;i++){
		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		balls[i].vy+=balls[i].g;
		if(balls[i].y>=WINDOW_HEIGHT-r){
			balls[i].y=WINDOW_HEIGHT;
			balls[i].vy=-balls[i].vy*0.75;
		}
	}
}

function render(cxt){
	cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
	var day1=parseInt(sec/60/60/24/100);
	var day2=parseInt((sec/60/60/24-day1*100)/10);
	var day3=parseInt(sec/60/60/24-day1*100-day2*10);
	var h=parseInt(sec%(24*60*60)/60/60);
	var h1=parseInt(h/10);
	var h2=h%10;
	var m=parseInt(sec%(60*60)/60);
	var m1=parseInt(m/10);
	var m2=m%10;
	var s=parseInt(sec%60);
	var s1=parseInt(s/10);
	var s2=s%10;
	renderDigit(LEFT,TOP,day1,cxt);
	renderDigit(LEFT+8*2*(r+1),TOP,day2,cxt);
	renderDigit(LEFT+16*2*(r+1),TOP,day3,cxt);

	renderDigit(LEFT+28*2*(r+1),TOP,h1,cxt);
	renderDigit(LEFT+36*2*(r+1),TOP,h2,cxt);

	renderDigit(LEFT+45*2*(r+1),TOP,10,cxt);

	renderDigit(LEFT+49*2*(r+1),TOP,m1,cxt);
	renderDigit(LEFT+57*2*(r+1),TOP,m2,cxt);

	renderDigit(LEFT+66*2*(r+1),TOP,10,cxt);

	renderDigit(LEFT+70*2*(r+1),TOP,s1,cxt);
	renderDigit(LEFT+78*2*(r+1),TOP,s2,cxt);

	for(var i=0;i<balls.length;i++){
		cxt.fillStyle=balls[i].color;
		cxt.beginPath();
		cxt.arc(balls[i].x, balls[i].y, r, 0, 2*Math.PI, true);
		cxt.closePath();
		cxt.fill();
	}
};
function abc(){
	var now=new Date();
	var later=new Date("03/20/2016 0:13:01");
	var sec=parseInt((now.getTime()-later.getTime())/1000);
	return sec;
}

function renderDigit(x,y,num,cxt){
	cxt.fillStyle='#d45d5c';
	for (var i = 0;i < digit[num].length;i++)
        for (var j = 0;j < digit[num][i].length;j++)
				if (digit[num][i][j]==1) {
					cxt.beginPath();
					cxt.arc(x+j*2*(r+1)+r+1, y+i*2*(r+1)+r+1, r, 0, 2*Math.PI,false);
					cxt.closePath();
					cxt.fill();
				}

}
function addballs(x,y,num){
	for (var i = 0;i < digit[num].length;i++)
        for (var j = 0;j < digit[num][i].length;j++)
        	if(digit[num][i][j]){
        		var aball={
        			x:x+j*2*(r+1)+r+1,
        			y:y+i*2*(r+1)+r+1,
        			g:1.5+Math.random(),
        			vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
        			vy:-5,
        			color:colors[Math.floor(Math.random()*colors.length)]
        		}
        		balls.push(aball);
        	}
}
