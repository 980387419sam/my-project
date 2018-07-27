import React from "react";

export default class defaultComponent extends React.PureComponent {
	UNSAFE_componentWillMount() {}
	render(){
		return <div >默认页面</div>;
	}
}
