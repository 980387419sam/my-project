import React from "react";
import { getAGZAlluser,posttestFun,postTranslate } from "../../Request/reptile";

export default class reptileComponent extends React.PureComponent {
  state={
  	res:""
  }
  async UNSAFE_componentWillMount () {
  	// await this.getTest();
  	// await this.postTest();
  	// await this.getTranslate();
    
  }
  getTest=async ()=>{
  	const res = await getAGZAlluser({
  		fieldName: "./nodejs/Request/3344/reptile/File/index1.txt",
  	});
  	console.log("get", res);
  }

  postTest=async()=>{
  	const res = await posttestFun({
  		a:1,
  		b:2
  	});
  	console.log("post", res);
  }

  getTranslate=async(query)=>{
  	//在百度翻译下 查找 token= window.common.token;gtk=window.gtk;
  	const token = "730f1f3a8856be90e6f9714fbb255a4d";
  	const gtk = "320305.131321201";
  	const datas = {
  		from:"zh",
  		to:"en",
  		query:encodeURIComponent(query),
  		transtype:"translang",
  		simple_means_flag:"3",
  		token:token,
  		sign:this.getsign(query,gtk)
  	};
  	const res = await postTranslate(datas);
  	return res.trans_result.data[0].dst;
  }
  getsign =(r,gtk)=> {
  	var i=null;
    
  	function a(r){
  		if(Array.isArray(r)){
  			for(var o=0,t=Array(r.length); o<r.length;o++)t[o]=r[o];
  			return t;
  		}
  		return Array.from(r);
  	}
    
  	function n(r,o){
  		for(var t=0; t<o.length-2; t+=3){
  			var a=o.charAt(t+2);
  			a=a>="a"?a.charCodeAt(0)-87:Number(a),a="+"===o.charAt(t+1)?r>>>a:r<<a,r="+"===o.charAt(t)?r+a&4294967295:r^a;
  		}
  		return r;
  	}
  	function e(r){
  		var o=r.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g);
  		if(null===o){
  			var t=r.length;
  			t>30&&(r=""+r.substr(0,10)+r.substr(Math.floor(t/2)-5,10)+r.substr(-10,10));
  		}else{
  			for(var e=r.split(/[\uD800-\uDBFF][\uDC00-\uDFFF]/),C=0,h=e.length,f=[];h>C;C++)""!==e[C]&&f.push.apply(f,a(e[C].split(""))),C!==h-1&&f.push(o[C]);
  			var g=f.length;
  			g>30&&(r=f.slice(0,10).join("")+f.slice(Math.floor(g/2)-5,Math.floor(g/2)+5).join("")+f.slice(-10).join(""));
  		}
  		var u=void 0,l=""+String.fromCharCode(103)+String.fromCharCode(116)+String.fromCharCode(107);
  		u=null!==i?i:(i=gtk||"")||"";
  		for(var d=u.split("."),m=Number(d[0])||0,s=Number(d[1])||0,S=[],c=0,v=0;
  			v<r.length;v++){var A=r.charCodeAt(v);128>A?S[c++]=A:(2048>A?S[c++]=A>>6|192:(55296===(64512&A)&&v+1<r.length&&56320===(64512&r.charCodeAt(v+1))?(A=65536+((1023&A)<<10)+(1023&r.charCodeAt(++v)),S[c++]=A>>18|240,S[c++]=A>>12&63|128):S[c++]=A>>12|224,S[c++]=A>>6&63|128),S[c++]=63&A|128);
  		}for(var p=m,F=""+String.fromCharCode(43)+String.fromCharCode(45)+String.fromCharCode(97)+(""+String.fromCharCode(94)+String.fromCharCode(43)+String.fromCharCode(54)),D=""+String.fromCharCode(43)+String.fromCharCode(45)+String.fromCharCode(51)+(""+String.fromCharCode(94)+String.fromCharCode(43)+String.fromCharCode(98))+(""+String.fromCharCode(43)+String.fromCharCode(45)+String.fromCharCode(102)),b=0;
  			b<S.length;b++)p+=S[b],p=n(p,F);
  		return p=n(p,D),p^=s,0>p&&(p=(2147483647&p)+2147483648),p%=1e6,p.toString()+"."+(p^m);
  	}
  	return e(r);
  }
  render() {
  	return (
  		<div>
  			<input onKeyPress={async(e)=>{
  				if(e.key==="Enter"){
  					const res = await this.getTranslate(e.target.value);
  					this.setState({
            	res,
  					});
  				}
  			}}/>
  			<span>{this.state.res}</span>
  		</div>
  	);
    
  }
}
