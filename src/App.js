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
  const [videoUrl, setVideoUrl] = useState(
    "https://www.youtube.com/embed/cmhP2i1aK_k?si=dIvzdlq0dbWED7Jy"
  );
  const [stance, setStance] = useState("");
  useEffect(() => {
    // fetch("http://localhost:5000/books")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setStats(data[0].stats);
    //     setVideoUrl(data[0].videos[0]);
    //     setStance(data[0].stance);
    //     setName(data[0].name);
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data:", error);
    //   });
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
          {stats.map((stat, idx) => {
            return (
              <div key={idx}>
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
          src={videoUrl}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default App;
