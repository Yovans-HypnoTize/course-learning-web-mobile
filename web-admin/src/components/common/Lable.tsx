import React from 'react';

interface LabelProps {
    className?: string;
    label?: string;
    htmlFor?: string;
    children?: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ className, label, htmlFor, children }) => {
    return (
        <label className={className} htmlFor={htmlFor}>
            {label}
            {children}
        </label>
    );
};

export default Label;
