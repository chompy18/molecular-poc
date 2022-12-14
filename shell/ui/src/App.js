import React from "react";
import "./App.css";
const RemoteCounter = React.lazy(() => import("Counter/Counter"));
const RemoteActions = React.lazy(() => import("Actions/Actions"));

function App() {
	return (
		<div className="App">
			<h1>SHELL</h1>
			<div className="shell-container">
				<RemoteActions />
				<RemoteCounter />
			</div>
			{/* <div id="actions"></div>
			<div id="count"></div> */}
		</div>
	);
}

export default App;
