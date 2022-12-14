import React from "react";

import "./App.css";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { count: 0 };
	}

	tick() {
		fetch("http://localhost:3000/api/counter/counter")
			.then((res) => res.json())
			.then((item) => {
				// console.log("get new count", data);
				this.setState({ count: item.quantity });
			});
	}

	componentDidMount() {
		this.interval = setInterval(() => this.tick(), 5000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<p className="counter-ui">COUNT {this.state.count}</p>
				</header>
			</div>
		);
	}
}

export default App;
