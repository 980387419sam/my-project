import $ from "jquery";
import { notification} from 'antd';
const srcUrl = require("../common/urls");
const common = require("../common");
const errorType = require("../common/error");

export const url = `http://${srcUrl.href}:${common.serverPort}`;
export const href = `http://${srcUrl.href}:${srcUrl.srcPort}`;

const successFunc= (resolve,res)=>{
	const datas = JSON.parse(res);
	if(datas.state){
		notification.error({
			message:res.message
		})
	}
	resolve(datas);
}

const ajaxGetFun = (urls, data, resolve) => {
	$.get(urls, data, (res) => {
		successFunc(resolve,res)
	});
};

const ajaxPostFun = (urls, data, resolve)=>{
	$.post(urls,data,(res, textStatus, jqXHR)=>{
		successFunc(resolve,res)
	});
};

const ajaxUploadFun = (urls,data,resolve)=>{
	$.ajax({
		url: urls,
		type: "POST",
		data: data,
		cache: false,
		processData: false,
		contentType: false,
		success: function(res){
			successFunc(resolve,res)
		}
	});
};

const ajaxDownloadFun = (urls, data, resolve) => {
	$.get(urls, data, (res) => {
		successFunc(resolve,res)
	});
};

export const ajaxFun = (type, path, data) => new Promise((resolve) => {
	if (type === "get") { 
		ajaxGetFun(url + path, data, resolve); 
	} else if(type === "post"){
		ajaxPostFun(url + path, data, resolve);
	}else if(type==="upload"){
		ajaxUploadFun(url + path, data, resolve);
	}else if(type==="download"){
		ajaxDownloadFun(url + path, data, resolve);
	}else{
		resolve({ error_code: errorType["10002"] });
	}
});

