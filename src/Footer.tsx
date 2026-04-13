export default function Footer() {
    return (
        <footer
            style={{
                marginTop: "40px",
                paddingTop: "20px",
                borderTop: "1px solid #d6dde7",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "#44506a",
                fontSize: "0.9rem",
            }}
        >
            <div>
                © {new Date().getFullYear()} Graim Lab
            </div>

            

            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                {/* Paper */}
                <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: "6px", textDecoration: "none", color: "#172033" }}
                >
                    <svg height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm8 1.5V8h4.5L14 3.5zM8 12h8v1.5H8V12zm0 4h8v1.5H8V16z" />
                    </svg>
                    Publication (coming soon)
                </a>
                
                {/* GitHub */}
                <a
                    href="https://github.com/GraimLab/CancerIncidencePrediction"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: "6px", textDecoration: "none", color: "#172033" }}
                >
                    <svg height="20" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38
            0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
            -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87
            2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
            0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12
            0 0 .67-.21 2.2.82a7.6 7.6 0 012-.27c.68 0 1.36.09
            2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16
            1.92.08 2.12.51.56.82 1.27.82 2.15
            0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54
            1.48 0 1.07-.01 1.93-.01 2.19
            0 .21.15.46.55.38A8.01 8.01 0 0016 8
            c0-4.42-3.58-8-8-8z"/>
                    </svg>
                    GitHub
                </a>

                {/* Lab Website */}
                <a
                    href="https://graimlab.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: "6px", textDecoration: "none", color: "#172033" }}
                >
                    <svg height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm6.93
            6h-3.11a15.7 15.7 0 00-1.16-3.14A8.03 8.03
            0 0118.93 8zM12 4c.74 1.07 1.35 2.41
            1.73 4H10.27c.38-1.59.99-2.93 1.73-4zM4.07
            14a8.06 8.06 0 010-4h3.47a16.3 16.3
            0 000 4H4.07zm.99 2h3.11c.29
            1.12.69 2.18 1.16 3.14A8.03 8.03
            0 015.06 16zM8.18 14h7.64a14.5 14.5
            0 01-1.27 4h-5.1a14.5 14.5 0 01-1.27-4zm1.27-6h5.1c.48
            1.16.91 2.45 1.27 4H8.18c.36-1.55.79-2.84 1.27-4zm5.39
            11.14c.47-.96.87-2.02 1.16-3.14h3.11a8.03
            8.03 0 01-4.27 3.14z"/>
                    </svg>
                    Lab Website
                </a>

                

            </div>
        </footer>
    );
}