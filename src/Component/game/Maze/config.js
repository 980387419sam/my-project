
const mwidth = 30;
const mheight = 30;
const mproportion = 10;

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
	rgbas:[
		{
			rgb:[150,150,150],
			color:"rgb(0,0,0)"
		},
		{
			rgb:[170,170,170],
			color:"rgb(100,100,100)"
		},
		{
			rgb:[180,180,180],
			color:"rgb(200,200,200)"
		}
	],
	rgbasDefault:"rgb(255,255,255)",
	types: {
		wall:"wall",
		path:"path",
		start:"start",
		end:"end"
	},
	arrows: {
		up:"up",
		right:"right",
		down:"down",
		left:"left",
	},
	time:1
};

export const Wall = {
	capping:{
		top:true,
		right:true,
		bottom:true,
		left:true,
	},
	coordinates:[]
};

export const Box = {
	coordinates:[
		[3,3],[2,2]
	]
};

export const Start = {
	coordinate:[1,1]
};

export const Ends = {
	coordinates:[
		[4,4],[5,5]
	]
};

export default {
	Maps,Wall,Box,Start,Ends
};