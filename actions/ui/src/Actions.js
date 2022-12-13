import "./App.css";

function Actions() {
	const increment = () => {
		fetch("http://localhost:333/api/increment", { method: "PUT" }).then(
			() => {
				console.log("increment action done");
			}
		);
	};

	const decrement = () => {
		fetch("http://localhost:333/api/decrement", { method: "PUT" }).then(
			() => {
				console.log("decrement action done");
			}
		);
	};

	return (
		<div className="App">
			<header className="App-header">
				<div className="App-link" onClick={increment}>
					Increment
				</div>
				<div className="App-link" onClick={decrement}>
					Decrement
				</div>
			</header>
		</div>
	);
}

export default Actions;
