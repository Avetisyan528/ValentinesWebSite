import { useState } from "react";
import GiftsScreen from "./GiftsScreen";
import HeartScratchScene from "./HeartScratchScene";
import "./JourneyScene.css";

export default function JourneyScene() {
    const [phase, setPhase] = useState("gifts"); // "gifts" | "scratch"

    if (phase === "gifts") {
        return <GiftsScreen onDone={() => setPhase("scratch")} />;
    }

    return <HeartScratchScene />;
}

