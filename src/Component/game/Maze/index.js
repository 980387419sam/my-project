import React from "react";
import Maze from "./maze";
import {Maps} from "./config";

export default class MazeComponent extends React.PureComponent {
	state={
		enterPosition:false,
		endPosition:false
	}
	async UNSAFE_componentWillMount() {
	}
    
    componentDidMount=() => {
    	this.maze = new Maze({
    		canvas:this.canvas,
			converter:this.converter,
			initStartEnd:this.initStartEnd,
    	});
    	this.maze.init();
	}
	initStartEnd=(inp)=>{
		if(inp===1){
			this.setState({
				enterPosition:true,
				endPosition:false
			})
		}else if(inp===2){
			this.setState({
				enterPosition:false,
				endPosition:true
			})
		}else{
			this.setState({
				enterPosition:false,
				endPosition:false
			})
		}
	}
	onMouseDown=(e)=>{
		if(this.state.enterPosition){
			this.maze.enterPosition(e.clientX ,e.clientY)
		}
		if(this.state.endPosition){
			this.maze.endPosition(e.clientX ,e.clientY)
		}
	}
    render(){
    	return <div>
    		<canvas
    			style={{
    				width: Maps.widthPx+"px",
    				height: Maps.heightPx+"px",
    			}}
				ref={(r) => { this.canvas = r; }}
				onMouseDown={this.onMouseDown}
    		/>
    		<canvas
    			style={{
    				width: Maps.widthPx+"px",
    				height: Maps.heightPx+"px",
    				display:"none"
    			}}
    			ref={(r) => { this.converter = r; }}
    		/>
			<div style={{color:'red'}}>
				{this.state.enterPosition&& <span>请点击入口位置</span> }
				{this.state.endPosition&& <span>请点击出口位置</span> }
			</div>
    	</div>;
    }
}
