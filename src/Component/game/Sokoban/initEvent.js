
import $ from "jquery";
import cloneDeep from "lodash/cloneDeep";
import config from "./config";
import {ajaxFun} from "../../../Request";
const md5 = require("blueimp-md5");

const {Maps,Start} = config;
const mapName = md5(JSON.stringify(config));

export default class initEvent {
	constructor({allCoordinates,endCoordinates}){
		this.allCoordinates = cloneDeep(allCoordinates);
		this.endCoordinates = endCoordinates;
		this.deadAngles = [];
		this.timer = null;
		this.recordSteps = [];
		this.recordStepDatas = [];
		this.a = "_";
		this.endWelt = 0;
	}
    init =async ()=>{
    	const res = await ajaxFun("get","/game/sokoban/get",{
    		mapName,
    		type:"getCount"
    	});
    	this.count = res.count;
    	this.initDeadAngle();
    	const {arrows:{up,right,down,left}} = Maps;
    	$(document).keydown((e)=>{
    		// console.log(e.keyCode);
    		switch(e.keyCode){
    		case 87: case 38: this.arrow(up); break;
    		case 68: case 39: this.arrow(right); break;
    		case 83: case 40: this.arrow(down); break;
    		case 65: case 37: this.arrow(left); break;
    		case 81: this.resetGame(); break; //'p'
    		case 192: this.autoArrow(true); break; //'`'
    		case 80: this.clearTimer(); break; //'delete'
    		case 13: this.moveStartFun(); break; //'enter'
    		}
    	});
    }

    revoke=()=>{
    	const length = this.recordSteps.length;
    	const {types:{wall,start}} = Maps;
    	if(length){
    		if(length===1){
    			this.resetGame();
    			this.recordSteps = [];
    			this.recordStepDatas = [];
    		}else{
    			const {proportion} = Maps;
    			const allCoordinates = this.recordSteps[length-2];
    			Object.keys(allCoordinates).forEach(key=>{
    				const item = allCoordinates[key];
    				if(item.type!==wall){
    					const datas = key.split(this.a);
    					const left = datas[0]*1;
    					const top = datas[1]*1;
    					$("."+item.class).css({ left:left*proportion+"px",top:top*proportion+"px" });
    					if(item.type===start){
    						Start.coordinate = [left,top];
    					}
    				}
    			});
    			this.allCoordinates = cloneDeep(allCoordinates);
    			this.recordSteps = this.recordSteps.splice(0,length-1);
    			this.recordStepDatas =  this.recordStepDatas.splice(0,length-1);
    		}
    	}
    }

    arrow = (direction) =>{
    	const {coordinate:[x,y]} = Start;
    	const {proportion,arrows:{up,right,down,left}} = Maps;
    	const allCoordinates = cloneDeep(this.allCoordinates);

    	const upDown = direction===up||direction===down;
    	const leftRight = direction===left||direction===right;
        
    	const x1 = direction===right? x+1 : x-1;
    	const x2 = direction===right? x+2 : x-2;
        
    	const y1 = direction ===up? y-1 : y+1;
    	const y2 = direction ===up? y-2 : y+2;
        
    	const key = x+this.a+y;
    	const key1 = upDown ? x+this.a+y1 : x1+this.a+y;
    	const key2 = upDown ? x+this.a+y2 : x2+this.a+y;

    	const item = allCoordinates[key];
    	const item1 = allCoordinates[key1];
    	const item2 = allCoordinates[key2];
        
    	const moveStart = ()=>{
    		const start = cloneDeep(item);
    		this.allCoordinates[key1] = start;
    		delete this.allCoordinates[key];
    		const cssr = {};
    		if(upDown){
    			Start.coordinate = [x,y1];
    			cssr.top = y1*proportion+"px";
    		}
    		if(leftRight){
    			Start.coordinate = [x1,y];
    			cssr.left = x1*proportion+"px";
    		}
    		$("."+start.class).css(cssr);
    	};
    	const moveBox = ()=>{
    		const box = cloneDeep(item1);
    		this.allCoordinates[key2] = box;
    		const cssr = {};
    		if(upDown){
    			cssr.top = y2*proportion+"px";
    		}
    		if(leftRight){
    			cssr.left = x2*proportion+"px";
    		}
    		$("."+box.class).css(cssr);
    	};
        
    	if(item1&&(item1.type===Maps.types.box)&&((!item2))){
    		moveStart();
    		moveBox();
    	}
    	if(!item1){
    		moveStart();
    	}
        
    	this.recordSteps.push(cloneDeep(this.allCoordinates));
    	const step = direction === up?0:direction === right?1:direction === down?2:3;
    	this.recordStepDatas.push(step);
    	this.checkRule();
    }

