import React from 'react';


function Button({title, onClick, variant, disabled, fullWidth, type}) {

    let className = "bg-primary p-1 text-white ";

    if (fullWidth) {
        className += "w-full ";
    }

    if (variant === 'outlined') {
        className = className.replace("bg-primary", "border border-primary text-primary bg-white");
    }
    return (
        <button className={`${className} hover`} type={type} onClick={onClick} disabled={disabled} style={{borderRadius: "4px"}}>
            {title}
        </button>
    )
}

export default Button;