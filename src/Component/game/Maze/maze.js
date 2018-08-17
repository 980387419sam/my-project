
import {Maps,ImgConfig,Wall,Box,Start,Ends} from "./config";

export default class Maze {
	constructor(props){
		this.canvas = props.canvas;
		this.converter = props.converter;
		this.converter2 = props.converter2;
	}

    init=()=>{
    	this.initMazeImg();
    }

    canvas0nMouseDown = (e)=>{
    	console.log(e.clientX);
    }

    initMazeImg=()=>{
    	const {widthPx,heightPx} = Maps;
    	const {company,company2} = ImgConfig;
    	this.canvas.width = widthPx;
    	this.canvas.height = heightPx;
    	const ctx = this.canvas.getContext("2d");
    	var img = new Image();
    	img.onload = ()=>{
    		ctx.drawImage(img, 0, 0, widthPx,  heightPx);
    		const datas = this.initDrawImage(ctx,company);
    		const ctxc = this.initConverter(datas,company,this.converter);
    		// const datas2 = this.initDrawImage(ctxc,company2);
    		// this.initConverter(datas2,company2,this.converter2);
    		
    	};
    	img.src =require("./timg.jpg");
    }

    initDrawImage=(ctx,company)=>{
    	const {widthPx,heightPx} = Maps;
    	const datas = [];
    	for(var x = 0;x<widthPx/company;x++){
    		for(var y = 0;y<heightPx/company;y++){
    			var cq = ctx.getImageData(x*company, y*company, company, company).data;
    			const cqs = [];
    			cq.forEach((dqs,index)=>{
    				const i = index%4;
    				const cr = (index - i) / 4;
    				if(cqs[cr]){
    					cqs[cr][i] = dqs;
    				}else{
    					cqs[cr] = [dqs];
    				}
    			});
    			datas.push(cqs);
    		}
    	}
    	return datas;
    }

    initConverter=(datas,company,converter)=>{
    	const {widthPx,heightPx} = Maps;
    	converter.width = widthPx;
    	converter.height = heightPx;
    	const ctxc = converter.getContext("2d");
    	const items = [];
    	datas.forEach(da=>{
    		let a ;
    		da.forEach(db=>{
    			if(db[0]<175&&db[1]<175&&db[2]<175){
    				a = "rgb(0,0,0)";
    			}
    		});
    		a = a || "rgb(255,255,255)";
    		items.push(a);
    	});
    	const k1 = widthPx/company;
    	items.forEach((c,i)=>{
    		ctxc.beginPath();
    		ctxc.fillStyle = c;
    		ctxc.fillRect( (i-i%k1)*company/k1,i%k1*company, company, company);
    		ctxc.fill();
    		ctxc.closePath();
    	});
    	return ctxc;
    }
}