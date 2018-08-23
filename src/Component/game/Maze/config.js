
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
	width:mwidth,
	height:mheight,
	proportion:mproportion,
	widthPx :mwidth*mproportion,
	heightPx:mheight*mproportion,
	range:10,
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

export const Wall = {
	color:"rgb(0,0,0)"
};

export const Start = {
	coordinate:[],
	color:"rgba(111,222,333,1)",
};

export const Ends = {
	coordinate:[]
};

export default {
	Maps,Wall,Start,Ends
};