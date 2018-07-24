
<!-- https://blog.csdn.net/u012468376/article/details/73350998 -->

# 开始
* var canvas = document.getElementById('canvas');
* var ctx = canvas.getContext('2d');

# 三种方法绘制矩形
## 绘制一个填充的矩形
* fillRect(x, y, width, height)
## 绘制一个矩形的边框
* strockRect(x, y, width, height)
## 清除指定的矩形区域，然后这块区域会变的完全透明
* clearRect(x, y, width, height)

# 绘制路径
## 新建一条路径，路径一旦创建成功，图形绘制命令被指向到路径上生成路径
* beginPath()
## 把画笔移动到指定的坐标(x, y)。相当于设置路径的起始点坐标
* moveTo(x, y)
## 闭合路径之后，图形绘制命令又重新指向到上下文中
* closePath()
## 通过线条来绘制图形轮廓
* stroke()
## 通过填充路径的内容区域生成实心的图形
* fill()

<!-- function draw(){
    var canvas = document.getElementById('tutorial');
    if (!canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    ctx.beginPath(); //新建一条path
    ctx.moveTo(50, 50); //把画笔移动到指定的坐标
    ctx.lineTo(200, 50);  //绘制一条从当前位置到指定坐标(200, 50)的直线.
    //闭合路径。会拉一条从当前点到path起始点的直线。如果当前点与起始点重合，则什么都不做
    ctx.closePath();
    ctx.stroke(); //绘制路径。
}
draw(); -->

# 绘制圆弧：
## 以(x, y)为圆心，以r为半径，从 startAngle弧度开始到endAngle弧度结束。anticlosewise是布尔值，true表示逆时针，false表示顺时针。
* arc(x, y, r, startAngle, endAngle, anticlockwise)
<!-- ctx.beginPath();
ctx.arc(150, 150, 40, 0, Math.PI, false);
ctx.fill(); -->

## 根据给定的控制点和半径画一段圆弧，最后再以直线连接两个控制点。
* arcTo(x1, y1, x2, y2, radius)
<!-- ctx.beginPath()
ctx.moveTo(50, 50)
ctx.arcTo(200, 50, 200, 200, 150)
ctx.lineTo(200, 200)
ctx.stroke() -->

# 绘制贝塞尔曲线
## 绘制二次贝塞尔曲线  起始点(x,y)；控制点(cp1x,cp1x)；终点(x2,y2)
* quadraticCurveTo(cp1x, cp1y, x2, y2)
<!-- ctx.beginPath()
ctx.moveTo(x, y)
ctx.quadraticCurveTo(cp1x, cp1x, x2, y2);
ctx.stroke(); -->

## 绘制三次贝塞尔曲线 控制点1(cp1x,cp1x);控制点2(cp2x,cp2x)；终点(x2,y2)
* bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x2, y2)
<!-- ctx.beginPath()
ctx.moveTo(x, y)
ctx.bezierCurveTo(cp1x, cp1x, cp2x, cp2y, x2, y2);
ctx.stroke(); -->

# 添加样式和颜色
## 设置图形的填充颜色
* fillStyle = color
## 设置图形轮廓的颜色
* strokeStyle = color

## 透明度
* globalAlpha = transparencyValue

## 线宽
* lineWidth = number

## 线条末端样式
* lineCap = 
* butt：线段末端以方形结束
* round：线段末端以圆形结束
* square：线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

## 同一个path内，设定线条与线条间接合处的样式。
* lineJoin = 
* round:通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。 圆角的半径是线段的宽度。
* bevel:在相连部分的末端填充一个额外的以三角形为底的区域， 每个部分都有各自独立的矩形拐角。
* miter:通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域。(默认)

## 虚线
* 用 setLineDash 方法和 lineDashOffset 属性来制定虚线样式. 
setLineDash 方法接受一个数组，来指定线段与间隙的交替；
lineDashOffset属性设置起始偏移量.
<!-- ctx.setLineDash([20, 5]);  // [实线长度, 间隙长度]
ctx.lineDashOffset = -0;
ctx.strokeRect(50, 50, 210, 210); -->

# 绘制文本
## 在指定的(x,y)位置填充指定的文本，绘制的最大宽度是可选的.
* fillText(text, x, y [, maxWidth])

