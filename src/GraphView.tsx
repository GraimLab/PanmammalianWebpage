import { useRef, useState } from "react";

export default function GraphView() {
    return (
        <section
            style={{
                background: "#ffffff",
                border: "1px solid #c7d2df",
                borderRadius: "18px",
                padding: "22px",
                boxShadow: "0 8px 24px rgba(20, 30, 50, 0.07)",
            }}
        >
            <h2 style={{ marginTop: 0, marginBottom: "8px" }}>Graph Results</h2>
            <p style={{ marginTop: 0, color: "#4d5b77" }}>
                Dynamic Charts for Gene Correlation will be displayed here.
            </p>
            <p style={{ marginTop: 0, color: "#4d5b77" }}>
                Heatmaps, ranked spearman correlation chars, etc
            </p>

        </section>
    );
}