import React from "react";

import "./App.css";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { count: 0 };
	}

	tick() {
		return fetch("http://localhost:333/api/count").then((data) =>
			this.setState({ count: data.count })
		);
	}

	componentDidMount() {
		this.interval = setInterval(() => this.tick(), 2000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<p>COUNT {this.state.count}</p>
				</header>
			</div>
		);
	}
}

export default App;