## 在指定的(x,y)位置绘制文本边框，绘制的最大宽度是可选的.
* strokeText(text, x, y [, maxWidth])

## 当前我们用来绘制文本的样式。这个字符串使用和 CSS font属性相同的语法. 默认的字体是 10px sans-serif。
* font = value

## 文本对齐选项. 可选的值包括：start, end, left, right or center. 默认值是 start。
* textAlign = value

## 基线对齐选项，可选的值包括：top, hanging, middle, alphabetic, ideographic, bottom。默认值是 alphabetic。
* textBaseline = value

## 文本方向。可能的值包括：ltr, rtl, inherit。默认值是 inherit。
* direction = value

# 绘制图片
## 参数1：要绘制的img  参数2、3：绘制的img在canvas中的坐标
* ctx.drawImage(img,0,0); 

<!-- var img = new Image();   // 创建img元素
img.onload = function(){
  ctx.drawImage(img, 0, 0)
}
img.src = 'myImage.png'; // 设置图片源地址 -->

<!-- function draw(){
    var canvas = document.getElementById('tutorial');
    if (!canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    var img = document.querySelector("img");
    ctx.drawImage(img, 0, 0);
}
document.querySelector("img").onclick = function (){
    draw();
} -->

## 缩放图片:这个方法多了2个参数：width 和 height，这两个参数用来控制 当像canvas画入时应该缩放的大小。
* drawImage(image, x, y, width, height)

## 切片: 2-5个是定义图像源的切片位置和大小，后4个则是定义切片的目标显示位置和大小。
* drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)

# 状态的保存和恢复
## save 和 restore 方法是用来保存和恢复 canvas 状态的，都没有参数。
## save将当前状态的strokeStyle, fillStyle, globalAlpha, lineWidth, lineCap, lineJoin, miterLimit, shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor, globalCompositeOperation 的值 保存下来
## restore取出save保存的值

# 变形
## translate方法接受两个参数。x 是左右偏移量，y 是上下偏移量，如右图所示
* translate(x, y)

## 旋转坐标轴：旋转的角度(angle)，它是顺时针方向的，以弧度为单位的值
* rotate(angle) Math.PI 

## scale方法接受两个参数。x,y分别是横轴和纵轴的缩放因子，它们都必须是正值。值比 1.0 小表示缩 小，比 1.0 大则表示放大，值为 1.0 时什么效果都没有。
* scale(x, y)

## 变形矩阵
## a (m11)​ Horizontal scaling. 水平缩放
## b (m12)​ Horizontal skewing.
## c (m21)​ Vertical skewing.
## d (m22)​ Vertical scaling. 垂直缩放
## e (dx)​ Horizontal moving. x轴移动 
## f (dy)​ Vertical moving. y轴移动
* transform(a, b, c, d, e, f)

# 合成:globalCompositeOperation = type
## 新图像会覆盖在原有图像
* source-over(default)

## 仅仅会出现新图像与原来图像重叠的部分，其他区域都变成透明的。(包括其他的老图像区域也会透明)
* source-in

## 仅仅显示新图像与老图像没有重叠的部分，其余部分全部透明。(老图像也不显示)
* source-out

## 新图像仅仅显示与老图像重叠区域。老图像仍然可以显示
* source-atop

## 新图像会在老图像的下面。
* destination-over

## 仅仅新老图像重叠部分的老图像被显示，其他区域全部透明。
* destination-in

## 仅仅老图像与新图像没有重叠的部分。 注意显示的是老图像的部分区域。
* destination-out

## 老图像仅仅仅仅显示重叠部分，新图像会显示在老图像的下面。
* destination-atop

## 新老图像都显示，但是重叠区域的颜色做加处理
* lighter

## 保留重叠部分最黑的像素。(每个颜色位进行比较，得到最小的)
* darken

## 保证重叠部分最量的像素。(每个颜色位进行比较，得到最大的)
* lighten

## 重叠部分会变成透明
* xor

## 只有新图像会被保留，其余的全部被清除(边透明)
* copy

# 裁剪路径
## 把已经创建的路径转换成裁剪路径
* clip()
