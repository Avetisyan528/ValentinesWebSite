import { useMemo, useState } from "react";
import "./GiftsScreen.css";
import Athletic from '../images/Athletic.mp4';
import Charismatic from '../images/Charismatic.mp4';
import Confident from '../images/Confident.mp4';
import Cute from '../images/Cute.mp4';
import Dramatic from '../images/Dramatic.mp4';
import Dreamy from '../images/Dreamy.mp4';
import Energetic from '../images/Energetic.mp4';
import Gorgeous from '../images/Gorgeous.mp4';
import Hot from '../images/Hot.mp4';
import Joyful from '../images/Joyful.mp4';
import Lovely from '../images/Lovely.mp4';
import Magical from '../images/Magical.mp4';
import Powerful from '../images/Powerful.mp4';
import Sweet from '../images/Sweet.mp4';

const INSTRUCTION_MESSAGES = [
    "Pick a gift that you want 💌",
    "Another surprise awaits! 🎁",
    "Keep going, there’s more ❤️",
    "You’re doing great, keep unwrapping 1✨",
    "You’re doing great, keep unwrapping 2✨",
    "You’re doing great, keep unwrapping 3✨",
    "You’re doing great, keep unwrapping 4✨",
    "You’re doing great, keep unwrapping 5✨",
];

const GIFTS = [
    {
        id: 1,
        title: "Athletic",
        message: "You’re effortlessly adorable in everything you do 🧸",
        video: Athletic,
        closeLabel: "I KNOW",
    },
    {
        id: 2,
        title: "Charismatic",
        message: "You turn the smallest moments into the happiest memories ✨",
        video: Charismatic,
        closeLabel: "YEP",
    },
    {
        id: 3,
        title: "Confident",
        message: "Your little dramas are my favorite entertainment 🎭",
        video: Confident,
        closeLabel: "GUILTY",
    },
    {
        id: 4,
        title: "Cute",
        message: "The way you own every room is insanely attractive 💼",
        video: Cute,
        closeLabel: "DAMN RIGHT",
    },
    {
        id: 5,
        title: "Dramatic",
        message: "You’re literally irresistible, and you know it 🔥",
        video: Dramatic,
        closeLabel: "YUP",
    },
    {
        id: 6,
        title: "Dreamy",
        message: "I could look at you forever and never get tired 💫",
        video: Dreamy,
        closeLabel: "SURELY",
    },
    {
        id: 7,
        title: "Energetic",
        message: "Your kindness melts my heart every single time 💖",
        video: Energetic,
        closeLabel: "AWW",
    },
    {
        id: 8,
        title: "Gorgeous",
        message: "Your kindness melts my heart every single time 💖",
        video: Gorgeous,
        closeLabel: "AWW",
    },
    {
        id: 9,
        title: "Hot",
        message: "Your kindness melts my heart every single time 💖",
        video: Hot,
        closeLabel: "AWW",
    },
    {
        id: 10,
        title: "Joyful",
        message: "Your kindness melts my heart every single time 💖",
        video: Joyful,
        closeLabel: "AWW",
    },
    {
        id: 11,
        title: "Lovely",
        message: "Your kindness melts my heart every single time 💖",
        video: Lovely,
        closeLabel: "AWW",
    },
    {
        id: 12,
        title: "Magical",
        message: "Your kindness melts my heart every single time 💖",
        video: Magical,
        closeLabel: "AWW",
    },

    {
        id: 13,
        title: "Powerful",
        message: "Your kindness melts my heart every single time 💖",
        video: Powerful,
        closeLabel: "AWW",
    },
    {
        id: 14,
        title: "Sweet",
        message: "Your kindness melts my heart every single time 💖",
        video: Sweet,
        closeLabel: "AWW",
    },
];

