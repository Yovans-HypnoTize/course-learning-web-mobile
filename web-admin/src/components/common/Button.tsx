

interface ButtonProps {
    type: 'button' | 'submit' | 'reset';
    className?: string,
    onClick?: () => void,
    children?: React.ReactNode;
    label?: string,
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    type, className, onClick, children, label, disabled

}) => {
    return (
        <button type={type} className={className} onClick={onClick} disabled>
            {label}
            {children}
        </button>
    )
}

export default Button