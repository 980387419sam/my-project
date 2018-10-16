import React from "react";

export default class defaultComponent extends React.PureComponent {
	async UNSAFE_componentWillMount() {
		window.location.href = '/v2/register'
	}
	render(){
		return (
			<div >
				默认页面
			</div>
		);
	}
}
