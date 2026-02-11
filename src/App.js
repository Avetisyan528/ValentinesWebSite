import HeartsBackground from "./components/HeartsBackground";
import { useState } from "react";
import ReadyJourneyBox from "./components/ReadyJourneyBox";
import JourneyScene from "./components/JourneyScene";
import "./App.css";

function App() {
    const [stage, setStage] = useState("ready"); // "ready" | "journey"

    return (
        <div className="app-root">
            <HeartsBackground />

            <div className="app-overlay">
                {stage === "ready" ? (
                    <ReadyJourneyBox onYes={() => setStage("journey")} />
                ) : (
                    <JourneyScene />
                )}
            </div>
        </div>
    );
}

export default App;
