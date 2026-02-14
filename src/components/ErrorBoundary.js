import { Component } from "react";

export default class ErrorBoundary extends Component {
    state = { hasError: false, error: null };

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("App error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div
                    style={{
                        minHeight: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 24,
                        textAlign: "center",
                        background: "linear-gradient(180deg, #fff0f5 0%, #ffe4ec 100%)",
                        color: "#4a2940",
                    }}
                >
                    <div style={{ fontSize: 48, marginBottom: 16 }}>💔</div>
                    <h2 style={{ marginBottom: 8 }}>Something went wrong</h2>
                    <p style={{ marginBottom: 16, maxWidth: 320 }}>
                        Try refreshing the page. If it keeps happening, try opening the site on a different browser or device.
                    </p>
                    <button
                        type="button"
                        onClick={() => this.setState({ hasError: false, error: null })}
                        style={{
                            padding: "10px 20px",
                            fontSize: 16,
                            borderRadius: 12,
                            border: "none",
                            background: "#c44569",
                            color: "#fff",
                            cursor: "pointer",
                        }}
                    >
                        Try again
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}
