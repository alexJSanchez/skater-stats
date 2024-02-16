import logo from "./alex_crop.jpeg";
import { useState, useEffect } from "react";
import "../src/App.css";

// const data = [
// 	{ name: "Air", score: "60%" },
// 	{ name: "Hangtime", score: "40%" },
// 	{ name: "Ollie", score: "60%" },
// 	{ name: "Speed", score: "80%" },
// 	{ name: "Spin", score: "40%" },
// 	{ name: "Landing", score: "60%" },
// 	{ name: "Switch", score: "20%" },
// 	{ name: "Rail Balance", score: "50%" },
// 	{ name: "Lip Balance", score: "80%" },
// 	{ name: "Manuals", score: "40%" },
// ];
function App() {
	const [name, setName] = useState("");
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
	const [videoUrl, setVideoUrl] = useState([
		"https://www.youtube.com/embed/cmhP2i1aK_k?si=dIvzdlq0dbWED7Jy",
	]);
	const [stance, setStance] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	useEffect(() => {
		fetch("http://localhost:5000/riders/65cf05555b23f0a163f799d0")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setStats(data.stats);
				setVideoUrl(data.video);
				setStance(data.stance);
				setName(data.name);
				setCity(data.city);
				setState(data.state);
			})
			.catch((error) => {
				console.log(("Error fetching data:", error));
			});
	}, []);

	return (
		<div className="App flex flex-col items-center">
			<h1 style={{ fontSize: "40px" }}>{name}</h1>
			<div className="flex items-center">
				<div>
					<img alt="alex walking" src={logo} />
				</div>
				<div className="w-full">
					<h2 style={{ fontSize: "20px", textTransform: "capitalize" }}>
						Stance: {stance}
					</h2>
					<p style={{ textTransform: "capitalize" }}>
						{city},{state}
					</p>
					{stats.map((stat, index) => {
						return (
							<div key={index}>
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
			{videoUrl.map((url, index) => (
				<div key={index} className="flex justify-center">
					<iframe
						src={url}
						title="YouTube video player"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowFullScreen
					></iframe>
				</div>
			))}
		</div>
	);
}

export default App;
