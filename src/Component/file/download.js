import React from "react";
import {ajaxFun} from "../../Request";

export default class downloadComponent extends React.PureComponent {
	async UNSAFE_componentWillMount() {
	}
	render(){
		return (
			<div >
				<a href="http://localhost:3344/http/download?filename=123.txt" download>下载</a>
			</div>
		);
	}
}
