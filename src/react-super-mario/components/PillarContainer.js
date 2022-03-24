import React from "react";
import { v4 } from "uuid";
import $ from "jquery";
import "./obstacle.css";
import Pillars from "../components/Pillars";

export default class PillarContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = { pillars: [] };
	}
	componentDidMount() {
		let initPillars = [];
					let leftmargin=300;
			leftmargin=leftmargin+10;
			initPillars.push(
				<div
				style={{
							height: 20 + "px",
							// marginBottom: "100px",
							width: "50px",
							backgroundColor: "red"
						}}
					
					className="pillar"
				/>
			);
				initPillars.push(
				<div
				style={{
							height: 20 + "px",
							// marginBottom: "100px",
							width: "50px",
							backgroundColor: "red"
						}}
					className="pillar"
				/>
			);
	
		this.setState({
			pillars: initPillars
		});
	}

	render() {
		return <Pillars pillars={this.state.pillars} />;
	}
}
