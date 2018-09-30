
import {Maps,ImgConfig,Wall,Start,Ends} from "./config";
import cloneDeep from "lodash/cloneDeep";
import mapValues from "lodash/mapValues";

export default class Maze {
	constructor(props){
		this.canvas = props.canvas;
		this.converter = props.converter;
		this.converter2 = props.converter2;
		this.a = "_";
		this.allCoordinates = {
			wall:{},
			route:[]
		};
		this.ctxc2 = null;
		this.paths = [];
	}

    init=()=>{
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
    		// this.ctxc2 =  this.initConverter(datas2,company2,this.converter2);
    		this.initStartEnds();
    		if(Start.coordinate.length&&Ends.coordinate.length){
    			this.paths.push([{
    				coordinate:[...Start.coordinate],
    				arrows:Maps.startDirection,
    				isTrue: 1,
    			}]);
				this.findInflectionPoint()
				// this.initStartFunc(company,ctxc);
				// window.mazeStart = (isDebug)=>{
				// 	this.initStartFunc(company,ctxc,isDebug);
				// 	console.log(this.paths);
				// }
    			// console.log(this.paths);
    		}
    	};
    	img.src =require("./timg.jpg");
	}
	
	findInflectionPoint(){
		const pathDatas = this.paths[this.paths.length-1];
		const pathData = pathDatas.find((pas)=>pas.isTrue===1);
		const walls = this.allCoordinates.wall
		let coor = [...pathData.coordinate]
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
		let num = 0 
		while((nextPoint[0]!==endcoor[0]||nextPoint[1]!==endcoor[1])&&num<25000){
			num ++
			nextPoint = this.nextPoint(nextPoint)
		}
		console.log(nextPoint,endcoor)
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
				nextArrow = walls[[x-1,y-1].join(this.a)] ? arrow : arrows.right
			}
		}
		return {
			coordinate,
			nextArrow,
		}
	}

	arrowsFun=(pathData,company,ctxc,isDebug)=>{
		if(isDebug){debugger}
 		const {arrows,widthPx,heightPx,range} = Maps;
		const isUp = pathData.arrows === arrows.up;
		const isDown = pathData.arrows === arrows.down;
		const isRight = pathData.arrows === arrows.right;
		const isLeft = pathData.arrows === arrows.left;
		const startCoor = pathData.coordinate;
		const wallCoordinates = cloneDeep(this.allCoordinates.wall);
		const coors = [];
		const paths = [];
		let coor = [...startCoor];
		while(!wallCoordinates[coor.join(this.a)]){
			if(coor[0]!==startCoor[0]||coor[1]!==startCoor[1]){
				coors.push(cloneDeep(coor));
			}
			if(isUp){
				coor = [coor[0],coor[1]-1];
			}else if(isDown){
				coor = [coor[0],coor[1]+1];
			}else if(isRight){
				coor = [coor[0]+1,coor[1]];
			}else if(isLeft){
				coor = [coor[0]-1,coor[1]];
			}
		}
		const coort1s = [];
		const coort2s = [];
		const func1 = (c1,cs,ist)=>{
			let c2 = [...c1];
			const c2s = [];
			let i1 = 0;
			while(!wallCoordinates[c2.join(this.a)]&&i1<widthPx){
				let c12;
				let c3;
				if(ist === arrows.up){
					c12 = c1[1]- c2[1];
					c3 = [c2[0],c2[1]-1];
				}else if(ist === arrows.down){
					c12 = c2[1] - c1[1];
					c3 = [c2[0],c2[1]+1];
				}else if(ist === arrows.right){
					c12 = c2[0] - c1[0];
					c3 = [c2[0]+1,c2[1]];
				}else if(ist === arrows.left){
					c12 = c2[0] - c1[0];
					c3 = [c2[0]-1,c2[1]];
				}
				if(c2[0]>0&&c2[0]<widthPx&&c2[1]>0&&c2[1]<heightPx&&c12>=range/2){
					c2s.push([...c2]);
				}
				i1++;
				c2 = c3;
			}
			if(c2s.length>=range-1){
				cs.push(c1);
			}
		};
		let ist1;
		let ist2;
		if(isUp||isDown){
			ist1 = arrows.left;
			ist2 = arrows.right;
		}else{
			ist1 = arrows.up;
			ist2 = arrows.down;
		}
		coors.forEach((c1)=>{
			func1(c1,coort1s,ist1);
			func1(c1,coort2s,ist2);
		});
		const func3 = (coo1,arr) =>{
			const len1 = coo1.length;
			if(len1&&len1>=range-1){
				let k = 0;
				const cls = cloneDeep(coo1);
				const func2 = () =>{
					const lis  =cls.splice(0,k+1);
					const lislen = lis.length;
					let contsa;
					if(isUp||isDown){
						contsa = lislen === lis[0][1]+1-lis[lis.length-1][1];
					}else if(isRight||isLeft){
						contsa = lislen === lis[lis.length-1][0]-lis[0][0]+1;
					}
					const cods = lis[(lislen-(lislen%2))/2]
					const randas = Math.pow(cods[0] - startCoor[0],2)+Math.pow(cods[1] - startCoor[1],2)>Math.pow(range/2,2)
					if(lislen&&contsa&&randas){
						paths.push({
							coordinate: cods,
							arrows:arr,
							isTrue: 1,
						});
					}
				};
				coo1.forEach((stc,int)=>{
					const stc1 = coo1[int+1];
					if(stc1){
						let contsb;
						if(isUp){
							contsb = stc[1] === stc1[1]+1;
						}else if(isDown){
							contsb = stc[1]+1 === stc1[1];
						}else if(isRight){
							contsb = stc[0]+1 === stc1[0];
						}else if(isLeft){
							contsb = stc[0] === stc1[0]+1;
						}
						if(contsb){ k++; }else{ func2();k = 0; }
					}else{
						func2();
					}
				});
			}
		};
		func3(coort1s,ist1);
		func3(coort2s,ist2);
		pathData.isTrue = 0;
		if(paths.length){
			pathData.isTrue = 2;
			paths.forEach((path)=>{
				const coordinate = path.coordinate;
				ctxc.beginPath();
				ctxc.fillStyle = "blue";
				ctxc.fillRect( coordinate[0]*company,coordinate[1]*company, company, company);
				ctxc.fill();
				ctxc.closePath();
			});
			this.paths.push(paths);
		}else{
			const pats = this.paths.pop()
			if(pats.some((a)=>{return a.isTrue ===1})){
				this.paths.push(pats);
			}
		}
	}
	
	initStartFunc=(company,ctxc,isDebug)=>{
		if(!this.paths.length) return;
		const pathDatas = this.paths[this.paths.length-1];
		const pathData = pathDatas.find((pas)=>pas.isTrue===1);
		if(pathData){
			this.arrowsFun(pathData,company,ctxc,isDebug);
		}else{
			if(this.paths.length){
				this.paths = this.paths.splice(0,this.paths.length-1);
				this.initStartFunc();
			}
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
		if(borderCoors.up.length<=widthPx-11){
			Start.coordinate = func(borderCoors.up,0);
		}else if(borderCoors.left.length<=heightPx-11){
			Start.coordinate = func(borderCoors.left,1);
		}
		if(borderCoors.right.length<=heightPx-11){
			Ends.coordinate = func(borderCoors.right,1);
		}else if(borderCoors.down.length<=widthPx-11){
			Ends.coordinate = func(borderCoors.down,0);
		}
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
	
	// initMapto=(ctxc,company)=>{
	// 	//加粗黑色部分
	// 	const allCoor = this.allCoordinates.wall;
	// 	mapValues(allCoor,(cor)=>{
	// 		const [x1,y1] = cor.coordinate;
	// 		const c1 = [x1+1,y1];
	// 		const c2 = [x1,y1+1];
	// 		const k1 = c1.join(this.a);
	// 		const k2 = c2.join(this.a);
	// 		if(!allCoor[k1]){
	// 			ctxc.beginPath();
	// 			ctxc.fillStyle = Wall.color;
	// 			ctxc.fillRect( c1[0]*company,c1[1]*company, company, company);
	// 			ctxc.fill();
	// 			ctxc.closePath();
	// 			this.allCoordinates.wall[k1] = {
	// 				coordinate:c1
	// 			};
	// 		}
	// 		if(!allCoor[k2]){
	// 			ctxc.beginPath();
	// 			ctxc.fillStyle = Wall.color;
	// 			ctxc.fillRect( c2[0]*company,c2[1]*company, company, company);
	// 			ctxc.fill();
	// 			ctxc.closePath();
	// 			this.allCoordinates.wall[k2] = {
	// 				coordinate:c2
	// 			};
	// 		}
	// 	});
	// }
}