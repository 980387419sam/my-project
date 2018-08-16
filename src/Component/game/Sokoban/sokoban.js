
import $ from "jquery";
import {Maps,Wall,Box,Start,Ends} from "./config";
import InitEvent from "./initEvent";

class Sokoban {
	constructor({id}){
		this.sokobanDiv = $("#"+id);
		this.divs = "",
		this.allCoordinates = {};
		this.endCoordinates = {};
		this.event = {};
	}
    init=(func)=>{
    	this.initDokobanDiv();
    	this.initDokobanWall();
    	this.initDokobanBox();
    	this.initDokobanStart();
    	this.initDokobanEnd();
    	this.sokobanDiv.append(this.divs);
    	this.initEvent(func);
    }

    initDokobanDiv=()=>{
    	const {width,height,proportion} = Maps;
    	this.sokobanDiv.css({
    		width:width*proportion+"px",
    		height:height*proportion+"px",
    		backgroundColor:"#eee",
    		position:"relative"
    	});
    }
	
	divFun = ({backgrounColor,left,top,type})=>{
		const {proportion} = Maps;
		const key = left+"_"+top;
		const className = key+"_"+type;
		if(type===Maps.types.end){
			this.endCoordinates[key] = {
				type:type,
				class:className,
			};
		}else{
			this.allCoordinates[key] = {
				type:type,
				class:className,
			};
		}
		return `<div
		style="position:absolute;width:${Maps.proportion}px;height:${Maps.proportion}px;background-color:${backgrounColor};left:${left*proportion}px;top:${top*proportion}px" 
		class=${className}></div>`;
	}
	
	initDokobanWall=()=>{
		const {capping,coordinates} = Wall;
		const {width,height} = Maps;
		const backgrounColor="rgba(152,93,5,0.5)";
		const func = (left,top)=>{
			this.divs += this.divFun({backgrounColor,left,top,type:Maps.types.wall});
		};
		if(capping.top){ 
			for(var i=0;i<width-1;i++){ func(i,0); }
		}
		if(capping.right){ 
			for(var i=0;i<height-1;i++){  func((width-1),i); }
		}
		if(capping.bottom){ 
			for(var i=0;i<width-1;i++){  func((i+1),(height-1)); }
		}
		if(capping.left){ 
			for(var i=0;i<height-1;i++){  func(0,(i+1)); }
		}
		coordinates.forEach(c=>{ func(c[0],c[1]); });
	}

	initDokobanBox=()=>{
		const {coordinates} = Box;
		const backgrounColor = "rgba(0,255,0,0.5)";
		coordinates.forEach(c=>{
			this.divs +=this.divFun({
				backgrounColor,
				left:c[0],
				top:c[1],
				type:Maps.types.box
			});
		});
	}

	initDokobanStart=()=>{
		const {coordinate} = Start;
		const backgrounColor = "rgba(255,0,0,0.5)";
		this.divs += this.divFun({
			backgrounColor,
			left:coordinate[0],
			top:coordinate[1],
			type:Maps.types.start
		});
	}

	initDokobanEnd=()=>{
		const {coordinates} = Ends;
		const backgrounColor = "rgba(0,0,0,0.5)";
		coordinates.forEach(c=>{
			this.divs += this.divFun({
				backgrounColor,
				left:c[0],
				top:c[1],
				type:Maps.types.end
			});
		});
	}

	initEvent=(func)=>{
		const event = new InitEvent(this);
		event.init();
    	func(event);
	}
}

export default Sokoban;