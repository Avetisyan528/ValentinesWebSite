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
            "Just give up",
        ],
        []
    );

    const [noClicks, setNoClicks] = useState(0);

    const noLabel = noPhrases[Math.min(noClicks, noPhrases.length - 1)];

    function handleNo() {
        setNoClicks((current) => {
            const lastIndex = noPhrases.length - 1;
            const next = Math.min(current + 1, lastIndex);

            // When the label reaches "Just give up", treat NO like YES.
            if (next === lastIndex) {
                onYes();
            }

            return next;
        });
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

