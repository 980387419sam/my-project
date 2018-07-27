import React from "react";
import {postWeixin } from "../../Request/weixin";

export default class weixin extends React.PureComponent {
	async UNSAFE_componentWillMount () {
		await this.sendMes({
			Content:"哈哈哈",
			ToUserName:"filehelper",
			FromUserName:"@8331886266c78ef227b7e9b26fdaa8e3237d35960b649c3c8b74c3cc9cc2ab19"
		});
	}
    
    sendMes=async({Content,ToUserName,FromUserName})=>{
    	const LocalID = this.getLocalID();
    	const post_data =JSON.stringify({
    		"BaseRequest":{
    			"Uin":2873215915,
    			"Sid":"6TdD0yQj1sAXxJZN",
    			"Skey":"@crypt_a5b49f9f_1ca4e4578d40bc604286587debdf1579",
    			"DeviceID":this.getDeviceID()
    		},
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
    	// const res = await postWeixin({
    	// 	path:"/cgi-bin/mmwebwx-bin/webwxsendmsg",
    	// 	data:post_data,
    	// 	headers:JSON.stringify({
    	// 		"Accept":"application/json, text/plain, */*",
    	// 		"Accept-Encoding":"gzip, deflate, br",
    	// 		"Accept-Language":"zh-CN,zh;q=0.9",
    	// 		"Connection":"keep-alive",
    	// 		"Content-Length":Buffer.byteLength(post_data),
    	// 		"Content-Type":"application/json;charset=UTF-8",
    	// 		"Cookie":"pgv_pvi=3577729024; pgv_si=s6238883840; pgv_info=ssid=s4366549823; pgv_pvid=7439103016; qm_authimgs_id=2; qm_verifyimagesession=h01ef353ef9319eaca43cbf035326954a5f0153ed84acfc8c9d0bb168a06c8aa507d34a42144716f2b3; wxuin=2873215915; wxsid=6TdD0yQj1sAXxJZN; mm_lang=zh_CN; webwx_data_ticket=gSe7voyqlk5kksVh0DGzLSD+; webwxuvid=f504adbb7be8bcefc18104add65ce6c49e8c8f9c7920f7eb06a3992483b2cf40003f59638292b94c1f920ae1f0737611; webwx_auth_ticket=CIsBEN+XsKgEGoABkkH9zUCzwIGUmtodVB7FIlS78zUtqtMIwvoOzORUJeHZk0I96Ih9jWu1/ITvzsrmuLJV0TFFf27SIA0B6okUyLTPCJ8Epy+/xlpljx7VCKGCXmQdDbVwuuPBRCMBMDqyN+AdGjE9cLuvA5fqM6t/JP49clc37/0r06GkPRaCqvk=; MM_WX_NOTIFY_STATE=1; MM_WX_SOUND_STATE=1; wxloadtime=1532676761_expired; wxpluginkey=1532667722",
    	// 		"Host":"wx2.qq.com",
    	// 		"Origin":"https://wx2.qq.com",
    	// 		"Referer":"https://wx2.qq.com/",
    	// 		"User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36",
    	// 	})
    	// });
    }
    
    getDeviceID=()=> {
    	return "e" + ("" + Math.random().toFixed(15)).substring(2, 17);
    }

    getLocalID=()=>{
    	return ((new Date()).getTime()+"").replace(/.{4}$/,(Math.random()+"").substring(2,7))*1;
    }

    render() {
  	return (
  		<div>å“ˆ 
  		</div>
  	);
    
    }
}
