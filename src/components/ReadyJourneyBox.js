import { useMemo, useState } from "react";
import "./ReadyJourneyBox.css";

export default function ReadyJourneyBox({ onYes }) {
    const noPhrases = useMemo(
        () => [
            "NO",
            "Think again",
            "Are you sure?",
            "Not that one",
            "Try YES",
            "Nice try",
            "Still no?",
            "Okay… now press YES",
        ],
        []
    );

    const [noClicks, setNoClicks] = useState(0);

    const noLabel = noPhrases[Math.min(noClicks, noPhrases.length - 1)];

    function handleNo() {
        setNoClicks((c) => c + 1);
    }

    return (
        <div className="ready-box" role="dialog" aria-modal="true">
            <div className="ready-title">Are you ready for a lovely journey?👀</div>
            <div className="ready-buttons">
                <button className="ready-btn ready-btn-no" type="button" onClick={handleNo}>
                    {noLabel}
                </button>
                <button className="ready-btn ready-btn-yes" type="button" onClick={onYes}>
                    YES
                </button>
            </div>
        </div>
    );
}

