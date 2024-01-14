import logo from "./alex_crop.jpeg";
import { useState, useEffect } from "react";
import "../src/App.css";

const data = [
	{ name: "Air", score: "60%" },
	{ name: "Hangtime", score: "40%" },
	{ name: "Ollie", score: "60%" },
	{ name: "Speed", score: "80%" },
	{ name: "Spin", score: "40%" },
	{ name: "Landing", score: "60%" },
	{ name: "Switch", score: "20%" },
	{ name: "Rail Balance", score: "50%" },
	{ name: "Lip Balance", score: "80%" },
	{ name: "Manuals", score: "40%" },
];
function App() {
	const [stats, setStats] = useState([
		{ name: "Air", score: "0%" },
		{ name: "Hangtime", score: "0%" },
		{ name: "Ollie", score: "0%" },
		{ name: "Speed", score: "0%" },
		{ name: "Spin", score: "0%" },
		{ name: "Landing", score: "0%" },
		{ name: "Switch", score: "0%" },
		{ name: "Rail Balance", score: "0%" },
		{ name: "Lip Balance", score: "0%" },
		{ name: "Manuals", score: "0%" },
	]);
	useEffect(() => {
		setStats(data);
	}, []);

	return (
		<div className="App flex flex-col items-center">
			<h1>skater stat</h1>
			<div className="flex items-center">
				<div>
					<img alt="alex walking" src={logo} />
				</div>
				<div className="w-full">
					{stats.map((stat) => {
						return (
							<div>
								<p>{stat.name}</p>
								<div className="loader-container">
									<div
										className="loader-bar flex justify-end"
										style={{
											width: stat.score,
										}}
									></div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className="flex justify-center">
				<iframe
					width="460px"
					src="https://www.youtube.com/embed/cmhP2i1aK_k?si=dIvzdlq0dbWED7Jy"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowfullscreen
				></iframe>
			</div>
		</div>
	);
}

export default App;
