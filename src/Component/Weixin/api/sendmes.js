
import {postWeixin } from "../../../Request/weixin";

const config = {
	BaseRequest : {
		"Uin":2873215915,
		"Sid":"JbhTm8DE+ITB4m0R",
		"Skey":"@crypt_a5b49f9f_e6c9e54df2317e098573c57e632c4e86",
	},
	option:{
		Content:"哈哈哈",
		ToUserName:"filehelper",
		FromUserName:"@49b9f691187023a243486250a5a543f55261db665c6785d0b41431783897ca20"
	}
};


const getDeviceID=()=> {
	return "e" + ("" + Math.random().toFixed(15)).substring(2, 17);
};

const getLocalID=()=>{
	return ((new Date()).getTime()+"").replace(/.{4}$/,(Math.random()+"").substring(2,7))*1;
};

var sendMes= async({Content,ToUserName,FromUserName},BaseRequest)=>{
	const LocalID = getLocalID();
	const post_data =JSON.stringify({
		"BaseRequest":BaseRequest,
		"Msg":{
			"Type":1,
			"Content":Content,
			"FromUserName":FromUserName,
			"ToUserName":ToUserName,
			"LocalID":LocalID,
			"ClientMsgId":LocalID
		},
		"Scene":0
	});
	const res = await postWeixin({
		path:"/cgi-bin/mmwebwx-bin/webwxsendmsg",
		data:post_data,
		headers:JSON.stringify({
			"Accept":"application/json, text/plain, */*",
			"Accept-Encoding":"gzip, deflate, br",
			"Accept-Language":"zh-CN,zh;q=0.9",
			"Connection":"keep-alive",
			"Content-Length":Buffer.byteLength(post_data),
			"Content-Type":"application/json;charset=UTF-8",
			"Cookie":"pgv_pvi=3577729024; pgv_si=s6238883840; pgv_info=ssid=s4366549823; pgv_pvid=7439103016; qm_authimgs_id=2; qm_verifyimagesession=h01ef353ef9319eaca43cbf035326954a5f0153ed84acfc8c9d0bb168a06c8aa507d34a42144716f2b3; wxuin=2873215915; wxsid=6TdD0yQj1sAXxJZN; mm_lang=zh_CN; webwx_data_ticket=gSe7voyqlk5kksVh0DGzLSD+; webwxuvid=f504adbb7be8bcefc18104add65ce6c49e8c8f9c7920f7eb06a3992483b2cf40003f59638292b94c1f920ae1f0737611; webwx_auth_ticket=CIsBEN+XsKgEGoABkkH9zUCzwIGUmtodVB7FIlS78zUtqtMIwvoOzORUJeHZk0I96Ih9jWu1/ITvzsrmuLJV0TFFf27SIA0B6okUyLTPCJ8Epy+/xlpljx7VCKGCXmQdDbVwuuPBRCMBMDqyN+AdGjE9cLuvA5fqM6t/JP49clc37/0r06GkPRaCqvk=; MM_WX_NOTIFY_STATE=1; MM_WX_SOUND_STATE=1; wxloadtime=1532676761_expired; wxpluginkey=1532667722",
			"Host":"wx2.qq.com",
			"Origin":"https://wx2.qq.com",
			"Referer":"https://wx2.qq.com/",
			"User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36",
		})
	});
};
export default async ()=>{

	const BaseRequest = {
		...config.BaseRequest,
		"DeviceID":getDeviceID()
	};
	await sendMes(config.option,BaseRequest);

};