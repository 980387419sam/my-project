import $ from "jquery";

const errorType = require("../errorConfig");

export const url = "http://localhost:3344";
export const href = "http://localhost:3000";

const ajaxGetFun = (urls, data, resolve) => {
	$.get(urls, data, (res) => {
		const datas = JSON.parse(res);
		if (datas.error_code === "10001") {
			window.location.href = `${href}/login`;
			resolve("");
		} else {
			console.log("get", datas);
			resolve(datas);
		}
	});
};

const ajaxPostFun = (urls, data, resolve)=>{
	$.post(urls,data,(res, textStatus, jqXHR)=>{
		const datas = JSON.parse(res);
		if (datas.error_code === "10001") {
			window.location.href = `${href}/login`;
			resolve("");
		} else {
			resolve(datas);
		}
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
			const datas = JSON.parse(res);
			resolve(datas);
		}
	});
};

const ajaxDownloadFun = (urls, data, resolve) => {
	$.get(urls, data, (res) => {
		console.log(res);
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

export const getDefaultData = async data => await ajaxFun("get", "", data);
export const getRequest = async data => await ajaxFun("get", "/http/get", data);
export const postRequest = async data => await ajaxFun("post", "/http/post", data);
