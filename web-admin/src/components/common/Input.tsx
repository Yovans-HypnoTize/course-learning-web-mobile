import React from 'react';
import { Field } from 'formik';

interface InputProps {
    className?: string;
    id?: string;
    name: string;
    type?: string;
    placeholder?: string;
    children?: React.ReactNode;
    value?: string;
    onChange?: (e: React.ChangeEvent) => void;
    onBlur?: (e: React.FocusEvent) => void;
}

const Input: React.FC<InputProps> = ({
    className = '',
    id,
    name,
    type,
    placeholder = '',
    children,
    value = '',
    onChange,
    onBlur,
}) => {
    return (
        <div className="input-wrapper">
            <Field
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                className={className}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
            />
            {children && <div className="input-children">{children}</div>}
        </div>
    );
};

export default Input;
