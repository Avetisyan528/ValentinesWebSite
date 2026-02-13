import { useMemo, useState } from "react";
import "./GiftsScreen.css";

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
        title: "Cute",
        message: "You’re effortlessly adorable in everything you do 🧸",
        image: "/images/gift-1.jpg",
        closeLabel: "I KNOW",
    },
    {
        id: 2,
        title: "Joyful",
        message: "You turn the smallest moments into the happiest memories ✨",
        image: "/images/gift-2.jpg",
        closeLabel: "YEP",
    },
    {
        id: 3,
        title: "Dramatic",
        message: "Your little dramas are my favorite entertainment 🎭",
        image: "/images/gift-3.jpg",
        closeLabel: "GUILTY",
    },
    {
        id: 4,
        title: "Confident",
        message: "The way you own every room is insanely attractive 💼",
        image: "/images/gift-4.jpg",
        closeLabel: "DAMN RIGHT",
    },
    {
        id: 5,
        title: "Hot",
        message: "You’re literally irresistible, and you know it 🔥",
        image: "/images/gift-5.jpg",
        closeLabel: "YUP",
    },
    {
        id: 6,
        title: "Beautiful",
        message: "I could look at you forever and never get tired 💫",
        image: "/images/gift-6.jpg",
        closeLabel: "SURELY",
    },
    {
        id: 7,
        title: "Sweet",
        message: "Your kindness melts my heart every single time 💖",
        image: "/images/gift-7.jpg",
        closeLabel: "AWW",
    },
];

const GIFT_POSITIONS = [
    { top: 3, left: 10 },
    { top: 12, left: 50 },
    { top: 20, left: 15 },
    { top: 28, left: 60 },
    { top: 65, left: 17 },
    { top: 71, left: 60 },
    { top: 79, left: 30 },
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
                            {/* Replace image URLs with real photos of her */}
                            <img
                                src={activeGift.image}
                                alt={activeGift.title}
                                className="gift-overlay-image"
                            />
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

