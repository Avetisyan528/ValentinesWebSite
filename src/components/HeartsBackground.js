import { useEffect, useState } from "react";
import "./HeartsBackground.css";

export default function HeartsBackground() {
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newHeart = {
                id: Math.random(),
                left: Math.random() * 100,
                size: Math.random() * 50 + 10,
                duration: Math.random() * 4 + 4,
                opacity: 0.5 + Math.random() * 0.5,
            };

            setHearts((prev) => [...prev, newHeart]);

            setTimeout(() => {
                setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
            }, newHeart.duration * 1000);

        }, 300);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="hearts-container">
            {hearts.map((heart) => (
                <div
                    key={heart.id}
                    className="heart"
                    style={{
                        left: `${heart.left}vw`,
                        width: heart.size,
                        height: heart.size,
                        animationDuration: `${heart.duration}s`,
                        opacity: heart.opacity,
                    }}
                />
            ))}
        </div>
    );
}
