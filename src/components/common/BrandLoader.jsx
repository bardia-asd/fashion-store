import PropTypes from "prop-types";

const BrandLoader = ({ label = "در حال بارگذاری", size = "md" }) => {
    const isSmall = size === "sm";
    const width = isSmall ? 64 : 92;
    const height = isSmall ? 40 : 56;
    const fontSize = isSmall ? 14 : 18;

    return (
        <div
            role="status"
            aria-live="polite"
            className="flex flex-col items-center justify-center gap-5 py-10 text-center"
            dir="rtl">
            <div className="dby-scene" style={{ width, height }}>
                <div className="dby-card" style={{ width, height }}>
                    <div
                        className="dby-face dby-face-front"
                        style={{ fontSize }}>
                        DBY
                    </div>
                    <div
                        className="dby-face dby-face-back"
                        style={{ fontSize }}>
                        DBY
                    </div>
                </div>
            </div>

            <span className="text-sm font-medium text-foreground">{label}</span>

            <style>{`
                .dby-scene {
                    perspective: 600px;
                }
                .dby-card {
                    position: relative;
                    transform-style: preserve-3d;
                    animation: dby-spin 1.8s linear infinite;
                }
                .dby-face {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 10px;
                    font-weight: 600;
                    letter-spacing: 0.03em;
                    backface-visibility: hidden;
                }
                .dby-face-front {
                    background: #E65D17;
                    color: #FFFFFF;
                }
                .dby-face-back {
                    background: #F6F3EF;
                    color: #111111;
                    border: 1.5px solid #E6E3DF;
                    transform: rotateY(180deg);
                }
                @keyframes dby-spin {
                    from { transform: rotateY(0deg); }
                    to { transform: rotateY(360deg); }
                }
                @media (prefers-reduced-motion: reduce) {
                    .dby-card {
                        animation: none;
                    }
                }
            `}</style>
        </div>
    );
};

BrandLoader.propTypes = {
    label: PropTypes.string,
    size: PropTypes.oneOf(["sm", "md"]),
};

export default BrandLoader;