    checkRule=()=>{
    	let isStop = false;
    	isStop = this.checkEnd();
    	const timer = this.timer;
    	const length = this.recordStepDatas.length;
    	if(isStop){
    		const time = (new Date()).getTime() - this.dateTime;
    		console.log("成功了","用时"+time/1000+"秒",length+"步");
    		this.clearTimer();
    		this.arrangeDatas(timer);
    		return;
    	}
    	isStop = this.ckeckDeadAngles();
    	if(isStop){
    		this.clearTimer();
    		this.revoke();
    		if(timer) this.autoArrow();
    		return;
    	}
    	isStop = this.boxEndWelt();
    	if(isStop){
    		this.clearTimer();
    		this.revoke();
    		if(timer) this.autoArrow();
    		return;
    	}
    	if(this.count&&length>this.count){
    		this.clearTimer();
    		if(timer){
    			this.resetGame();
    			this.autoArrow(true);
    		}
    	}
    }

    arrangeDatas=async(timer)=>{
    	const length = this.recordStepDatas.length;
    	if((!this.count)||(length<this.count)){
    		const res = await ajaxFun("post","/game/sokoban/post",{
    			type:"setCount",
    			count:length,
    			mapName:encodeURIComponent(mapName),
    			recordStepDatas:JSON.stringify(this.recordStepDatas),
    			config:JSON.stringify(config),
    		});
    		this.count = res.datas.count*1;
    	}
    	if(length<25||this.count<25){
    		return;
    	}
    	if(timer){
    		this.resetGame();
    		this.autoArrow(true);
    	}
    }

    boxEndWelt=()=>{
    	let isStop = false;
    	const allCoordinates = cloneDeep(this.allCoordinates);
    	const datas = {};
    	Object.keys(allCoordinates).forEach(k=>{
    		const item = allCoordinates[k];
    		if(item.type===Maps.types.box){
    			datas[k] = cloneDeep(item);
    		}
    	});
    	const nums = this.checkEndWelt(datas);
    	if(
    		(nums.up>this.endWelt.up)||
            (nums.right>this.endWelt.right)||
            (nums.down>this.endWelt.down)||
            (nums.left>this.endWelt.left)
    	){
    		isStop = true;
    	}
    	return isStop;
    }

    checkEnd=()=>{
    	let isStop = true;
    	const allCoordinates = cloneDeep(this.allCoordinates);
    	Object.keys(this.endCoordinates).forEach(k=>{
    		const item = allCoordinates[k];
    		if(!item||(item&&item.type!==Maps.types.box)){
    			isStop = false;
    		}
    	});
    	return isStop;
    }

    ckeckDeadAngles=()=>{
    	let isStop = false;
    	const allCoordinates = cloneDeep(this.allCoordinates);
    	this.deadAngles.forEach(key=>{
    		const item = allCoordinates[key];
    		if(item&&item.type===Maps.types.box&&!this.endCoordinates[key]){
    			isStop = true;
    		}
    	});
    	return isStop;
    }

    autoArrow = (isTime)=>{
    	if(isTime)this.dateTime = (new Date()).getTime();
    	this.timer = setInterval(this.moveStartFun,Maps.time);
    }

