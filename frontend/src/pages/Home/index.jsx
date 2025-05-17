import React from "react";

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
];

export default function Home({user}) {
    return (
        <div style={styles.aboutPage}>
            <div style={styles.banner}>
                <h1 style={styles.bannerTitle}>Introducing MovieBooking App</h1>
            </div>

            <div style={styles.content}>
                <p style={styles.intro}>
                    The <strong style={{ color: "#4f46e5" }}>MovieBooking</strong> app allows you to easily book movie tickets anytime, anywhere – fast, convenient, and secure.
                </p>

                <div style={styles.features}>
                    {features.map(({ icon, title, desc }, idx) => (
                        <div key={idx} style={styles.feature}>
                            <div style={styles.icon} aria-hidden="true">{icon}</div>
                            <div>
                                <h3 style={styles.featureTitle}>{title}</h3>
                                <p style={styles.featureDesc}>{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <footer style={styles.footer}>
                © 2025 MovieBooking. Product introduction version.
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
        backgroundColor: "#fff",
        color: "#333",
    },
    banner: {
        backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: 250,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textShadow: "0 2px 6px rgba(0,0,0,0.7)",
        padding: "0 16px",
        textAlign: "center",
    },
    bannerTitle: {
        fontSize: "2.5rem",
        fontWeight: "700",
    },
    content: {
        maxWidth: 900,
        margin: "2rem auto",
        padding: "0 16px",
        flexGrow: 1,
    },
    intro: {
        fontSize: "1.2rem",
        marginBottom: "2rem",
        textAlign: "center",
    },
    features: {
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "1.5rem",
    },
    feature: {
        display: "flex",
        gap: "1rem",
        padding: "1rem",
        backgroundColor: "#f9fafb",
        borderRadius: 8,
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        transition: "box-shadow 0.3s ease",
    },
    icon: {
        fontSize: "2rem",
        color: "#4f46e5",
        flexShrink: 0,
        userSelect: "none",
    },
    featureTitle: {
        margin: "0 0 0.5rem",
        fontWeight: 600,
        color: "#3730a3",
    },
    featureDesc: {
        margin: 0,
        color: "#4b5563",
        fontSize: "0.95rem",
    },
    footer: {
        backgroundColor: "#f3f4f6",
        textAlign: "center",
        padding: "1rem 0",
        fontSize: "0.9rem",
        color: "#6b7280",
    },
};
