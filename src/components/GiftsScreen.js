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

const BASE_INSTRUCTION = "Pick a gift that you want 💌";

// Message that appears after each gift video, in the same sequence
// as GIFTS above (index 0 = first gift, etc.).
const AFTER_GIFT_MESSAGES = [
    "See? Being this athletic on you is just unfair. Keep going 🏃‍♀️",
    "Your charisma could light up any room. Keep going ✨",
    "That confidence is dangerously charming. Keep going 😏",
    "You’re cute in a way that should be illegal. Keep going 🧸",
    "Even your drama is my favorite show. Keep going 🎭",
    "You’re dreamy in every single frame. Keep going 💫",
    "Your energy is contagious and I love it. Keep going ⚡",
    "You’re so gorgeous it’s almost unfair. Keep going 💋",
    "You’re honestly too hot to handle. Keep going 🔥",
    "You bring so much joy into my life. Keep going 🌈",
    "You’re lovely in every possible way. Keep going 🌹",
    "You really are pure magic to me. Keep going ✨",
    "You’re powerful in ways you don’t even see. Keep going 💪",
    "See? You really are as sweet as a chocolate. Keep going 🍫",
];

const GIFTS = [
    {
        id: 1,
        title: "Athletic",
        message: "Every move you make is so athletic and beautiful to watch 🏃‍♀️",
        video: Athletic,
        closeLabel: "I KNOW",
    },
    {
        id: 2,
        title: "Charismatic",
        message: "Your charisma makes every room feel brighter the second you walk in ✨",
        video: Charismatic,
        closeLabel: "YEP",
    },
    {
        id: 3,
        title: "Confident",
        message: "The way you carry yourself with confidence is ridiculously attractive 😏",
        video: Confident,
        closeLabel: "GUILTY",
    },
    {
        id: 4,
        title: "Cute",
        message: "Every little expression you make is impossibly, dangerously cute 🧸",
        video: Cute,
        closeLabel: "DAMN RIGHT",
    },
    {
        id: 5,
        title: "Dramatic",
        message: "Your tiny dramas are my favorite series—I never want them to end 🎭",
        video: Dramatic,
        closeLabel: "YUP",
    },
    {
        id: 6,
        title: "Dreamy",
        message: "You are the kind of dreamy I could stare at forever 💫",
        video: Dreamy,
        closeLabel: "SURELY",
    },
    {
        id: 7,
        title: "Energetic",
        message: "Your energy makes even the most ordinary days feel exciting ⚡",
        video: Energetic,
        closeLabel: "AWW",
    },
    {
        id: 8,
        title: "Gorgeous",
        message: "You are so gorgeous it honestly feels unreal sometimes 💋",
        video: Gorgeous,
        closeLabel: "AWW",
    },
    {
        id: 9,
        title: "Hot",
        message: "You’re not just hot, you’re ‘I can’t-think-straight’ hot 🔥",
        video: Hot,
        closeLabel: "AWW",
    },
    {
        id: 10,
        title: "Joyful",
        message: "Your laugh and smile are pure joy; they change my whole day 🌈",
        video: Joyful,
        closeLabel: "AWW",
    },
    {
        id: 11,
        title: "Lovely",
        message: "Every part of you—inside and out—is genuinely lovely 🌹",
        video: Lovely,
        closeLabel: "AWW",
    },
    {
        id: 12,
        title: "Magical",
        message: "You make normal moments feel a little bit magical ✨",
        video: Magical,
        closeLabel: "AWW",
    },

    {
        id: 13,
        title: "Powerful",
        message: "You’re powerful in ways you don’t even realize, and it inspires me 💪",
        video: Powerful,
        closeLabel: "AWW",
    },
    {
        id: 14,
        title: "Sweet",
        message: "You’re sweeter than my favorite chocolate and twice as addictive 🍫",
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
        const openedCount = openedIds.length;

        if (openedCount === 0) {
            return BASE_INSTRUCTION;
        }

        // After each gift, show a specific line that matches that video.
        const index = Math.min(openedCount - 1, AFTER_GIFT_MESSAGES.length - 1);
        return AFTER_GIFT_MESSAGES[index];
    }, [openedIds.length]);

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

