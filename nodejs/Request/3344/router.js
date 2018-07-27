const { getReptileData } = require("./component/reptile");
const { getTranslate } = require("./component/baiduTranslate");
const {postWeixinData} =  require("./component/weixin");

const errorType = require("../../../src/errorConfig");

const defaultData = (data) => {
	const datas = {
		error_code: "10000",
		error_message: errorType["10000"],
	};
	return JSON.stringify(datas);
};

const reptileData = async (data) => await getReptileData(data);

const translate = async (data) => await getTranslate(data);

const weixinData =  async (data) => await postWeixinData(data);

module.exports = {
	type:{
		"defaultData":"get",
		"/reptile":"get",
		"/translate":"post",
		"/posttest":"post",
		"/weixin":"post"
	},
	callback:{
		"defaultData":defaultData,
		"/reptile":reptileData,
		"/translate":translate,
		"/posttest":(data)=>{return JSON.stringify(data);},
		"/weixin":weixinData
	}
};
