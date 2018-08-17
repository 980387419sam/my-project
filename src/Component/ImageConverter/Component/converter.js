
const canvasImg = {width:300};

export default class converter {
	constructor(props){
		this.images=props.images;
		this.converter=props.converter; 
	}

    init =() =>{
    	this.initImages();
    }

    canvas0nMouseDown = (e)=>{
    	console.log(e.clientX);
    }

    initImages=()=>{
    	this.images.width = canvasImg.width;
    	this.images.height = canvasImg.width; 
    	const ctx = this.images.getContext("2d");
    	var img = new Image();
    	img.onload = ()=>{
    		ctx.drawImage(img, 0, 0, canvasImg.width, canvasImg.width);
    		this.initConverter(ctx);
    	};
    	img.src =require("./test1.jpg");
    }

    initConverter=(ctxi)=>{
    	this.converter.width = canvasImg.width;
    	this.converter.height = canvasImg.width;
    	const ctx = this.converter.getContext("2d");
    	// for(let x=0;x<canvasImg.width;x++){
    	// 	for(let y=0;y<canvasImg.width;y++){
    	// 		var c = ctxi.getImageData(x, y, 1, 1).data;
    	// 		ctx.beginPath();
    	// 		ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${c[3]})`;
    	// 		ctx.fillRect(x, y, 1, 1);
    	// 		ctx.fill();
    	// 		ctx.closePath();
    	// 	}
    	// }
		
    	const x1 = 300;
    	const x2 = 300;
    	var cq = ctxi.getImageData(0, 0, x1, x2).data;
    	const datas = [];
    	cq.forEach((dqs,index)=>{
    		const i = index%4;
    		const cr = (index - i) / 4;
    		if(datas[cr]){
    			datas[cr][i] = dqs;
    		}else{
    			datas[cr] = [dqs];
    		}
    	});
    	// console.log(cq,length,datas);
    	datas.forEach((c,i)=>{
    		ctx.beginPath();
    		ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${c[3]})`;
    		ctx.fillRect(i%x1, (i-i%x1)/x1, 1, 1);
    		ctx.fill();
    		ctx.closePath();
    	});
    	// for(var i = 0;i,length;i++){
    	// 	const c = [cq[i*4],cq[i*4+1],cq[i*4+2],cq[i*4+3]];
    	// 	const y = cq.length%4;
    	// 	
    	// }
    }
}