const GIFT_POSITIONS = [
    { top: 5, left: 20 },
    { top: 5, left: 55 },
    { top: 18, left: 10 },
    { top: 18, left: 37 },
    { top: 18, left: 65 },
    { top: 31, left: 20 },
    { top: 31, left: 55 },
    { top: 58, left: 20 },
    { top: 58, left: 55 },
    { top: 71, left: 10 },
    { top: 71, left: 37 },
    { top: 71, left: 67 },
    { top: 84, left: 20 },
    { top: 84, left: 55 },
];

function shuffleArray(items) {
    const arr = [...items];
    for (let i = arr.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export default function GiftsScreen({ onDone }) {
    const [openedIds, setOpenedIds] = useState([]);
    const [activeButtonId, setActiveButtonId] = useState(null);
    const [activeSequenceIndex, setActiveSequenceIndex] = useState(null);
    const giftLayout = useMemo(
        () =>
            shuffleArray(GIFT_POSITIONS).map((pos) => ({
                ...pos,
                rotation: -10 + Math.random() * 20,
            })),
        []
    );

    const allOpened = openedIds.length === GIFTS.length;

    const currentInstruction = useMemo(() => {
        if (allOpened) {
            return "All gifts are open! Let’s move forward 💖";
        }

        const index = Math.min(openedIds.length, INSTRUCTION_MESSAGES.length - 1);
        return INSTRUCTION_MESSAGES[index];
    }, [allOpened, openedIds.length]);

    function handleGiftClick(buttonId) {
        if (openedIds.includes(buttonId)) return;
        if (allOpened) return;

        const nextIndex = openedIds.length;
        setActiveButtonId(buttonId);
        setActiveSequenceIndex(nextIndex);
    }

    function handleCloseOverlay() {
        if (activeButtonId == null || activeSequenceIndex == null) return;

        setOpenedIds((prev) => (prev.includes(activeButtonId) ? prev : [...prev, activeButtonId]));
        setActiveButtonId(null);
        setActiveSequenceIndex(null);
    }

    const activeGift =
        activeSequenceIndex != null && activeSequenceIndex < GIFTS.length
            ? GIFTS[activeSequenceIndex]
            : null;

    return (
        <div className="gifts-screen">
            <div className="gifts-instruction-box">
                <div className="gifts-instruction" key={currentInstruction}>
                    {currentInstruction}
                </div>

                {allOpened && (
                    <button
                        type="button"
                        className="gifts-next-button"
                        onClick={onDone}
                    >
                        Next ➜
                    </button>
                )}
            </div>

            <div className="gifts-floating-layer">
                {GIFTS.map((gift, index) => {
                    const opened = openedIds.includes(gift.id);
                    const layout = giftLayout[index];

                    return (
                        <button
                            key={gift.id}
                            type="button"
                            className={`gift-button ${opened ? "gift-button-opened" : ""}`}
                            onClick={() => handleGiftClick(gift.id)}
                            disabled={opened}
                            style={{
                                top: `${layout.top}%`,
                                left: `${layout.left}%`,
                                "--gift-rotation": `${layout.rotation}deg`,
                            }}
                        >
                            <div className="gift-icon">
                                <div className="gift-lid" />
                                <div className="gift-box" />
                                <div className="gift-ribbon-vertical" />
                                <div className="gift-ribbon-horizontal" />
                            </div>
                        </button>
                    );
                })}
            </div>

            {activeGift && (
                <div className="gift-overlay">
                    <div className="gift-overlay-backdrop" />
                    <div className="gift-overlay-card">
                        <div className="gift-overlay-image-wrap">
                            <video autoPlay loop playsInline preload="auto" className="gift-overlay-image">
                                <source src={activeGift.video} type="video/mp4"/>
                            </video>
                        </div>

                        <div className="gift-overlay-title">
                            {activeGift.title}
                        </div>

                        <div className="gift-overlay-message">
                            {activeGift.message}
                        </div>

                        <button
                            type="button"
                            className="gift-overlay-close"
                            onClick={handleCloseOverlay}
                        >
                            {activeGift.closeLabel}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

