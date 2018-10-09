
import config from "./config";
import cloneDeep from "lodash/cloneDeep";
import mapValues from "lodash/mapValues";
import {ajaxFun} from "../../../Request";
const md5 = require("blueimp-md5");
const {Maps,ImgConfig,Start,Ends} = config

export default class Maze {
	constructor(props){
		this.canvas = props.canvas;
		this.converter = props.converter;
		this.initStartEnd = props.initStartEnd
		this.a = "_";
		this.allCoordinates = {
			wall:{},
			route:[]
		};
		this.ctx = null;
		this.paths = [];
		this.mapName = null;
		this.configMd5 = null
	}

    init=()=>{
    	const {widthPx,heightPx} = Maps;
    	const {company} = ImgConfig;
    	this.canvas.width = widthPx;
    	this.canvas.height = heightPx;
    	this.ctx = this.canvas.getContext("2d");
    	var img = new Image();
    	img.onload = ()=>{
    		this.ctx.drawImage(img, 0, 0, widthPx,  heightPx);
    		const datas = this.initDrawImage(company);
    		const ctxc = this.initConverter(datas,company,this.converter);
			this.initStartEnds();
			this.mapName = md5(JSON.stringify(this.allCoordinates));
			this.configMd5 = md5(JSON.stringify(config));
			// this.ctx.beginPath();
			// this.ctx.fillStyle = Maps.pathColor;
			// this.ctx.fillRect(10*company,22*company, company, company);
			// this.ctx.fill();
			// this.ctx.closePath();
    		if(Start.coordinate&&Start.coordinate.length&&Ends.coordinate&&Ends.coordinate.length){
				this.findInflectionPoint(company)
    		}else{
				console.log('没有找到起点终点')
				this.noFindInflectionPoint()
			}
    	};
    	img.src =Maps.img;
	}

	noFindInflectionPoint=()=>{
		this.initStartEnd(1)
	}

	enterPosition=(x,y)=>{
    	const {company} = ImgConfig;
		this.ctx.beginPath();
		this.ctx.fillStyle = Start.color;
		this.ctx.fillRect( x*company,y*company, company*2, company*2);
		this.ctx.fill();
		this.ctx.closePath();
		Start.coordinate = [x,y]
		this.initStartEnd(2)
	}
	endPosition=(x,y)=>{
    	const {company} = ImgConfig;
		this.ctx.beginPath();
		this.ctx.fillStyle = Ends.color;
		this.ctx.fillRect( x*company,y*company, company*2, company*2);
		this.ctx.fill();
		this.ctx.closePath();
		Ends.coordinate = [x,y]
		this.initStartEnd()
		this.findInflectionPoint(company)
	}
	
