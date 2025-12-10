import React, { useEffect } from "react";

const features = [
    {
        icon: "📱",
        title: "Easy to Use",
        desc: "User-friendly interface, book tickets in just a few steps.",
    },
    {
        icon: "🎟️",
        title: "Online Booking",
        desc: "View showtimes, select seats, and pay quickly.",
    },
    {
        icon: "⏰",
        title: "Time Saving",
        desc: "No need to queue, reserve your seat from home.",
    },
    {
        icon: "🎁",
        title: "Attractive Offers",
        desc: "Receive many promotions and redeem rewards.",
    },
    {
        icon: "💳",
        title: "Secure Payment",
        desc: "Multiple payment methods with secure encryption.",
    },
    {
        icon: "🎬",
        title: "Latest Movies",
        desc: "Watch the newest blockbusters and trending films.",
    },
];

export default function Home({ user }) {
    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes fadeInDown {
                from {
                    opacity: 0;
                    transform: translateY(-50px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
            
            @keyframes scaleIn {
                from {
                    opacity: 0;
                    transform: scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            .home-feature:hover {
                transform: translateY(-10px);
                box-shadow: 0 15px 40px rgba(0, 102, 102, 0.4) !important;
            }
            
            .home-feature:hover .home-icon {
                transform: rotate(360deg) scale(1.1);
            }
            
            .banner-overlay::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(135deg, rgba(0, 102, 102, 0.7) 0%, rgba(0, 153, 153, 0.7) 100%);
                z-index: 1;
            }
            
            .banner-overlay > * {
                position: relative;
                z-index: 2;
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <div style={styles.aboutPage}>
            <div style={styles.banner} className="banner-overlay">
                <h1 style={styles.bannerTitle}>🎬 ỨNG DỤNG ĐẶT VÉ XEM PHIM 🎬</h1>
            </div>

            <div style={styles.content}>
                <p style={styles.intro}>
                    Ứng dụng <strong style={{ color: "#00ffff", textShadow: "0 0 10px rgba(0, 255, 255, 0.5)" }}>MovieBooking</strong> giúp bạn đặt vé xem phim mọi lúc, mọi nơi – nhanh chóng, tiện lợi và an toàn.
                </p>

                <div style={styles.features}>
                    {features.map(({ icon, title, desc }, idx) => (
                        <div key={idx} style={styles.feature} className="home-feature">
                            <div style={styles.icon} className="home-icon" aria-hidden="true">{icon}</div>
                            <div>
                                <h3 style={styles.featureTitle}>{title}</h3>
                                <p style={styles.featureDesc}>{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <footer style={styles.footer}>
                © 2025 MovieBooking. Phiên bản giới thiệu sản phẩm. 🎥
            </footer>
        </div>
    );
}

const styles = {
    aboutPage: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        background: "linear-gradient(135deg, #006666 0%, #009999 100%)",
        color: "#333",
    },
    banner: {
        position: "relative",
        backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: 350,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textShadow: "0 4px 10px rgba(0,0,0,0.8)",
        padding: "0 16px",
        textAlign: "center",
        overflow: "hidden",
    },
    bannerTitle: {
        fontSize: "3.5rem",
        fontWeight: "800",
        animation: "fadeInDown 1s ease-out",
        color: "#ffffff",
        letterSpacing: "2px",
        textTransform: "uppercase",
        textShadow: "0 4px 15px rgba(0, 0, 0, 0.9), 0 2px 5px rgba(0, 0, 0, 0.8)",
    },
    content: {
        maxWidth: 1000,
        margin: "3rem auto",
        padding: "0 20px",
        flexGrow: 1,
    },
    intro: {
        fontSize: "1.3rem",
        marginBottom: "3rem",
        textAlign: "center",
        color: "white",
        fontWeight: "500",
        lineHeight: "1.8",
        animation: "fadeIn 1.2s ease-out",
        padding: "20px",
        background: "rgba(255, 255, 255, 0.1)",
        borderRadius: "15px",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
    },
    features: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "2rem",
        marginTop: "2rem",
    },
    feature: {
        display: "flex",
        gap: "1.5rem",
        padding: "2rem",
        backgroundColor: "white",
        borderRadius: 20,
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
        transition: "all 0.4s ease",
        animation: "scaleIn 0.6s ease-out",
        cursor: "pointer",
    },
    icon: {
        fontSize: "3rem",
        background: "linear-gradient(135deg, #006666 0%, #009999 100%)",
        width: "70px",
        height: "70px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        userSelect: "none",
        boxShadow: "0 4px 15px rgba(0, 102, 102, 0.3)",
        transition: "transform 0.3s ease",
    },
    featureTitle: {
        margin: "0 0 0.8rem",
        fontWeight: 700,
        color: "#006666",
        fontSize: "1.3rem",
    },
    featureDesc: {
        margin: 0,
        color: "#555",
        fontSize: "1rem",
        lineHeight: "1.6",
    },
    footer: {
        background: "linear-gradient(90deg, #004d4d 0%, #006666 50%, #004d4d 100%)",
        textAlign: "center",
        padding: "1.5rem 0",
        fontSize: "1rem",
        color: "white",
        fontWeight: "500",
        letterSpacing: "0.5px",
        boxShadow: "0 -4px 15px rgba(0, 0, 0, 0.2)",
    },
};
