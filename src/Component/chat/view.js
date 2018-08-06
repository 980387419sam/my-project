import React from "react";
import {href,ajaxFun} from "../../Request";
import {notification} from "antd";
import cloneDeep from "lodash/cloneDeep";
import TextArea from "../../../node_modules/antd/lib/input/TextArea";
import $ from "jquery";


class NewsView extends React.PureComponent {
	constructor(props){
		super(props);
		this.username = "";
	}
    state={
    	information:[],
    	content:""
    }
    async UNSAFE_componentWillMount () {
    	this.username =this.props.match.params.name;
    	this.getInformation();
    }

    componentDidMount=()=>{
    	$("#content").scrollTop( $("#content")[0].scrollHeight );
    }

    getInformation=async()=>{
    	const date = new Date();
    	const res = await ajaxFun("post","/chat/getnews",{
    		username:this.username,
    		token:this.props.match.params.token,
    		date:date.getTime()
    	});
    	if(!res.state){
    		this.getInformation();
    		if(res.information.length){
    			const information = cloneDeep(this.state.information);
    			res.information.forEach(infor=>{
    				information.push({
    					username:infor.username,
    					content:infor.content,
    					time:infor.time,
    				});
    			});
    			this.setState({
    				information:information,
    			});
    		}
    	}else if(res.state === 2){
    		window.location.href = href+"/chat/login";
    	}else{
    		notification.error({message:res.mes});
    	}
    }

    changeContent=(e)=>{
    	this.setState({
    		content:e.target.value
    	});
    }

    send=async()=>{
    	const date = new Date();
    	const time = date.getTime();
    	const content = this.state.content;
    	const res = await ajaxFun("post","/chat/sendnews",{
    		username:this.username,
    		token:this.props.match.params.token,
    		content:content,
    		date:time
    	});
    	this.changeContent({
    		target:{value:""}
    	});
    	if(res.state){
    		notification.error({message:res.mes});
    	}
    }

	render=()=> {
		return (
			<div>
				<div
					id="content"
					style={{
						width:"300px",
						height:"300px",
						border:"1px solid #000",
						overflowY:"scroll",
						paddingRight:"10px"
					}}>
					{
						this.state.information.map((data,key)=>{
							if(data.username === this.username){
								return <p 
									style={{
										textAlign:"right",
										width:"100%"
									}}
									key = {data.username+key}
								>
									{data.content}
								</p>;
							}
							return <p style={{width:"100%"}} key = {data.username+key}>{data.username+":  "+data.content}</p>;
						})
					}
				</div>
				<div>
					<textarea 
						onChange={this.changeContent} 
						value={this.state.content}
					/>
					<button onClick={this.send}>ok</button>
				</div>
			</div>
		);
    
	}
}

export default  NewsView;