	findInflectionPoint(company){
		const walls = this.allCoordinates.wall
		let coor = [...Start.coordinate]
		while(!walls[coor.join(this.a)]){
			coor = [coor[0],coor[1]+1];
		}
		let endcoor = [...Ends.coordinate]
		while(!walls[endcoor.join(this.a)]){
			endcoor = [endcoor[0],endcoor[1]+1];
		}
		endcoor = [endcoor[0],endcoor[1]-1]
		const {arrows} = Maps;
		let nextPoint = this.nextPoint({
			coordinate:[coor[0],coor[1]-1],nextArrow:arrows.down
		})
		const nextPoints = [nextPoint]
		let num = 0 
		const maxNum = Maps.widthPx*Maps.heightPx
		while((nextPoint.coordinate[0]!==endcoor[0]||nextPoint.coordinate[1]!==endcoor[1])&&num<maxNum){
			num ++
			nextPoint = this.nextPoint(nextPoint)
			nextPoints.push(nextPoint)
		}
		if((nextPoint.coordinate[0]===endcoor[0]&&nextPoint.coordinate[1]===endcoor[1])){
			console.log('成功了',nextPoints)
			const paths = this.getPaths(nextPoints)
			let len = 0
			const timer = setInterval(()=>{
				const path = paths[len]
				const point = nextPoints[len]
				if(point){
					this.ctx.beginPath();
					this.ctx.fillStyle = Maps.pathColor;
					this.ctx.fillRect( point.coordinate[0]*company,point.coordinate[1]*company, company, company);
					this.ctx.fill();
					this.ctx.closePath();
				}
				if(path){
					this.ctx.beginPath();
					this.ctx.fillStyle = "#2900ff";
					this.ctx.fillRect( path[0]*company-1,path[1]*company-1, company, company);
					this.ctx.fill();
					this.ctx.closePath();
				}
				if(point||path){
					len+=1
				}else{
					clearInterval(timer)
				}
			},1)
			// this.postMap(nextPoints)
		}
	}
	getPaths=(nextPoints)=>{
		const {arrows} = Maps;
		const walls = this.allCoordinates.wall
		const points = cloneDeep(nextPoints)
		let paths = []
		let index = 0
		let point = cloneDeep(points[index])
		let l = 0
		const func = (pt,ist)=>{
			const coor = ist ? [pt.coordinate[0]+1,pt.coordinate[1]] : [pt.coordinate[0],pt.coordinate[1]-1]
			const points2 = []
			let i = 0
			while(!walls[coor.join(this.a)]&&!points.some((a)=>(JSON.stringify(a.coordinate)===JSON.stringify(coor)))&&i<Maps.heightPx){
				i++
				points2.push(coor)
				if(ist){
					coor[0]+=1
				}else{
					coor[1]-=1
				}
			}
			const len = points.findIndex((a)=>(JSON.stringify(a.coordinate)===JSON.stringify(coor)))
			if(len>0){
				paths = [...paths,...points2]
			}
			return len
		}
		while(point&&l<points.length){
			l+=1
			index+=1
			paths.push(point.coordinate)
			if(point.nextArrow === arrows.down){
				const len = func(point,true)
				point = cloneDeep(points[len>0?len:index])
			}else if(point.nextArrow === arrows.right){
				const len = func(point,false)
				point = cloneDeep(points[len>0?len:index])
			}else{
				point = cloneDeep(points[index])
			}
		}
		console.log(paths)
		return paths
	}
	postMap=async(paths)=>{
		const res =await ajaxFun("post","/game/maze/post",{
			mapName:encodeURIComponent(this.mapName),
			paths:JSON.stringify(paths),
			configMd5 :encodeURIComponent(this.configMd5),
			config:JSON.stringify(config),
		});
		console.log(res)
	}
	nextPoint({coordinate:[x,y],nextArrow:arrow}){
		const {arrows} = Maps;
		const walls = this.allCoordinates.wall
		let coordinate = [x,y]
		let nextArrow
		if(arrow === arrows.up){
			if(walls[[x,y-1].join(this.a)]){
				nextArrow = arrows.left
			}else {
				coordinate = [x,y-1]
				nextArrow = walls[[x+1,y-1].join(this.a)] ? arrow : arrows.right
			}
		}
		if(arrow === arrows.right){
			if(walls[[x+1,y].join(this.a)]){
				nextArrow = arrows.up
			}else {
				coordinate = [x+1,y]
				nextArrow = walls[[x+1,y+1].join(this.a)] ? arrow : arrows.down
			}
		}
		if(arrow === arrows.down){
			if(walls[[x,y+1].join(this.a)]){
				nextArrow = arrows.right
			}else {
				coordinate = [x,y+1]
				nextArrow = walls[[x-1,y+1].join(this.a)] ? arrow : arrows.left
			}
		}
		if(arrow === arrows.left){
			if(walls[[x-1,y].join(this.a)]){
				nextArrow = arrows.down
			}else {
				coordinate = [x-1,y]
				nextArrow = walls[[x-1,y-1].join(this.a)] ? arrow : arrows.up
			}
		}
		return {
			coordinate,
			nextArrow,
		}
	}
	
