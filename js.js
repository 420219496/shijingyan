var now = new Date();
var date = new Date("2016-03-20 0:13:45");
var h=(now.getTime()-date.getTime())/(24*60*60*1000);
h=Math.round(h);
document.getElementById('big700').innerHTML=h;