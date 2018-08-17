import React from "react";

export default class solarComponent extends React.PureComponent {
  componentDidMount=() => {
  	this.initMagicCube();
  }

  initMagicCube=() => {
  	const magicCube = this.magicCube;
  	magicCube.width = 600;
  	magicCube.height = magicCube.width;
  	const ctx = magicCube.getContext("2d"); 

  	const magicCube2 = this.magicCube2;
  	magicCube2.width = 600;
  	magicCube2.height = magicCube2.width;
  	const ctx2 = magicCube2.getContext("2d");

  	const draw = () => {
  		ctx.clearRect(0, 0, magicCube.width, magicCube.height);
  		const time = new Date();
  		this.drawMagicCube(ctx, magicCube, time);
  		this.drawMagicCube2(ctx2, magicCube2, time);
  		this.imgs.src = magicCube.toDataURL();
  		requestAnimationFrame(draw);
  	};
  	draw();
  }

  drawMagicCube2=(ctxs, magicCube, time) => {
  	const ctx = ctxs;
  	const core = magicCube.width / 2;
  	ctx.beginPath();
  	ctx.fillStyle = "rgb(0,0,0)";
  	ctx.fillRect(0, 0, magicCube.width, magicCube.width);
  	ctx.fill();
  	ctx.closePath();
  	ctx.beginPath();
  	ctx.fillStyle = "rgb(253,242,139)";
  	ctx.arc(core, core, 50, 0, Math.PI * 2);
  	ctx.fill();
  	ctx.closePath();
  	ctx.save();
  	// 绘制earth轨道
  	const eradius = 200;
  	ctx.beginPath();
  	ctx.strokeStyle = "rgb(255,255,0)";
  	ctx.arc(core, core, eradius, 0, Math.PI * 2);
  	ctx.stroke();
  	ctx.closePath();
  	// 绘制地球
  	ctx.beginPath();
  	ctx.translate(core, core);
  	const rotate = ((((2 * Math.PI) / 60) * time.getSeconds()) + (((2 * Math.PI) / 60000) * time.getMilliseconds())) - 2.4;
  	ctx.rotate(rotate);
  	ctx.fillStyle = "rgb(3,169,244)";
  	ctx.arc(eradius - 60, eradius - 60, 20, 0, Math.PI * 2);
  	ctx.fill();
  	// 绘制月球轨道
  	ctx.beginPath();
  	ctx.strokeStyle = "rgba(255,255,255,.6)";
  	ctx.arc(eradius - 60, eradius - 60, 80, 0, Math.PI * 2);
  	ctx.stroke();
  	// 绘制月球
  	ctx.beginPath();
  	ctx.translate(eradius - 60, eradius - 60);
  	ctx.rotate(rotate * 10);
  	ctx.fillStyle = "rgb(255,255,255)";
  	ctx.arc(55, 55, 10, 0, 2 * Math.PI);
  	ctx.fill();
  	ctx.closePath();
  	ctx.restore();
  }

  drawMagicCube=(ctxs, magicCube, time) => {
  	const ctx = ctxs;
  	const core = magicCube.width / 2;
  	ctx.beginPath();
  	ctx.fillStyle = "rgb(0,0,0)";
  	ctx.fillRect(0, 0, magicCube.width, magicCube.width);
  	ctx.fill();
  	ctx.closePath();
  	ctx.beginPath();
  	ctx.fillStyle = "rgb(253,242,139)";
  	ctx.arc(core, core, 50, 0, Math.PI * 2);
  	ctx.fill();
  	ctx.closePath();
  	ctx.save();
  	// 绘制earth轨道
  	const eradius = 200;
  	ctx.beginPath();
  	ctx.strokeStyle = "rgb(255,255,0)";
  	ctx.arc(core, core, eradius, 0, Math.PI * 2);
  	ctx.stroke();
  	ctx.closePath();
  	const degree = (time.getSeconds() + (time.getMilliseconds() / 1000)) * 6;
  	const dg = (Math.PI * (degree - 90)) / 180;
  	const x = core + (Math.cos(dg) * eradius);
  	const y = core + (Math.sin(dg) * eradius);
  	// 绘制地球
  	ctx.beginPath();
  	ctx.fillStyle = "rgb(3,169,244)";
  	ctx.arc(x, y, 20, 0, Math.PI * 2);
  	ctx.fill();
  	ctx.closePath();
  	// 绘制月球轨道
  	ctx.beginPath();
  	ctx.strokeStyle = "rgba(255,255,255,.6)";
  	ctx.arc(x, y, 80, 0, 2 * Math.PI);
  	ctx.stroke();
  	ctx.closePath();
  	// 绘制月球
  	ctx.beginPath();
  	ctx.fillStyle = "rgb(255,255,255)";
  	ctx.arc(x + (Math.cos(dg * 10) * 80), y + (Math.sin(dg * 10) * 80), 10, 0, 2 * Math.PI);
  	ctx.fill();
  	ctx.closePath();
  }

  render() {
  	return (
  		<div style={{ position: "relative", width: "500px", height: "500px" }}>
  			<canvas
  				style={{ position: "absolute",
  					top: "100px",
  					left: "100px",
  					border: "1px solid #000",
  					width: "300px",
  					height: "300px",
  					display: "none",
  				}}
  				ref={(r) => { this.magicCube = r; }}
  			/>
  			<canvas
  				style={{ position: "absolute",
  					top: "100px",
  					left: "400px",
  					border: "1px solid #000",
  					width: "300px",
  					height: "300px",
  				}}
  				ref={(r) => { this.magicCube2 = r; }}
  			/>
  			<img
  				alt=""
  				style={{ position: "absolute",
  					top: "400px",
  					left: "100px",
  					border: "1px solid #000",
  					width: "300px",
  					height: "300px",
  				}}
  				ref={(r) => { this.imgs = r; }}
  			/>
  		</div>
  	);
  }
}
