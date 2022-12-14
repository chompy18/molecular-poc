import "./App.css";

function Actions() {
	const increment = () => {
		fetch("http://localhost:3000/api/actions/increment", { method: "PUT" }).then(
			() => {
				console.log("increment action done");
			}
		);
	};

	const decrement = () => {
		fetch("http://localhost:3000/api/actions/decrement", { method: "PUT" }).then(
			() => {
				console.log("decrement action done");
			}
		);
	};

	return (
		<div className="App">
			<header className="App-header">
				<div className="App-link1" onClick={increment}>
					Increment
				</div>
				<div className="App-link1" onClick={decrement}>
					Decrement
				</div>
			</header>
		</div>
	);
}

export default Actions;
