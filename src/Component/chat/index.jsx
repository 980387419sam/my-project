import React from "react";
import {href,ajaxFun} from "../../Request";

export default class chat extends React.PureComponent {
	constructor(props){
		super(props);
	}
	async UNSAFE_componentWillMount () {
		if(window.location.href === href+"/chat"){
			window.location.href = href+"/chat/username";
		}
	}

	render=()=> {
		return (
			<div>
			</div>
		);
    
	}
}