    initDeadAngle=()=>{
    	const {width,height} = Maps;
    	const allCoordinates = cloneDeep(this.allCoordinates);
    	for(var x=0;x<width;x++){
    		for(var y=0;y<height;y++){
    			const key = x+this.a+y;
    			const item = allCoordinates[key];
    			if((!item)||(item&&item.type!==Maps.types.wall)){
    				const keys = [
    					x-1+this.a+y,
    					x+this.a+(y+1),
    					x+1+this.a+y,
    					x+this.a+(y-1),
    				];
    				const directions = [];
    				keys.forEach((k,index)=>{
    					const item1 = allCoordinates[k];
    					if(item1&&item1.type===Maps.types.wall){
    						directions.push(index);
    					}
    				});
    				const length = directions.length;
    				if(length===2){
    					const d = directions[0]-directions[1];
    					if(d===1||d===-1||d===3||d===-3){
    						this.deadAngles.push(key);
    					}
    				}
    				if(length===3){
    					this.deadAngles.push(key);
    				}
    			}
    		}
    	}
        
    	this.endWelt = this.checkEndWelt(this.endCoordinates);
    }

    checkEndWelt=(datas)=>{
    	let nums = {
    		up:0,
    		right:0,
    		down:0,
    		left:0
    	};
    	const allCoordinates = cloneDeep(this.allCoordinates);
    	Object.keys(datas).forEach(key=>{
    		const xy = key.split(this.a);
    		const x = xy[0]*1;
    		const y = xy[1]*1;
    		const key4 = (x-1)+this.a+y;
    		const key3 = x+this.a+(y+1);
    		const key2 = (x+1)+this.a+y;
    		const key1 = x+this.a+(y-1);
    		const item1 = allCoordinates[key1];
    		const item2 = allCoordinates[key2];
    		const item3 = allCoordinates[key3];
    		const item4 = allCoordinates[key4];
    		const wall = Maps.types.wall;
    		const iswall1 = item1&&item1.type===wall;
    		const iswall2 = item2&&item2.type===wall;
    		const iswall3 = item3&&item3.type===wall;
    		const iswall4 = item4&&item4.type===wall;
    		if(iswall1){ nums.up++; }else 
    		if(iswall2){ nums.right++; }else 
    		if(iswall3){ nums.down++; }else 
    		if(iswall4){ nums.left++; }
    	});
    	return nums;
    }

    moveStartFun=()=>{
    	const {coordinate:[x,y]} = Start;
    	const {arrows:{up,right,down,left}} = Maps;
    	const keys = [
    		x+this.a+(y-1),
    		x+1+this.a+y,
    		x+this.a+(y+1),
    		x-1+this.a+y,
    	];
    	const directions = [];
    	const directions1 = [];
    	keys.forEach((key,index)=>{
    		const item = this.allCoordinates[key];
    		if((!item)||(item&&item.type!==Maps.types.wall)){
    			directions.push(index);
    			directions1.push(key);
    		}
    	});
    	const k = (Math.random()+"")[3];
    	const direction = directions[(k*1)%directions.length];
    	if(direction===0){
    		this.arrow(up);
    	}else if(direction===1){
    		this.arrow(right);
    	}else if(direction===2){
    		this.arrow(down);
    	}else if(direction===3){
    		this.arrow(left);
    	} 
    }

    clearTimer=()=>{
    	if(this.timer)clearInterval(this.timer);
    }

    resetGame=()=>{
    	const {proportion} = Maps;
    	const allCoordinates = {};
    	this.recordSteps = [];
    	this.recordStepDatas = [];
    	const cAllCoordinates = cloneDeep(this.allCoordinates);
    	Object.keys(cAllCoordinates).forEach(key=>{
    		const item = cAllCoordinates[key];
    		if(item.type===Maps.types.wall){
    			allCoordinates[key] = item;
    		}else{
    			const datas = item.class.split(this.a);
    			const left = datas[0]*1;
    			const top = datas[1]*1;
    			$("."+item.class).css({ left:left*proportion+"px",top:top*proportion+"px" });
    			delete cAllCoordinates[key];
    			const nk = left+this.a+top;
    			allCoordinates[nk] = item;
    			if(item.type===Maps.types.start){
    				Start.coordinate = [left,top];
    			}
    		}
    	});
    	this.allCoordinates = cloneDeep(allCoordinates);
    }
}