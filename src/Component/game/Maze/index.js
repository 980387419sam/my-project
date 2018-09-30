import React from "react";
import Maze from "./maze";
import {Maps} from "./config";

export default class MazeComponent extends React.PureComponent {
	async UNSAFE_componentWillMount() {
	}
    
    componentDidMount=() => {
    	this.maze = new Maze({
    		canvas:this.canvas,
    		converter:this.converter,
    		converter2:this.converter2,
    	});
    	this.maze.init();
    }
    render(){
    	return <div>
    		<canvas
    			style={{
    				width: Maps.widthPx+"px",
    				height: Maps.heightPx+"px",
    				display:"none"
    			}}
    			ref={(r) => { this.canvas = r; }}
    		/>
    		<canvas
    			style={{
    				width: Maps.widthPx+"px",
    				height: Maps.heightPx+"px",
    			}}
    			ref={(r) => { this.converter = r; }}
    		/>
    		<canvas
    			style={{
    				width: Maps.widthPx+"px",
    				height: Maps.heightPx+"px",
    			}}
    			ref={(r) => { this.converter2 = r; }}
    		/>
    	</div>;
    }
}
