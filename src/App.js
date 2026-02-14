import HeartsBackground from "./components/HeartsBackground";
import { useState, useEffect } from "react";
import ReadyJourneyBox from "./components/ReadyJourneyBox";
import JourneyScene from "./components/JourneyScene";

import Athletic from "./images/Athletic.mp4";
import Charismatic from "./images/Charismatic.mp4";
import Confident from "./images/Confident.mp4";
import Cute from "./images/Cute.mp4";
import Dramatic from "./images/Dramatic.mp4";
import Dreamy from "./images/Dreamy.mp4";
import Energetic from "./images/Energetic.mp4";
import Gorgeous from "./images/Gorgeous.mp4";
import Hot from "./images/Hot.mp4";
import Joyful from "./images/Joyful.mp4";
import Lovely from "./images/Lovely.mp4";
import Magical from "./images/Magical.mp4";
import Powerful from "./images/Powerful.mp4";
import Sweet from "./images/Sweet.mp4";

import "./App.css";

function App() {
    const [videosLoaded, setVideosLoaded] = useState(false);
    const [stage, setStage] = useState("auth");
    const [input, setInput] = useState("");

    const PASSWORD = "Avetisyan";

    const handleLogin = () => {
        if (input === PASSWORD) {
            setStage("ready");
        } else {
            alert("Wrong password 💔");
        }
    };

    useEffect(() => {
        const videos = [
            Athletic,
            Charismatic,
            Confident,
            Cute,
            Dramatic,
            Dreamy,
            Energetic,
            Gorgeous,
            Hot,
            Joyful,
            Lovely,
            Magical,
            Powerful,
            Sweet,
        ];

        let loadedCount = 0;

        videos.forEach((src) => {
            const video = document.createElement("video");
            video.src = src;
            video.preload = "auto";

            video.oncanplaythrough = () => {
                loadedCount++;
                if (loadedCount === videos.length) {
                    setVideosLoaded(true);
                }
            };

            video.load();
        });
    }, []);

    return (
        <div className="app-root">
            <HeartsBackground />

            <div className="app-overlay">

                {/* Loading Screen */}
                {!videosLoaded && (
                    <div className="loading-screen">
                        Preparing something special for you... 💖
                    </div>
                )}

                {/* Auth Screen */}
                {videosLoaded && stage === "auth" && (
                    <div className="auth-box">
                        <h2>Enter Password 💌</h2>
                        <input
                            type="password"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Secret word..."
                        />
                        <button onClick={handleLogin}>Enter</button>
                    </div>
                )}

                {/* Ready Screen */}
                {videosLoaded && stage === "ready" && (
                    <ReadyJourneyBox onYes={() => setStage("journey")} />
                )}

                {/* Journey */}
                {videosLoaded && stage === "journey" && <JourneyScene />}
            </div>
        </div>
    );
}

export default App;
