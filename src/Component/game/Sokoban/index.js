import React from "react";
import Sokoban from "./sokoban";
import {ajaxFun} from "../../../Request";

const fn = ()=>{};

export default class SokobanComponent extends React.PureComponent {
	state={
		resetGame : fn,
		autoArrow : fn,
		clearTimer : fn,
		moveStartFun : fn,
		revoke : fn,
	}
	async UNSAFE_componentWillMount() {
	}
	componentDidMount(){
		const sokoban = new Sokoban({
			id:"Sokoban",
			count:this.count
		});
		sokoban.init((sokobanProps)=>{
			this.setState({
				resetGame : sokobanProps.resetGame,
				autoArrow : sokobanProps.autoArrow, 
				clearTimer : sokobanProps.clearTimer, 
				moveStartFun : sokobanProps.moveStartFun, 
				revoke: sokobanProps.revoke, 
			});
		});
	}

	render(){
		return <div>
			<div id="Sokoban"></div>
			<div>
				<button onClick={this.state.resetGame}>重置</button>
				<button onClick={this.state.moveStartFun}>随机下一步</button>
				<button onClick={()=>{this.state.autoArrow(true);}}>自动</button>
				<button onClick={this.state.clearTimer}>暂停</button>
				<button onClick={this.state.revoke}>撤销</button>
			</div>
		</div>;
	}
}
