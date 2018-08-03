import React from "react";
import {href,ajaxFun} from "../../Request";
import TextArea from "../../../node_modules/antd/lib/input/TextArea";
import $ from "jquery";


class NewsView extends React.PureComponent {
	constructor(props){
		super(props);
		this.username = "";
	}
    state={
    	information:[
    		{name:"2",content:"222"},
    		{name:"1",content:"111"},
    	],
    	content:""
    }
    async UNSAFE_componentWillMount () {
    	this.username =this.props.match.params.name;
    	this.getInformation();
    }

    componentDidMount=()=>{
    	// console.log($("#content").scrollTop());
    	$("#content").scrollTop( $("#content")[0].scrollHeight );
    }

    getInformation=async()=>{
    	const res = await ajaxFun("post","/chat/getnews",{
    		username:this.username,
    		token:this.props.match.params.token
    	});
    	console.log(res);
    }

    changeContent=(e)=>{
    	this.setState({
    		content:e.target.value
    	});
    }

    send=async()=>{
    	const res = await ajaxFun("post","/chat/sendnews",{
    		username:this.username,
    		token:this.props.match.params.token,
    		content:this.state.content,
    	});
    	this.changeContent({
    		target:{value:""}
    	});
    	console.log(res);
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
							if(data.name === this.username){
								return <p 
									style={{
										textAlign:"right",
										width:"100%"
									}}
									key = {data.name+key}
								>
									{data.content}
								</p>;
							}
							return <p style={{width:"100%"}} key = {data.name+key}>{data.name+":  "+data.content}</p>;
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
