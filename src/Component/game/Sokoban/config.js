

export const Maps = {
	width:7,
	height:7,
	proportion:1,
	types: {
		wall:"wall",
		box:"box",
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