import { useEffect, useRef, useState } from "react";
import "./JourneyScene.css";

const SCRATCH_RADIUS = 28;
const CLEAR_THRESHOLD = 0.5;

export default function HeartScratchScene() {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [cleared, setCleared] = useState(false);

    useEffect(() => {
        function setupCanvas() {
            const canvas = canvasRef.current;
            const container = containerRef.current;
            if (!canvas || !container) return;

            const rect = container.getBoundingClientRect();
            const rawDpr = window.devicePixelRatio || 1;
            const dpr = Math.min(2, rawDpr); // clamp for mobile Safari stability

            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.globalCompositeOperation = "source-over";
            ctx.fillStyle = "#ff0000"; // red overlay
            ctx.fillRect(0, 0, rect.width, rect.height);
            ctx.globalCompositeOperation = "destination-out";
        }

        setupCanvas();

        window.addEventListener("resize", setupCanvas);
        return () => {
            window.removeEventListener("resize", setupCanvas);
        };
    }, []);

    function getPos(e) {
        const canvas = canvasRef.current;
        if (!canvas) return null;
        const rect = canvas.getBoundingClientRect();

        const clientX = e.clientX;
        const clientY = e.clientY;

        return {
            x: clientX - rect.left,
            y: clientY - rect.top,
        };
    }

    function scratch(e) {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const pos = getPos(e);
        if (!pos) return;

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, SCRATCH_RADIUS, 0, Math.PI * 2);
        ctx.fill();
    }

    function handlePointerDown(e) {
        e.preventDefault();
        setIsDrawing(true);
        scratch(e);
    }

    function handlePointerMove(e) {
        if (!isDrawing) return;
        e.preventDefault();
        scratch(e);
    }

    function handlePointerUp() {
        if (!isDrawing) return;
        setIsDrawing(false);
        checkCleared();
    }

    function checkCleared() {
        const canvas = canvasRef.current;
        if (!canvas || cleared) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const { width, height } = canvas;
        const imageData = ctx.getImageData(0, 0, width, height);
        const pixels = imageData.data;

        let transparentCount = 0;
        for (let i = 3; i < pixels.length; i += 4) {
            if (pixels[i] === 0) transparentCount += 1;
        }

        const ratio = transparentCount / (pixels.length / 4);
        if (ratio >= CLEAR_THRESHOLD) {
            setCleared(true);
        }
    }

    return (
        <div className="heart-scratch-wrapper">
            <div className="heart-scratch-title">Scratch the heart to reveal 💓</div>
            <div className="heart-scratch-subtitle">
                Gently rub the red heart away and see what’s hiding under it.
            </div>

            <div
                ref={containerRef}
                className={`heart-scratch-heart ${cleared ? "heart-scratch-heart-cleared" : ""}`}
            >
                <div className="heart-scratch-image" />

                <canvas
                    ref={canvasRef}
                    className="heart-scratch-canvas"
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={handlePointerUp}
                />
            </div>

            {cleared && (
                <div className="heart-scratch-done">
                    You got it. This is all for you. ❤️
                </div>
            )}
        </div>
    );
}

