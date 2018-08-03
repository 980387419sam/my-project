import React from "react";
import {href,ajaxFun} from "../../Request";

export default class username extends React.PureComponent {
	constructor(props){
		super(props);
		this.userName = "";
		this.passWord = "";
	}
	state={
		mes:""
	}
	async UNSAFE_componentWillMount () {
	}

	changeUserName=(e)=>{
		this.userName = e.target.value;
	}
    
    changePassWord=(e)=>{
    	this.passWord = e.target.value;
    }

	submitUserName=async()=>{
		const res = await ajaxFun("get","/chat/login",{
			username:this.userName,
			passWord:this.passWord
		});
		if(res.state){
			this.setState({
				mes:res.mes
			});
		}else{
			window.location.href = href+"/chat/view/"+this.userName+"/"+res.token;
		}
	}

	render=()=> {
		return (
			<div>
				用户名<input onChange={this.changeUserName}/>
				<br/>
				密码<input onChange={this.changePassWord}/>
				<br/>
				<button onClick={this.submitUserName}>确认</button>
				<p>{this.state.mes}</p>
			</div>
		);
    
	}
}
