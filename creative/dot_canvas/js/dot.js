$(function(){

  var canvas = document.querySelector('canvas'),
      ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth;     //设置canvas的大小为浏览器可视范围
  canvas.height = window.innerHeight;
  ctx.lineWidth = .3;                          //stroke()线条的宽度
  ctx.strokeStyle = (new Color(150)).style;   //stroke()的颜色;stroke()通过线条来绘制图形轮廓。

  var mousePosition = {
    x: 30 * canvas.width / 100,
    y: 30 * canvas.height / 100
  };

  var dots = {
    nb: 350,     //页面中星点的个数
    distance: 60,    //连接点i、j的间距(小于)
    d_radius: 100,    //连接的范围
    array: []
  };
//加的：让dots参数随机变
  function changeDot(){
    //dots.d_radius = Math.random() * 255;
    //dots.distance = Math.random() * 100;
    //dots.nb = 950 + Math.random() * 100;
    //mousePosition.x = canvas.width * Math.random();
    //mousePosition.y = canvas.height * Math.random();
    //alert(mousePosition.y);
    //iTime=setTimeout("changeDot()",100);
  }

//用于生成随机颜色
  function colorValue(min) {
    return Math.floor(Math.random() * 255 + min);
  }
  function createColorStyle(r,g,b) {
    return 'rgba(' + r + ',' + g + ',' + b + ', 0.8)';
  }
  function Color(min) {
    min = min || 0;
    this.r = colorValue(min);
    this.g = colorValue(min);
    this.b = colorValue(min);
    this.style = createColorStyle(this.r, this.g, this.b);
  }


//生成dot点
  function createDots(){
    for(i = 0; i < dots.nb; i++){
      dots.array.push(new Dot());    //push()方法可向数组的末尾添加一个或多个元素，并返回新的长度。
    }
  }
  function Dot(){
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.vx = -.5 + Math.random()*1.5;     //用于改变dot移动速度
    this.vy = -.5 + Math.random()*1.5;

    this.radius = Math.random() * 2.0 ;    //设置dot的半径

    this.color = new Color();
    console.log(this);
  }
  function drawDots() {
    for(i = 0; i < dots.nb; i++){
      var dot = dots.array[i];
      dot.draw();
    }
  }
  Dot.prototype = {
    draw: function(){
      ctx.beginPath();
      ctx.fillStyle = this.color.style;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);    //画圆；false为顺时针
      ctx.fill();    //充填颜色
    }
  };


//移动dot，通过dot.x，dot.y
  function moveDots() {
    for(i = 0; i < dots.nb; i++){

      var dot = dots.array[i];

      if(dot.y < 0 || dot.y > canvas.height){
        dot.vx = dot.vx;
        dot.vy = - dot.vy;
      }
      else if(dot.x < 0 || dot.x > canvas.width){
        dot.vx = - dot.vx;
        dot.vy = dot.vy;
      }
      dot.x += dot.vx;
      dot.y += dot.vy;
    }
  }

//连接dots.d_radius范围(圆心mousePosition)内的点【点与点间距离小于dots.distance】
  function connectDots() {
    for(i = 0; i < dots.nb; i++){
      for(j = 0; j < dots.nb; j++){
        i_dot = dots.array[i];
        j_dot = dots.array[j];

        if((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance){
          //判断|i_dot-j_dot|<dots.distance
          if((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > - dots.d_radius && (i_dot.y - mousePosition.y) > - dots.d_radius){
            //判断|i_dot-mousePosition|<d_radius
            ctx.beginPath();
            ctx.strokeStyle = averageColorStyles(i_dot, j_dot);   //得到颜色的rgba()
            ctx.moveTo(i_dot.x, i_dot.y);
            ctx.lineTo(j_dot.x, j_dot.y);
            ctx.stroke();          //连接i、j两个点
            ctx.closePath();
          }
        }
      }
    }
  }
//处理i、j两个点的颜色值
  function averageColorStyles(dot1, dot2) {
    var color1 = dot1.color,
        color2 = dot2.color;
    
    var r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius),
        g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius),
        b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius);
    return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b));
  }
  function mixComponents(comp1, weight1, comp2, weight2) {
    return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
  }
  

  function animateDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);    //清空整个canvas；clearRect()方法清空给定矩形内的指定像素。
    moveDots();
    //changeDot();
    connectDots();
    drawDots();
    requestAnimationFrame(animateDots);	
  }

//识别鼠标
  $('canvas').on('mousemove', function(e){
    mousePosition.x = e.pageX;                  //鼠标移动，以鼠标位置为dots.d_radius圆心
    mousePosition.y = e.pageY;
  });

  $('canvas').on('mouseleave', function(e){
    mousePosition.x = canvas.width / 2;        //鼠标离开，将dots.d_radius圆心移动canvas中心
    mousePosition.y = canvas.height / 2;
  });

  createDots();     //生成圆点
  requestAnimationFrame(animateDots);	   //间隔时间：总体来说维持在了60fps上下。

});
