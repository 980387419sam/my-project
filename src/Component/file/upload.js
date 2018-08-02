import React from "react";
import {ajaxFun} from "../../Request";

export default class uploadComponent extends React.PureComponent {
	async UNSAFE_componentWillMount() {
	}
	uploadPic=async()=>{
		var form = document.getElementById("upload"), 
    	formData = new FormData(form); 
		const res = await ajaxFun("upload","/http/upload",formData);
		console.log(res);
	}
	render(){
		return (
			<div >
				<form id="upload" encType="multipart/form-data" method="post"> 
					<input type="file" name="file1" id="pic1"/> 
					<input type="file" name="file2" id="pic2"/> 
					<input type="button" value="提交" onClick={this.uploadPic}/> 
				</form> 
			</div>
		);
	}
}
