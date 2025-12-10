import React, { useState } from 'react';

function Button({ title, onClick, variant, disabled, fullWidth, type }) {
    const [isHovered, setIsHovered] = useState(false);

    const baseStyle = {
        padding: '12px 24px',
        fontSize: '15px',
        fontWeight: '600',
        borderRadius: '10px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        border: 'none',
        outline: 'none',
        transition: 'all 0.3s ease',
        opacity: disabled ? 0.6 : 1,
        width: fullWidth ? '100%' : 'auto',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        letterSpacing: '0.5px',
    };

    const primaryStyle = {
        ...baseStyle,
        background: 'linear-gradient(135deg, #006666 0%, #009999 100%)',
        color: 'white',
        boxShadow: isHovered && !disabled ? '0 6px 20px rgba(0, 102, 102, 0.5)' : '0 4px 15px rgba(0, 102, 102, 0.3)',
        transform: isHovered && !disabled ? 'translateY(-2px)' : 'translateY(0)',
    };

    const outlinedStyle = {
        ...baseStyle,
        background: 'white',
        color: '#006666',
        border: '2px solid #006666',
        boxShadow: isHovered && !disabled ? '0 6px 20px rgba(0, 102, 102, 0.2)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
        transform: isHovered && !disabled ? 'translateY(-2px)' : 'translateY(0)',
    };

    const buttonStyle = variant === 'outlined' ? outlinedStyle : primaryStyle;

    return (
        <button
            style={buttonStyle}
            type={type}
            onClick={onClick}
            disabled={disabled}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {title}
        </button>
    )
}

export default Button;