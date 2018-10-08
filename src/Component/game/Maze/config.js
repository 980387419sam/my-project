
const mwidth = 30;
const mheight = 30;
const mproportion = 10;
const arrows = {
	up:"up",
	right:"right",
	down:"down",
	left:"left",
};
const types = {
	wall:"wall",
	path:"path",
	start:"start",
	end:"end"
};

export const ImgConfig = {
	company:1,
	company2:5,
};

export const Maps = {
	img:require('./timg.jpg'),
	pathColor:'red',
	width:mwidth,
	height:mheight,
	proportion:mproportion,
	widthPx :mwidth*mproportion,
	heightPx:mheight*mproportion,
	range:11,
	startDirection : arrows.right,
	rgbas:[
		{
			rgb:[170,170,170],
			color:"rgb(0,0,0)",
			type:types.wall
		},
	],
	rgbasDefault:"rgb(255,255,255)",
	appointRgba:[ ],
	types: types,
	arrows: arrows,
	time:1
};

export const Start = {
	coordinate:[],
	color:'#25ff00'
};

export const Ends = {
	coordinate:[],
	color:'#8c80e6'
};

export default {
	Maps,Start,Ends,ImgConfig
};