	initStartEnds=()=>{
		const {widthPx,heightPx,range} = Maps;
		const borderCoors = {
			up:[],
			right:[],
			down:[],
			left:[]
		};
		const wallCoordinates = cloneDeep(this.allCoordinates.wall);
		mapValues(wallCoordinates,(cool,key)=>{
			let keys = key.split(this.a);
			keys = [keys[0]*1,keys[1]*1];
			if(keys[0] === 0){
				borderCoors.left.push(keys);
			}
			if(keys[1] === 0) {
				borderCoors.up.push(keys);
			}
			if(keys[0] === widthPx-1) {
				borderCoors.right.push(keys);
			}
			if(keys[1] === heightPx-1) {
				borderCoors.down.push(keys);
			}
		});

		const func = (items,n)=>{
			const startCools = [];
			let coordinate;
			items.forEach((upa,index)=>{
				const upb = items[index+1];
				if(upb){
					const len = upb[n] - upa[n];
					if(len >= range){
						const its = n ? [upa[0],upa[1]+(len-(len%2))/2] : [upa[0]+(len-(len%2))/2, upa[1]];
						startCools.push(its);
					}
				}
			});
			startCools.forEach((sct)=>{
				const coords = [];
				for(let i = 0;i<range/2;i++){
					const its = n ? [sct[0],sct[1]-i] : [sct[0]-i,sct[1]];
					coords.push(its);
					if(i>0){
						const itsa = n ? [sct[0],sct[1]+i] : [sct[0]+i,sct[1]];
						coords.push(itsa);
					}
				}
				let isCoores = true;
				coords.forEach(c=>{
					for(let i = 0;i<range;i++){
						const its = n ? [c[0]+i,c[1]] : [c[0],c[1]+i];
						if(wallCoordinates[its.join(this.a)]){
							isCoores = false;
						}
					}
				});
				if(isCoores){
					coordinate = cloneDeep(sct);
				}
			});
			return coordinate;
		};
		const l1 = borderCoors.up.length<=widthPx-Maps.range+1
		const l2 = borderCoors.left.length<=heightPx-Maps.range+1
		const l3 = borderCoors.right.length<=heightPx-Maps.range+1
		const l4 = borderCoors.down.length<=widthPx-Maps.range+1
		if((l1===true&&l2===true)||(l3===true&&l4===true)){
			console.log('需要裁剪地图')
		}
		if(l1){
			Start.coordinate = func(borderCoors.up,0);
		}else if(l2){
			Start.coordinate = func(borderCoors.left,1);
		}
		if(l3){
			Ends.coordinate = func(borderCoors.right,1);
		}else if(l4){
			Ends.coordinate = func(borderCoors.down,0);
		}
	}

    initDrawImage=(company)=>{
    	const {widthPx,heightPx} = Maps;
    	const datas = [];
    	for(var x = 0;x<widthPx/company;x++){
    		for(var y = 0;y<heightPx/company;y++){
    			var cq = this.ctx.getImageData(x*company, y*company, company, company).data;
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
    			datas.push({
    				data:cqs,
    				coordinate:[x*company, y*company]
    			});
    		}
    	}
    	return datas;
    }

    initConverter=(datas,company,converter)=>{
    	const {widthPx,heightPx,rgbas,rgbasDefault,appointRgba} = Maps;
    	converter.width = widthPx;
    	converter.height = heightPx;
    	const ctxc = converter.getContext("2d");
    	const items = [];
    	datas.forEach((dta,index)=>{
    		const da = dta.data;
    		let color = rgbasDefault ;
    		da.forEach(db=>{
    			let rg ;
    			if(rgbas){
    				rg = rgbas.find((rgba,i)=>{
    					const rgbb = rgbas[i-1];
    					const tj = db[0]<=rgba.rgb[0]&&db[1]<=rgba.rgb[1]&&db[2]<=rgba.rgb[2];
    					if(rgbb){
    						return tj&&db[0]>rgbb.rgb[0]&&db[1]>rgbb.rgb[1]&&db[2]>rgbb.rgb[2];
    					}
    					return tj;
    				});
    			}
    			if(rg){
    				this.allCoordinates[rg.type][dta.coordinate.join(this.a)]={
    					coordinate: dta.coordinate
    				};
    				color = rg.color;
    			}else{
    				this.allCoordinates.route.push(dta.coordinate)
				}
    			let col;
    			if(appointRgba){
    				col = appointRgba.find(r=>db[0]===r.rgb[0]&&db[1]===r.rgb[1]&&db[2]===r.rgb[2]);
    				if(col){
    					this.allCoordinates[col.type][dta.coordinate.join(this.a)]={
    						coordinate: dta.coordinate
    					};
    					color = col.color;
    				}
    			}
    		});
    		items.push(color);
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