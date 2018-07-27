import { ajaxFun } from "./index";

export const getAGZAlluser = async data => await ajaxFun("get", "/reptile", data);
export const posttestFun  = async data => await ajaxFun("post", "/posttest", data);
export const postTranslate  = async data => await ajaxFun("post", "/translate", {
	headers:JSON.stringify({ 
		"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
		"Accept-Language": "zh-CN,zh;q=0.9",
		"Cache-Control": "max-age=0",
		"Cookie": "locale=zh; BAIDUID=7D67E1C432938DD2055BA3AFC4B4C2DA:FG=1; Hm_lvt_64ecd82404c51e03dc91cb9e8c025574=1532484481; to_lang_often=%5B%7B%22value%22%3A%22en%22%2C%22text%22%3A%22%u82F1%u8BED%22%7D%2C%7B%22value%22%3A%22zh%22%2C%22text%22%3A%22%u4E2D%u6587%22%7D%5D; REALTIME_TRANS_SWITCH=1; FANYI_WORD_SWITCH=1; HISTORY_SWITCH=1; SOUND_SPD_SWITCH=1; SOUND_PREFER_SWITCH=1; from_lang_often=%5B%7B%22value%22%3A%22zh%22%2C%22text%22%3A%22%u4E2D%u6587%22%7D%2C%7B%22value%22%3A%22en%22%2C%22text%22%3A%22%u82F1%u8BED%22%7D%5D; Hm_lpvt_64ecd82404c51e03dc91cb9e8c025574=1532660737",
		"Host": "fanyi.baidu.com",
		"Upgrade-Insecure-Requests": "1",
		"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36    ",
	}),
	path:`?from=${data.from}&to=${data.to}&query=${data.query}&transtype=${data.transtype}&simple_means_flag=${data.simple_means_flag}&token=${data.token}&sign=${data.sign}`
});
