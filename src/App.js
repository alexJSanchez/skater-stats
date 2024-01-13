import logo from "./alex_crop.jpeg";
import { useState } from "react";
import "./App.css";

var i = 0;

function move(stats) {
	if (i == 0) {
		i = 1;
		var myAir = document.getElementById("myAir");
		var width = 1;
		var id = setInterval(frame, 10);
		function frame() {
			if (width >= stats.air) {
				clearInterval(id);
				i = 0;
			} else {
				width++;
				myAir.style.width = width + "%";
			}
		}
	}
}

function App() {
	const [stats, setStats] = useState({ air: 50 });
	return (
		<div className="App">
			<h1>skater stat</h1>
			<div className="flex justify-center items-center">
				<img alt="alex walking" src={logo} />
				<div id="myProgress">
					<div id="myBox" className="myAir"></div>
					<div id="myBox" className="myHangtime"></div>
				</div>
			</div>

			<button onClick={() => move(stats)}>Click Me</button>
		</div>
	);
}

export default App;
