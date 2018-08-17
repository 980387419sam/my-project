import React from "react";
import Converter from "./converter";

export default class TestComponent extends React.PureComponent {
	async UNSAFE_componentWillMount() {
	}
    
    componentDidMount=() => {
    	this.converter = new Converter({
    		images:this.images,
    		converter:this.converter,
    	});
    	this.converter.init();
    }
    render(){
    	return <div>
    		<canvas
    			style={{
    				width: "300px",
    				height: "300px",
    			}}
    			ref={(r) => { this.images = r; }}
    			onMouseDown={(e)=>{
    				this.converter.canvas0nMouseDown(e);
    			}}
    		/>
    		<canvas
    			style={{
    				width: "300px",
    				height: "300px",
    			}}
    			ref={(r) => { this.converter = r; }}
    		/>
    	</div>;
    }
}
